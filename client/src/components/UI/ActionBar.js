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
  const ActionBarBox = styled(Box) ({
    "&>*:nth-child(1)": { borderTopLeftRadius: '4.5px', borderBottomLeftRadius: '4.5px' },
    "&>*:last-child": { borderTopRightRadius: '4.5px', borderBottomRightRadius: '4.5px' }
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
          <FavoriteBorderIcon
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
          <StarBorderIcon
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
          <LocalPrintshopIcon
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
          <ShareIcon
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
