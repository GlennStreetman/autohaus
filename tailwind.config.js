module.exports = {
    darkMode: "class",
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                xs: "400px",
                // => @media (min-width: 400px) { ... }
                sm: "640px",
                // => @media (min-width: 640px) { ... }

                md: "768px",
                // => @media (min-width: 768px) { ... }

                lg: "1024px",
                // => @media (min-width: 1024px) { ... }

                xl: "1280px",
                // => @media (min-width: 1280px) { ... }

                "2xl": "1536px",
                // => @media (min-width: 1536px) { ... }
            },
            colors: {
                outlineLight: "#67e8f9",
                outlineDark: "#4f46e5",
                accent: "#ea580c",
            },
            spacing: {
                128: "32rem",
                116: "28rem",
            },
            backgroundColor: {
                primary: "#f8fafc", //light default background
                secondary: "#e2e8f0", //grey button background
                accent: "#ea580c", //orange carousel hover #B12B28
                primaryDark: "#1b1b1c",
            },
            textColor: {
                primary: "#334155",
                secondary: "#3b82f6",
                accent: "#fe7730",
                gold: "#5EEAD4",
            },
            fontFamily: {
                logo: ['"Saira Stencil One"', "sans-serif"],
                heading: ["Righteous", "sans-serif"],
                body: ["Roboto-Condensed", "Roboto", "sans-serif"],
            },
        },
    },
    plugins: [],
};

//RED #b21e27
//GOLD #E0AA4A
//Badckground grey #1b1b1c
//text-shadow: 1px 1px 0 #22
