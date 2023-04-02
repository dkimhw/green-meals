
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';


const ActionBarButton = (props) => {
  const ActionButtonBox = styled(Box) (
    props.customStyles ? props.customStyles : {}
  );

  return (
    <ActionButtonBox
      sx={{
        backgroundColor: props.color,
        padding: '.75rem 1rem',
        display: 'flex',
      }}
    >
      <Typography
        component='p'
      >
        { props.text }
      </Typography>
      { props.icon }
    </ActionButtonBox>
  )
}

export default ActionBarButton;
