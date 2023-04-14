import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ShareIcon from '@mui/icons-material/Share';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box'
import ActionBarButton from './ActionBarButton';
import { styled } from '@mui/system';


const ActionBar = () => {
  const theme = useTheme();

  // Custom styling for action bar
  const ActionBarBox = styled(Box) ({
    "&>*:nth-of-type(1)": { borderTopLeftRadius: '4.5px', borderBottomLeftRadius: '4.5px' },
    "&>*:last-child": { borderTopRightRadius: '4.5px', borderBottomRightRadius: '4.5px' },
    '@media (max-width: 780px)': {
      fontSize: '.75rem'
    },
    color: '#fff'
  });

  const ActionFavoriteBorderIcon = styled(FavoriteBorderIcon) ({
    '@media (max-width: 780px)': {
      fontSize: '1rem'
    }
  });

  const ActionStarBorderIcon = styled(StarBorderIcon) ({
    '@media (max-width: 780px)': {
      fontSize: '1rem'
    }
  });

  const ActionLocalPrintshopIcon = styled(LocalPrintshopIcon) ({
    '@media (max-width: 780px)': {
      fontSize: '1rem'
    }
  });

  const ActionShareIcon = styled(ShareIcon) ({
    '@media (max-width: 780px)': {
      fontSize: '1rem'
    }
  });


  return (
    <ActionBarBox
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        mt: '1rem'
      }}
    >
      <ActionBarButton
        icon = {
          <ActionFavoriteBorderIcon
            sx={{
              ml: '.3rem'
            }}
          />
        }
        customStyles = {{
          borderRight: '1px solid #fff'
        }}
        color = { theme.palette.primary.main }
        text = 'Save'
      />
      <ActionBarButton
        icon = {
          <ActionStarBorderIcon
            sx={{ml: '.3rem'}}
          />
        }
        customStyles = {{
          borderRight: '1px solid #fff'
        }}
        color = { theme.palette.primary.main }
        text = 'Rate'
      />
      <ActionBarButton
        icon = {
          <ActionLocalPrintshopIcon
            sx={{ml: '.3rem'}}
          />
        }
        customStyles = {{
          borderRight: '1px solid #fff'
        }}
        color = { theme.palette.primary.main }
        text = 'Print'
      />
      <ActionBarButton
        icon = {
          <ActionShareIcon
            sx={{ml: '.3rem'}}
          />
        }
        customStyles = {{
          borderRight: '1px solid #fff'
        }}
        color = { theme.palette.primary.main }
        text = 'Share'
      />
    </ActionBarBox>
  )
}

export default ActionBar;
