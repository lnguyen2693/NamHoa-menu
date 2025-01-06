"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#BD1E2D",
      light: "#fae2e4"
    },
    secondary: {
      main: "#5963A5",
    },
  },
  typography: {
    fontFamily: "Roboto",
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
