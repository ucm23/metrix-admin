import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const colorPrimary = '#1677ff';

export const styleModal = {
    position: 'absolute',
    top: '0%',
    left: '0%',
    bottom: '0%',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
};

const theme = createTheme({
    palette: {
        primary: {
            main: colorPrimary,
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        white: {
            main: '#FFF',
        },
    },
});

export default theme;
