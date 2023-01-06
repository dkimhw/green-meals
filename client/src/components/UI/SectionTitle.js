

import React from 'react';
import { Typography, Box } from '@mui/material';
import classes from './SectionTitle.module.css';
import { useTheme } from '@mui/material/styles';

const SectionTitle = (props) => {
  const theme = useTheme();
  const lightMainColor = theme.palette.primary.lightMain;

  return (
    <Box
      className={classes['section-title-wrapper']}
      sx={{
        '&::before': {
          background: `linear-gradient(to bottom, transparent 35%, ${lightMainColor}  35%, ${lightMainColor} 65%, transparent 65%),linear-gradient(to right, transparent 35%, ${lightMainColor}  35%, ${lightMainColor} 65%, transparent 65%)`,
          content: '""',
          position: "absolute",
          width: "25px",
          height: "25px",
        }
      }}
    >
    <Typography
      variant="h1"
      sx={{
        mt: '2rem',
        fontWeight: 'bold',
        letterSpacing: '.1rem',
        boxShadow: `inset 0 -16px 0 0 ${lightMainColor}`,
        paddingBotton: '4px',
        marginLeft: '25px',
        marginTop: '0',
        display: 'inline-block',
      }}
      align="center"
      className={classes['section-title']}
    >
      {props.children}
    </Typography>
    </Box>
  );
}

export default SectionTitle;
