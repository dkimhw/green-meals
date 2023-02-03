import classes from './Divider.module.css';
import { Box } from '@mui/material'

const Divider = (props) => {
  let borderCss = props.borderCSS ? props.borderCSS : '#d3d3d3 1px solid';
  return (
    <Box className={classes.divider} sx={{
      borderTop: borderCss
    }}>
      <span>{props.children}</span>
    </Box>
  );
};


export default Divider;
