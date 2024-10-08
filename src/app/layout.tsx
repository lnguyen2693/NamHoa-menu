import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../theme";
import CssBaseline from "@mui/material";
import "../styles/global.css";
import { Suspense } from "react";
// import '@fontsource/poppins';

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ height: "100vh" }}>
        <AppRouterCacheProvider>
          <Suspense>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
