import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  done: {
    main: '#e53e3e',
    light: '#81c784'
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: 'rgba(0, 0, 0, 0.12)',
    },
  },
});

export default theme;