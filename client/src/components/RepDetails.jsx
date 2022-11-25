import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormControl, FormLabel, FormGroup, Checkbox } from '@mui/material'
import NavBarMui from './NavBarMui'


const RepDetails = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [office, setOffice] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState(0)
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [maritalStatus, setMaritalStatus] = useState('')
  const [referral, setReferral] = useState('')
  const [education, setEducation] = useState('')
  const [ethnicity, setEthnicity] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const {id} = useParams()

  
  //variable to hanlde errors on validation
  const [errors, setErrors] = useState([])

  //get all reps info

  useEffect(()=>{
    axios.get(`/api/rep/${id}`, {withCredentials: true})
      .then(response=>{
        console.log(response.data)
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
        setOffice(response.data.office)
        setAddress(response.data.address)
        setPhone(response.data.phone)
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
      axios.put(`https://crm-production.up.railway.app/api/rep/${id}`, {firstName, lastName, email, office, address, phone, dob, withCredentials:true})
        .then(response=>{
          console.log(response.data)
          navigate('/')
        })
        .catch(err=>navigate("/login"))
    }

    const handleHome = () => {
      navigate('/')
    }

    const handleDelete = (id) => {
      axios.delete(`https://crm-production.up.railway.app/api/rep/${id}`, {withCredentials: true})
      .then(response=>{
        console.log(response)
        navigate('/')
      })
      .catch(err=>console.log(err))
    }





  return (
    <div>
       <NavBarMui/>
      <div style={{marginLeft: 150, marginRight: 150}}>
      <h1>Update Representative</h1>
      <Button size="small" variant='outlined' onClick={handleHome}>back to Dashboard</Button>
      <Box sx={{display:'flex', justifyContent: 'center', boxShadow: 1, padding: 1, marginTop: 3}}>
      <form onSubmit={handleSubmit}>
        <FormGroup sx={{width: 300}}>
        <FormControl size='small'>
          <FormLabel >First name:</FormLabel>
          <Input type='text' name='firstName' value={firstName}  onChange={(e)=>setFirstName(e.target.value)}/>
        </FormControl>
        <FormControl>
          <FormLabel>Last name:</FormLabel>
          <Input type='text' name='lastName' value={lastName}  onChange={(e)=>setLastName(e.target.value)}/>
        </FormControl>
        <FormControl>
          <FormLabel>Phone number:</FormLabel>
          <Input type='number' name='phone' value={phone}  onChange={(e)=>setPhone(e.target.value)}/>
        </FormControl>
        <FormControl>
          <FormLabel>Email:</FormLabel>
          <Input type='text' name='email' value={email}  onChange={(e)=>setEmail(e.target.value)}/>
        </FormControl>
        <FormControl>
          <FormLabel>Address:</FormLabel>
          <Input type='text' name='address' value={address}  onChange={(e)=>setAddress(e.target.value)}/>
        </FormControl>
        <FormControl>
          <FormLabel>DOB:</FormLabel>
          <Input type='date' name='dob' value={dob}  onChange={(e)=>setDob(e.target.value)}/>
        </FormControl>
        {/* UNCOMMENT THIS WHEN LOGIN AUTH IS IMPLEMENTED<div>
          <label>Password:</label>
          <Input type='text' name='password' value={password}  onChange={(e)=>setPassword(e.target.value)}/>
        </div> */}
        <FormControl>
          <FormLabel>Office</FormLabel>
          <Select sx={{height:30}} type='text' name='office' value={office} onChange={(e)=>setOffice(e.target.value)}>
            <option hidden>Choose Office:</option>
            <MenuItem value='VA'>Virginia</MenuItem>
            <MenuItem value='MD'>Maryland</MenuItem>
          </Select>
        </FormControl>
        <Button sx={{margin:4}} type="submit" size="small" variant='contained'>Update Representative</Button>
        </FormGroup>
      <Button sx={{margin:4}} onClick={handleDelete} color="error" type="submit" size="small" variant='contained'>Delete Representative</Button>
      </form>

        {/* SHOW ERRROR MESSAGE FOR VALIDATIONS */}
        {
          errors.map((eachErr,i)=>(
            <p key={i} syle={{color: 'red'}}>{eachErr}</p>
          ))
        }
        </Box>
        </div>

    </div>
  )
}

export default RepDetails