import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box'
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { TextField, IconButton } from '@mui/material';


export const TextInputWithCloseIcon = (props) => {
  const theme = useTheme();

  // Custom styling for action bar
  const ButtonGroupBox = styled(Box) ({
  });

  const TextFieldInput = styled(TextField) ({
    marginTop: '.3rem',
    marginBottom: '.3rem',
    width: '300px',
    '@media (max-width: 780px)': {
      width: '250px'
    },
  })

  const CloseIconButton = styled(IconButton) ({
    position: 'absolute !important',
    right: '-17.5%',
    top: '10%',
    '@media (max-width: 780px)': {
      fontSize: '1rem'
    }
  });


  return (
    <ButtonGroupBox
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        mt: '1rem'
      }}
    >
      <TextFieldInput
        id={props.textFieldIdName}
        name={props.name}
        placeholder={props.placeholder}
        error={props.hasError || props.serverSideError}
        helperText={
          props.hasError ? props.errorMsg : ''
          ||
          props.serverSideError ? props.serverSideMsgs[0] : ''
        }
        onChange={props.onChange}
        onBlur={props.onBlur}
        variant="outlined"
        value={props.ingredient_name || ''}
        label={props.label}
      />
      <CloseIconButton
        id={props.iconButtonIdName}
        color = { theme.palette.primary.main }
        onClick={() => props.iconOnClick(props.id)}
        aria-label={props.iconButtonAriaLabel}
        component={props.iconButtonComponent}
      >
        <CloseIcon sx={{fontSize: '1.75rem'}}/>
      </CloseIconButton>
    </ButtonGroupBox>
  )
}
