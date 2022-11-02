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
                accent: "#ea580c", //orange carousel hover
                primaryDark: "#1b1b1c",
            },
            textColor: {
                primary: "#334155",
                secondary: "#dc2626", //old blue#3b82f6
                accent: "#ea580c",
                gold: "#5EEAD4",
                accentRed: '#dc2626',
                accentBlue: '#3b82f6'
            },
            fontFamily: {
                logo: ["Open-Sans", "sans-serif", "Saira Stencil One", ],
                heading: ["Open-Sans", "sans-serif", "Righteous", "sans-serif"],
                body: ["Open-Sans", "sans-serif", "Roboto-Condensed", "Roboto", ],
                banner: ["Open-Sans", "sans-serif", "Lato", ]
            },
        },
    },
    plugins: [],
};
