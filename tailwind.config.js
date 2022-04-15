module.exports = {
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
            },
            spacing: {
                128: "32rem",
                116: "28rem",
            },
            backgroundColor: {
                primary: "#f8fafc",
                secondary: "#e2e8f0",
                accent: "#ea580c",
            },
            textColor: {
                primary: "#334155",
                secondary: "#3b82f6",
                accent: "#ea580c",
                primaryDark: "#334155",
                secondaryDark: "#3b82f6",
                accentDark: "#67e8f9",
            },
            fontFamily: {
                logo: ['"Saira Stencil One"', "sans-serif"],
                heading: ["Righteous", "sans-serif"],
                body: ["Roboto", "sans-serif"],
            },
        },
    },
    plugins: [],
};
