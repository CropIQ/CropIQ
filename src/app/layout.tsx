import "./globals.css";
import theme from '../theme';
import Header from '@/components/Header/Header';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import type { Metadata } from "next";
import Box from "@mui/material/Box";
import { AuthProvider } from "@/contexts/AuthContext";

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
        <body className={`antialiased`} suppressHydrationWarning>
            <InitColorSchemeScript attribute="class"/>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <AuthProvider>
                        <Box suppressHydrationWarning sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100vh',
                        }}>
                            <Header/>
                            {children}
                        </Box>
                    </AuthProvider>
                </ThemeProvider>
            </AppRouterCacheProvider>
        </body>
    </html>
  );
}
