
import { Typography } from '@mui/material';
import Box from '@mui/material/Box'
import { styled } from '@mui/system';

// https://stackoverflow.com/questions/45847090/media-queries-in-mui-components
// Create utility function to calculate combined time into minutes
const InfoBox = (props) => {
  const InfoBoxStyled = styled(Box) ({
    padding: '1.5rem',
    backgroundColor: 'rgb(35, 36, 16)',
    marginTop: '2rem',
    textAlign: 'center',
    display: 'grid',
    gridGap: '1rem',
    '@media (max-width: 780px)': {
      gridTemplateColumns: '1fr 1fr'
    }
  });

  const Info = styled(Box) ({
    display: 'flex',
    flexDirection: 'column'
  })

  return (
    <InfoBoxStyled
      sx={{
        gridTemplateColumns: '1fr 1fr 1fr',
        alignItems: 'center'
      }}
    >
      <Info>
        <Typography component="p" sx={{fontWeight: 'bold'}}>Prep Time</Typography>
        <Typography>{`${props.prepTime} ${props.prepTimeQty}`}</Typography>
      </Info>
      <Info>
        <Typography component="p" sx={{fontWeight: 'bold'}}>Cook Time</Typography>
        <Typography>{`${props.cookTime} ${props.cookTimeQty}`}</Typography>
      </Info>
      <Info>
        <Typography component="p" sx={{fontWeight: 'bold'}}>Total Time</Typography>
        <Typography>{`${props.cookTime + props.prepTime} ${props.cookTimeQty}`}</Typography>
      </Info>
      <Info>
        <Typography component="p" sx={{fontWeight: 'bold'}}>Servings</Typography>
        <Typography>{props.servings ? `${props.servings}` : 'N/A'}</Typography>
      </Info>
    </InfoBoxStyled>
  )
};

export default InfoBox;
