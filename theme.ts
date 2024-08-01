"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#BD1E2D",
    },
    secondary: {
      main: "#2E3A85",
    },
  },
  typography: {
    fontFamily: "Poppins",
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
