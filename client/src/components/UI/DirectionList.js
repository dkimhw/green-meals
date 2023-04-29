
import { Typography } from '@mui/material';
import { Fragment } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const DirectionList = (props) => {
  return (
    <Fragment>
      <Typography component="h2" sx={{fontWeight: 'bold', fontSize: '1.5rem', mt: '2.5rem'}}>
        Directions
      </Typography>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <List>
          {props.directions ? props.directions.map(direction => {
            return (
              <Fragment>
                <Typography component="h3" sx={{fontWeight: 'bold', fontSize: '1rem', mt: '1.5rem'}}>
                  Step {direction.instruction_order_number}
                </Typography>
                <ListItem key={direction.instruction_order_number}>
                  <ListItemText primary={direction.instruction_text} />
                </ListItem>
              </Fragment>
            )
          }) : '' }
        </List>
      </Box>
    </Fragment>
  )
}

export default DirectionList;
