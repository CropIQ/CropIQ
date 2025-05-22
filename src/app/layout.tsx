import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/Header/Header';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';


export const metadata: Metadata = {
    title: "CropIQ",
    description: "CropIQ - For Farmers, By Farmers",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
        <body className={`antialiased`}>
            <InitColorSchemeScript attribute="class"/>
            <AppRouterCacheProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Header/>
                    <Box sx={{ mt: { xs: 7, sm: 8 } }}>
                        {children}
                    </Box>
                </ThemeProvider>
            </AppRouterCacheProvider>
        </body>
    </html>
  );
}
