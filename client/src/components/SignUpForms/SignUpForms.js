
import FormCard from '../UI/FormCard';
import { Typography, TextField } from '@mui/material';

const SignUpForm = () => {
  const submitHandler = (evt) => {
    evt.preventDefault();
  }

  return (
    <FormCard>
      <Typography>
        Sign Up
      </Typography>
      <form onSubmit={submitHandler} method="post">
        <TextField
          id="email"
          label="email"
          variant="outlined"
          required
        />
        <TextField
          id="outlined-password-input"
          label="password"
          type="password"
          autoComplete="current-password"
        />
      </form>
    </FormCard>
  )
};

export default SignUpForm;
