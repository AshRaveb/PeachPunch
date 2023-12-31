const BASE_API_URL = 'https://fakestoreapi.com';

/*** products ***/
//GET
export async function getAllProducts() {
    try {
        const response = await fetch(`${BASE_API_URL}/products`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

//GET
export async function getSingleProduct(productId) {
    try {
        const response = await fetch(`${BASE_API_URL}/products/${productId}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

//GET
export async function getAllCategories() {
    try {
        const response = await fetch(`${BASE_API_URL}/products/categories`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

//GET
export async function getProductsInCategory(categoryName) {
    try {
        const response = await fetch(`${BASE_API_URL}/products/category/${categoryName}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

/*** cart ***/
//GET
export async function getCartItems(userId) {
    try {
        const response = await fetch(`${BASE_API_URL}/products/category/user/${userId}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

//POST
export async function addCartItem(item) {
    try {

    } catch (error) {
        console.log(error);
    }
}

//PATCH
export async function editCartItem(item) {
    try {

    } catch (error) {
        console.log(error);
    }
}

//DELETE
export async function deleteCartItem(item) {
    try {

    } catch (error) {
        console.log(error);
    }
}

/*** orders ***/
//GET
export async function getAllOrders() {
    try {

    } catch (error) {
        console.log(error);
    }
}

//GET
export async function getOrder(order) {
    try {

    } catch (error) {
        console.log(error);
    }
}

/*** users ***/
//POST
export async function registerUser(email, username, password, firstname, lastname, city, street, number, zipcode, lat, long, phone) {
    try {
        const response = await fetch(`${BASE_API_URL}/users`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
                name: {
                    firstname: firstname,
                    lastname: lastname
                },
                address: {
                    city: city,
                    street: street,
                    number: number,
                    zipcode: zipcode,
                    geolocation: {
                        lat: lat,
                        long: long
                    }
                },
                phone: phone
            })
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//POST
export async function signInUser(username, password) {
    try {
        const response = await fetch(`${BASE_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
}

//GET
export async function getCurrentUser() {
    try {

    } catch (error) {
        console.log(error);
    }
}