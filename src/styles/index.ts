import { createStitches } from "@stitches/react";

export const {
    config,
    createTheme,
    css,
    getCssText,
    globalCss,
    keyframes,
    styled,
    theme
} = createStitches({
    theme: {
        colors: {
            white: "#fff",
            black: "#000",

            gray900: "#121214",
            gray800: "#202024",
            gray700: "#29292e",
            gray300: "#c4c4cc",
            gray100: "#e1e2e6",

            green500:"#00875f",
            green300:"#00b37e"
            
        },

        fontSizes: {
            md: "1.125rem",
            lg: "1.25rem",
            xl: "1.5rem",
            '2xl': "1.875rem",
        }
    }
})