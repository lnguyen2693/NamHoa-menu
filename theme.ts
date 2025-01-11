"use client";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  // display: 'swap',
});

export const theme = createTheme({
  palette: {
    primary: {
      main: "#BD1E2D",
      light: "#fae2e4",
    },
    secondary: {
      main: "#2E3A85",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'Poppins'
      }`,
    },
  },
});
