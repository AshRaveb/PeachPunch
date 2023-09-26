/* eslint-disable no-undef */
{import('tailwindcss').Config} 
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: { gridTemplateRows:{
      '[auto,auto,1fr]': 'auto auto 1fr',
    },
  },
  },
  plugins: [
      require('flowbite/plugin')
  ]
}

