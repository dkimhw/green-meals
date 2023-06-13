
import { Typography, Container, TextField, Box } from '@mui/material';

const SignUpForm = () => {
  const submitHandler = (evt) => {
    evt.preventDefault();
  }

  return (
    <Container sx={{
      marginTop: '2rem'
    }}>
      <Box sx={{
        maxWidth: '300px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '2rem 0'
      }}>
        <Typography>
          Sign Up
        </Typography>
        <form onSubmit={submitHandler} method="post">
          <Box sx={{
            display: 'grid',
            justifyContent: 'center',
            gridTemplateRows: '1fr 1fr',
            gridTemplateColumns: '1fr'
          }}>
            <TextField
              id="email"
              label="Email"
              variant="standard"
              required
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="standard"
              autoComplete="current-password"
            />
          </Box>
        </form>
      </Box>
    </Container>
  )
};

export default SignUpForm;
