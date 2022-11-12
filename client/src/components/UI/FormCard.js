import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const FormCard = (props) =>  {
  return (
    <Card sx={{ minWidth: 500, marginTop: '3rem', backgroundColor: '#fff' }}>
      <CardContent>
        {props.children}
      </CardContent>
    </Card>
  );
}

export default FormCard;
