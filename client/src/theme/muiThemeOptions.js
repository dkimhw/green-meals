

// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

// export const themeOptions: ThemeOptions = {
  // palette: {
  //   type: 'light',
  //   primary: {
  //     main: '#3f51b5',
  //   },
  //   secondary: {
  //     main: '#f50057',
  //   },
  // },
// };

import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  typography: {
    fontFamily: [
      'Lexend Deca',
      'Helvetica',
    ].join(',')
  },
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
      lightMain: '#a0b9de'
    },
    secondary: {
      main: '#f50057',
    },
    error: {
      main: '#d32f2f',
    }
  },
});
