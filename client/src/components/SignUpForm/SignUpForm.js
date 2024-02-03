
import { Typography, Container, TextField, Box } from '@mui/material';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';

const SignUpForm = () => {
  const submitHandler = (evt) => {
    evt.preventDefault();
  }

  const TextFieldBox = styled(TextField) ({
    marginTop: '2rem',
  });

  /*
Create an account
Sign up to save and review your favorite recipes.

  */

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
        <Typography
          variant='h1'
          sx={{
            textAlign: 'center',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}
        >
          Create an account
        </Typography>
        <Typography
          variant='h2'
          sx={{
            textAlign: 'center',
            fontSize: '1.25rem',
            marginTop: '.75rem'
          }}
        >
          Sign up to save and review your favorite recipes.
        </Typography>
        <form onSubmit={submitHandler} method="post">
          <Box sx={{
            display: 'grid',
            justifyContent: 'center',
            gridTemplateRows: '1fr 1fr',
            gridTemplateColumns: '1fr'
          }}>
            <TextFieldBox
              id="email"
              label="Email"
              variant="standard"
              required
            />
            <TextFieldBox
              id="password"
              label="Password"
              type="password"
              variant="standard"
              autoComplete="current-password"
            />
          </Box>
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: '50%',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '2rem'
            }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  )
};

export default SignUpForm;
