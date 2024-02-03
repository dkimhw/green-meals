import { styled } from '@mui/system';
import { TextField } from '@mui/material'

const StyledTextAreaInput = styled(TextField) ({
  marginTop: '1rem',
  marginBottom: '1rem',
  width: '100%',
  '@media (max-width: 780px)': {
    width: '100%'
  },
});

const TextAreaInput = (props) => {

  return (
    <StyledTextAreaInput
      id={props.id}
      name={props.name}
      placeholder={props.placeholder}
      multiline
      rows={4}
      variant="outlined"
      error={props.error}
      helperText={props.helperText}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  )
}

export default TextAreaInput
