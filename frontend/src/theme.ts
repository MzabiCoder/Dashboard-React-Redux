export const tokens = {
    grey: {
        100: "#e8f0fe",
        200: "#c8d8f0",
        300: "#ffffff",
        400: "#8ba3c7",
        500: "#7a9cc0",
        600: "#4a6a90",
        700: "#2a4060",
        800: "#1a2f4a",
        900: "#0a1628",
    },
    primary: {
        // teal / cyan-green
        100: "#d0fff7",
        200: "#a0ffee",
        300: "#00e5b0",
        400: "#00c99a",
        500: "#00b386",
        600: "#009970",
        700: "#007a5a",
        800: "#005c44",
        900: "#003d2e",
    },
    secondary: {
        // hot pink / magenta
        100: "#ffe0ea",
        200: "#ffb3c8",
        300: "#ff80a8",
        400: "#ff4d88",
        500: "#ff3d7f",
        600: "#cc3166",
        700: "#ff80a8",
        800: "#661834",
        900: "#330c1a",
    },
    tertiary: {
        500: "#4dabf7",
    },
    background: {
        light: "#122040",
        main: "#060f1e",
    },
};

// mui theme settings
export const themeSettings = {
    palette: {
        primary: {
            ...tokens.primary,
            main: tokens.primary[500],
            light: tokens.primary[400],
        },
        secondary: {
            ...tokens.secondary,
            main: tokens.secondary[500],
        },
        tertiary: {
            ...tokens.tertiary,
        },
        grey: {
            ...tokens.grey,
            main: tokens.grey[500],
        },
        background: {
            default: tokens.background.main,
            light: tokens.background.light,
        },
    },
    typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 12,
        h1: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 32,
        },
        h2: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 24,
        },
        h3: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 20,
            fontWeight: 800,
            color: tokens.grey[200],
        },
        h4: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 14,
            fontWeight: 600,
            color: tokens.grey[300],
        },
        h5: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 12,
            fontWeight: 400,
            color: tokens.grey[500],
        },
        h6: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 10,
            color: tokens.grey[700],
        },
    },
};
