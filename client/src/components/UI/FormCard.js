
import { Card } from '@mui/material';
import classes from './FormCard.module.css';

const FormCard = (props) => {
  return (
    <Card className={classes['card-form']} sx={{boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'}}>
      {props.children}
    </Card>
  )
};

export default FormCard;
