import React, { useState, useEffect } from 'react';
import axios from 'axios'
import moment from 'moment'
import { TextField, Button, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import NavBarMui from './NavBarMui';


const UserEdit = () => {
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [office, setOffice ] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [dob, setDob] = useState('')
    const [role, setRole] = useState('')

    const {id} = useParams()

    //variable to hanlde errors on validation
  const [errors, setErrors] = useState([])

  //get all reps info

  useEffect(()=>{
    axios.get(process.env.REACT_APP_API_URL+`/api/user/${id}`, {withCredentials: true})
      .then(response=>{
        // console.log(response.data)
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
        setOffice(response.data.office)
        setAddress(response.data.address)
        setPhone(response.data.phone)
        setRole(response.data.role)
        setDob(moment(response.data.dob).format("YYYY-MM-DD"))
      })
      .catch(err=>{
        console.log(err.response)
        const errorResponseDAtaErrors = err.response.errors
        const errMsgArr =[]
        for (const eachKey in errorResponseDAtaErrors){
          errMsgArr.push(errorResponseDAtaErrors[eachKey].message)
        }
        setErrors(errMsgArr)
      })
  },[])
  
   //call a put method to update rep
   const handleSubmit = (e) => {
    e.preventDefault()
    axios.put(process.env.REACT_APP_API_URL + `/api/user/${id}`, {firstName, lastName, email, office, address, phone, dob, password, withCredentials:true})
      .then(response=>{
        console.log(response.data)
        alert('update succesfull')
        navigate('/all/users')
      })
      .catch(err=>alert('we could not update the user'))
  }

  const handleHome = () => {
    navigate('/')
  }

  const handleDelete = (id) => {
    axios.delete(process.env.REACT_APP_API_URL+`/api/user/${id}`, {withCredentials: true})
    .then(response=>{
      console.log(response)
      navigate('/')
    })
    .catch(err=>console.log(err))
  }
    
  
 
  
    return (
        <div>
            <NavBarMui/>
      <form style={{margin: 40}} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}     
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}   
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              name="addPasswordress"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date of Birth"
              name="dob"
              value={dob}
              onChange={(e)=>setDob(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth>
              <InputLabel>Office</InputLabel>
              <Select
                label="Office"
                name="office"
                value={office}
                onChange={(e)=>setOffice(e.target.value)}
                required
              >
                <MenuItem value="VA">Viginia</MenuItem>
                <MenuItem value="MD">Maryland</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                name="role"
                value={role}
                onChange={(e)=>setRole(e.target.value)}
                required
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="sales">Sales</MenuItem>
                <MenuItem value="verif">Verification</MenuItem>
                <MenuItem value="installer">Installer</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
            <Button  sx={{marginLeft: 35}} onClick={handleDelete} variant="contained" color="error">
              Delete User
            </Button>
          
          </Grid>
        </Grid>
      </form>
      </div>
    );
  };
  
export default UserEdit