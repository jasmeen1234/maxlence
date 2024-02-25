import * as React from 'react';
import {useState} from 'react';
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
import UserType from "./UserType"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();
const baseurl="http://localhost:8000"
export default function ResetPswd() {
  const navigate = useNavigate();
  const[userType,setUserType]=useState("");
  const [getError,setError] = useState('');
  const[role,setRole]=useState("");
  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const userType = data.get('userType');
    const password=data.get('password');
    const cpassword=data.get('cpassword');
    const otp=data.get('otp');
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      cpassword:data.get('cpassword'),
      otp:data.get('otp')
    });
    if (!email || !userType || !password || !cpassword || !otp) {
      alert('All fields are required');
      return;
    }
  
    if (password !== cpassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(`${baseurl}/password/set`, { email, userType,password,cpassword,otp });
      console.log(response.data.message);
      alert(response.data.message);
      navigate('/');
    } catch (error) {
      console.error(error.message);
      alert('An error occurred while processing your request');
    }
  };
  const onChangeHandler=(event)=>{
    setUserType({...userType,[event.target.name]:event.target.value})
  }
   const submitHandler=async(event)=>{
    event.preventDefault();
    //   if(!userType.email || !userType.password){
    //       alert('please provide the details');
       try{ 
      let response=await axios.post(`${baseurl}/password/set`,{...userType,userType:role})
      console.log(response.data.message);
  if(response.data.error){
       alert(response.data.error);
  }
  if( response.data.message){
    alert( response.data.message);
    navigate('/');
  }
       }catch(error){
        console.error(error.message);
        alert('An error occurred during sign up');
       }
   }
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
            Reset Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={1}>
            <Grid item xs={12}>
                <UserType role={role} setRole={setRole}/>
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
                  autoComplete="new-password"
                  onChange={onChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="cpassword"
                  label="Conform Password"
                  type="password"
                  id="cpassword"
                  autoComplete="new-password"
                  onChange={onChangeHandler}
                />
                 <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="otp"
                  label="OTP code"
                  type="text"
                  id="otp"
                  autoComplete="new-password"
                  onChange={onChangeHandler}
                />
              </Grid>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={submitHandler}
            >
              submit
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}