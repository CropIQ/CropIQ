"use client";
import { createTheme, darken, lighten } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

// import type { Palette, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    header: Palette['primary'] & {
      borderColor: string;
      navBarColor?: string;
    },
    notFound: Palette['primary']
  }
  interface PaletteOptions {
    header?: PaletteOptions['primary'] & {
      borderColor?: string;
      navBarColor?: string;
    },
    notFound?: PaletteOptions['primary']
  }
}



const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        header: {
          main: '#F6F8FA',
          light: lighten('#F6F8FA', 0.2),
          dark: darken('#F6F8FA', 0.2),
          contrastText: '#1F2328',
          borderColor: darken('#F6F8FA', 0.2),
          navBarColor: '#FD7C74',
        },
        notFound: {
          main: '#F6F8FA',
          light: lighten('#F6F8FA', 0.2),
          dark: darken('#F6F8FA', 0.2),
          contrastText: '#1F2328',
        },
        background: {
          default: '#F6F8FA',
          paper: '#F6F8FA',
        },
      },
    },
    dark: {
      palette: {
        header: {
          main: '#010409',
          light: lighten('#010409', 0.2),
          dark: darken('#010409', 0.2),
          contrastText: '#F0F6FC',
          borderColor: lighten('#010409', 0.2),
          navBarColor: '#FD7C74',
        },
        notFound: {
          main: '#1B2430',
          light: lighten('#1B2430', 0.2),
          dark: darken('#1B2430', 0.2),
          contrastText: '#F0F6FC',
        },
        background: {
          default: '#1B2430',
          paper: '#1B2430',
        },
      },
    }
  },  
  cssVariables: {
    colorSchemeSelector: 'class'
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;