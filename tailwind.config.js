/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            height: {
                "mobile": "calc(100dvh - 180px)"
            },
            backgroundImage: {
                'transactions': "url(/images/backgrounds/general-bg.png)",
            },
            colors:{
                "primary": "#0D0E32",
                "secondary": "#F2F2F2",
            }
        },
    },
    plugins: [],
}
