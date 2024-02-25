import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UserType from "./UserType";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();
const baseurl = "http://localhost:8000";

export default function Login(event) {
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();
  const[role,setRole]=useState('');
  const data = new FormData(event.currentTarget);
  const email = data.get('email');
  const password = data.get('password');
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    if (!email || !password ) {
      alert('Please fill in all fields');
      return;
    }
    console.log({
      email: email,
      password: password,
    });
    
  };
  const loginHandler=async(event)=>{
    event.preventDefault();
    const email = data.get('email');
    //   if(!userType.email || !userType.password){
    //       alert('please provide the details');
       try{ 
      let response=await axios.post(`${baseurl}/login`,{ email, ...userType,userType:role})
      console.log(response.data.message);
  if(response.data.error){
       alert(response.data.error);
  }
  if( response.data.message){
    alert( response.data.message);
    navigate('/signup');
  }
       }catch(error){
        console.error(error.message);
        alert('An error occurred during login');
       }
  }

  const onChangeHandler = (event) => {
    setUserType({
      ...userType,
      [event.target.name]: event.target.value
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <UserType role={role} setRole={setRole} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={onChangeHandler}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={loginHandler}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={() => navigate('/signup')}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2"  onClick={() => navigate('/pwd')}>
                 Forgot Password
                
                </Link>
              
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
