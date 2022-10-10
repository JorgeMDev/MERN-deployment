import React from 'react'
import { Button } from '@mui/material'
import logo from '../images/logo-no-background.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
       axios.get('http://localhost:8000/api/logout', {withCredentials: true})
       .then(response => {
        console.log(response.data)
        navigate('/login')})
        .catch(err=>console.log(err.response))
    }

  return (
 

    <div  className='nav-bar'>
        <img style={{margin: 3, width: 300}} src={logo}></img>
        <Button sx={{heigth:300}} onClick={handleLogout} variant="contained" color="info">Log out</Button>
      </div>
 
  )
}

export default NavBar