import { useContext, useEffect, useState } from "react";
import CartContext, { CART_ACTION } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { getSingleProduct } from "../api";
import CartItem from "../components/Cart-item";

export default function Cart() {
    const cart = useContext(CartContext);
    const [checkOutCart, setCheckOutCart] = useState([]); 
    const [totalPrice, setTotalPrice] = useState(0); //parseFloat() returns a string, prevent NaN errors when displaying the cart.totalPrice
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            let initialCart = getLocalStorageCart();

            //if local storage is empty initialize it
            if (!initialCart) {
                cart.dispatch({ type: CART_ACTION.DELETE_CART, payload: { id: 0 } });

                setCheckOutCart([]);
                setLoading(false);
            }
            else {

                //create a new array of products with their quantities. Wait for all the data to load before setting checkOutCart
                const tempCart = await Promise.all(initialCart.map(async product => {
                    let tempProduct = await getSingleProduct(product.id);
                    return { 'product': tempProduct, 'quantity': product.quantity };
                }));

                setCheckOutCart(tempCart);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        let tempPrice = parseFloat(cart.totalPrice).toFixed(2);
        setTotalPrice(tempPrice);
    }, [cart.totalPrice])

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    function getLocalStorageCart() {
        console.log(JSON.parse(localStorage.getItem("state")).cart);
        const tempCart = JSON.parse(localStorage.getItem("state")).cart;
        return tempCart;
    }
    //debug methods
    function getLocalStorageState() {
        console.log(JSON.parse(localStorage.getItem("state")));
        const tempState = JSON.parse(localStorage.getItem("state"));
        return tempState;
    }

    function getLocalStorageTotalQuantity() {
        console.log(JSON.parse(localStorage.getItem("state")).totalQuantity);
        return JSON.parse(localStorage.getItem("state")).totalQuantity;
    }

    function findProductbyId(cart, productId) {
        for (const cartItem of cart) {
            if (cartItem.product.id === productId) {
                return cartItem.product;
            }
        }
        return null;
    }

    async function editProduct(productId, productQuantity, productPrice) {
        try {
            //update the client's cart
            console.log(productId, productQuantity);
            cart.dispatch({ type: CART_ACTION.EDIT_PRODUCT, payload: { id: productId, quantity: parseInt(productQuantity), price: productPrice } });

            let newCart = [...checkOutCart];
            let foundProduct = findProductbyId(newCart, productId);
            console.log(foundProduct);

            if (foundProduct) {
                console.log('found product: ' + foundProduct.id);
                foundProduct.quantity = productQuantity;
                console.log(newCart);
                setCheckOutCart([...newCart]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteProduct(productId, productPrice) {
        try {
            cart.dispatch({ type: CART_ACTION.DELETE_PRODUCT, payload: { id: productId, price: productPrice } });

            let newCart = [...checkOutCart];
            let foundProduct = findProductbyId(newCart, productId);

            if (foundProduct) {
                const filteredOutProducts = newCart.filter(cartItem => cartItem.product.id !== productId);
                setCheckOutCart([...filteredOutProducts]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteCart(productId) {
        try {
            cart.dispatch({ type: CART_ACTION.DELETE_CART, payload: { id: productId } });
            setCheckOutCart([]);
        } catch (error) {
            console.log(error);
        }
    }

    function ShowEmptyCartMessage() {
        if (cart.totalQuantity <= 0) {
            return (
                <div className="grid grid-cols-3 gap-x-2 gap-y-4">
                    <div className=" my-2 col-span-2 inline-block capitalize border bg-red-300 shadow-md font-md py-2 px-2 rounded w-full">
                        <p className="my-2 capitalize font-bold py-2 px-2 text-red-950 text-2xl">Your cart is empty!</p>
                    </div>
                    <div className="my-2 inline-block col-span-1 capitalize border bg-trf-50 shadow-md font-bold py-2 px-2 rounded w-full">
                        <p className="">{`SubTotal: $0`}</p>
                        <hr></hr>
                        <p className="">{`Item Count: (0)`}</p>
                    </div>
                </div>
            )
        }
        return null;
    }

    function ShowSubTotal() {
        if (cart.totalQuantity > 0) {
            return (
                <div className="my-2 inline-block col-span-1 capitalize border bg-trf-50  shadow-md font-bold py-2 px-2 rounded w-full">
                    <p className="m-2">{`SubTotal: $${totalPrice}`}</p>
                    <hr></hr>
                    <p className="m-2">{`Item Count: (${cart.totalQuantity})`}</p>
                    <button className="w-full uppercase font-bold px-2 py-2.5 bg-trf-400 hover:bg-trf-500 hover:text-trf-700 text-trf-950 rounded-lg text-md"
                        onClick={() => navigate(`/cart/checkout`)}>
                        Proceed to checkout
                    </button>
                </div>
            )
        }
        return null;
    }

    return (
        <>
            <div className="m-2">
                <div className="capitalize border bg-trf-50  font-bold py-2 px-2 rounded w-full shadow-md">
                    <h1 className="m-2 text-xl text-trf-950">Shopping Cart</h1>
                </div>
                <ShowEmptyCartMessage />
                <div className="grid grid-cols-3 gap-x-2 gap-y-4">
                    <div className="grid col-span-2">
                        {checkOutCart.map(cartItem => (
                            //pass down edit and delete functions to children
                            <CartItem key={cartItem.product.id} product={cartItem.product} quantity={cartItem.quantity} editProduct={editProduct} deleteProduct={deleteProduct} />
                        ))}
                    </div>
                    <ShowSubTotal />
                </div>
            </div>
            <br></br>
        </>
    )


}




// import React, { useContext } from "react";
// import { ShopContext } from "../../context/shop-context";
// import { PRODUCTS } from "../../products";
// import { CartItem } from "./cart-item";
// import { useNavigate } from "react-router-dom";
// import "./cart.css";
// import Footer from '../../footer/footer';


// export const Cart = () => {
//   const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
//   const totalAmount = getTotalCartAmount();

//   const navigate = useNavigate();

//   return (
//     <div className="cart">
//       <div>
//         <h1>Your Cart Items</h1>
//       </div>
//       <div className="cart">
//         {PRODUCTS.map((product) => {
//           if (cartItems[product.id] !== 0) {
//             return <CartItem data={product} />;
//           }
//         })}
//       </div>

//       {totalAmount > 0 ? (
//         <div className="checkout">
//           <p> Subtotal: ${totalAmount} </p>
//           <button onClick={() => navigate("/")}> Continue Shopping </button>
//           <button
//             onClick={() => {
//               checkout();
//               navigate("/checkout");
//             }}
//           >
//             {" "}
//             Checkout{" "}
//           </button>
//         </div>
//       ) : (
//         <h1> Your Shopping Cart is Empty</h1>
//       )}
//       <Footer />
//     </div>
//   );
// };