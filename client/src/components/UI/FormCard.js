import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const FormCard = (props) =>  {
  return (
    <Card sx={{ minWidth: 500, marginTop: '3rem' }}>
      <CardContent>
        {props.children}
      </CardContent>
    </Card>
  );
}

export default FormCard;
