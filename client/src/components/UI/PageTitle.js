

import React from 'react';
import { Typography } from '@mui/material';


const PageTitle = (props) => {
  return (
    <Typography
      variant="h1"
      sx={{'mt': '2rem', 'fontSize': '2.5rem', 'letterSpacing': '.15rem'}}
      align="center"
    >
      {props.children}
    </Typography>
  );
}

export default PageTitle;
