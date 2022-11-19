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
                highLight: '#A43131' //porsche red
            },
            spacing: {
                128: "32rem",
                116: "28rem",
            },
            backgroundColor: {
                primary: "#ED2828", //light red
                secondary: "#A43131", //dark red
                primaryDark: "#1b1b1c", //dark grey
            },
            textColor: {
                primary: "#ED2828", //light red
                secondary: "#A43131", //dark red
                accent: "#dc2626", //red button text
                accentBlue: '#3b82f6', //blue button text
            },
            fontFamily: {
                logo: ["Open-Sans", "sans-serif", "Saira Stencil One", ],
                heading: ["Roboto Condensed", "Open-Sans", "sans-serif", "Righteous", "sans-serif"],
                body: ["Open Sans", "sans-serif", "Roboto Condensed", "Roboto", ],
                banner: ["Open-Sans", "sans-serif", "Lato", ]
            },
        },
    },
    plugins: [],
};
