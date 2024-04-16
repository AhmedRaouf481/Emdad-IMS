'use client';
import { Poppins } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import colors from '@/styles/colors';

export const poppins = Poppins({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    typography: {
        fontFamily: poppins.style.fontFamily,
    },
    palette: {
        primary: {
            main: colors.black,
        },
        secondary: {
            main: colors.purple
        },
        info: {
            main: colors.orange
        },
        warning: {
            main: colors.green
        }
    }
});

export default theme;
