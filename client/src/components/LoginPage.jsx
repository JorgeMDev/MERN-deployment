import React, {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../images/logo-no-background.png'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Aquasoft
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginPage() {

  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

 

  
  //variable to hanlde errors on validation
  const [errors, setErrors] = useState("")

  const newCookie = (event) => {
    event.preventDefault();
    axios.get("https://crm-production.up.railway.app/api/cookie")
    .then(res=> {
      console.log(res)
      })
    .catch(err => {
      console.log(err.response.data)
     
    },[])}


  


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("https://crm-production.up.railway.app/api/login", user, {withCredentials: true,  headers: {
      'Access-Control-Allow-Origin': '*', 
      'Content-Type': 'application/json'
  }}) //testing headers
    .then(res=> {
      console.log(res)
      navigate('/')})
    .catch(err => {
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.response.headers)
     
      setErrors('Invalid Email / Password')
    },[])}

    const handleSkip = (event) => {
      event.preventDefault();
      setUser({
        email: "jorgemartinez1990@gmail.com",
         password: "19607061"
      })
  };

  const changeHandler = (e) => {
    let {name, value} = e.target
    setUser({
      ...user,
      [name]: value
    })

  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <img style={{width:300, marginBottom: 40}} alt="logo" src={logo}></img>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={user.email}
              autoFocus
            onChange={changeHandler}/>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={user.password}
              autoComplete="current-password"
              onChange={changeHandler}
            />
        
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Button href="/" variant="contained" color="success" onClick={handleSkip}>
                  {"Demo Account"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {
          errors?<p style={{color: "red"}}>{errors}</p>:<p></p>
             
        }
        <Copyright sx={{ mt: 8, mb: 4 }} />
    
      </Container>
   
    </ThemeProvider>
  );
}