import { createSystem, defaultConfig } from "@chakra-ui/react";

const fontFamily = "var(--font-figtree)";

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        heading: { value: fontFamily },
        body: { value: fontFamily },
      },
    },
    semanticTokens: {
      colors: {
        text: {
          primary: {
            value: { _light: "#171717", _dark: "#FAFAFA" },
          },
          secondary: {
            value: { _light: "#737373", _dark: "#A3A3A3" },
          },
        },
        bg: {
          primary: {
            value: { _light: "#FFFFFF", _dark: "#121212" },
          },
          muted: {
            value: { _light: "#F7F7F7", _dark: "#1E1E1E" },
          },
        },
        brand: {
          primary: {
            value: { _light: "#F165AE", _dark: "#737373" },
          },
        },
        border: {
          primary: {
            value: { _light: "#e9e9e9", _dark: "#2C2C2C" },
          },
        },
      },
    },
  },
});
