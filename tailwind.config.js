module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            spacing: {
                128: "32rem",
            },
            backgroundColor: {
                primary: "#f8fafc",
                secondary: "#e2e8f0",
                accent: "#dc2626",
                textPrimary: " #334155",
                textSecondary: "#0369a1",
                textAccent: "#6d28d9",
            },
            textColor: {
                primary: "#334155",
                secondary: "#3b82f6",
                accent: "#ea580c",
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

// pBrown: "#402306",
// pGold: "#c29049",
// pSilver: "#464c47",
// pRed: "#A43131",
// pBlack: "#000000",
