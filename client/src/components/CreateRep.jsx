import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FormLabel } from '@mui/material'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import NavBarMui from './NavBarMui'
import '../App.css';




const CreateRep = () => {

  //Delcaring all states needed in the form
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [office, setOffice] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState(0)
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [maritalStatus, setMaritalStatus] = useState('')
  const [referral, setReferral] = useState('')
  const [education, setEducation] = useState('')
  const [ethnicity, setEthnicity] = useState('')



  

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:8000/api/rep', {firstName, lastName, email, office, address, phone, dob, gender, maritalStatus, referral,education, ethnicity}, {withCredentials: true})
      .then(response=>{
        console.log(response.data)
        navigate('/')
      })
      .catch(err=>navigate("/login"))
      
  }


  const handleHome = () => {
    navigate('/')
  }

  return (
    <div >
        <NavBarMui/>   
       <div style={{marginLeft: 150, marginRight: 150}}>
      <h1 style={{textAlign: "Left"}}>Add a New Representative</h1>
      {/* REGISTRATION FORM FOR NEW REP */}
      <Button sx={{marginLeft:"10%"}} size="small" variant='outlined' onClick={handleHome}>back to Dashboard</Button>
     
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: 550, marginLeft: "30%", marginTop: 40}}>
        <Box sx={{display:'flex', justifyContent: 'center', boxShadow: 3, padding: 5}}>
          <div>
          <div className='form-element'>
          <FormLabel >First name:</FormLabel>
          <Input type='text' name='firstName' value={firstName}  onChange={(e)=>setFirstName(e.target.value)}/>
          </div>
          
          <div className='form-element'>
          <FormLabel>Last name:</FormLabel>
          <Input type='text' name='lastName' value={lastName}  onChange={(e)=>setLastName(e.target.value)}/>
          </div>

          <div className='form-element'>
          <FormLabel>Phone number:</FormLabel>
          <Input type='number' name='phone' value={phone}  onChange={(e)=>setPhone(e.target.value)}/>
          </div>

          <div className='form-element'>
          <FormLabel>Email:</FormLabel>
          <Input type='text' name='email' value={email}  onChange={(e)=>setEmail(e.target.value)}/>
          </div>

          <div className='form-element'>
          <FormLabel>Address:</FormLabel>
          <Input type='text' name='address' value={address}  onChange={(e)=>setAddress(e.target.value)}/>
          </div>

          <div className='form-element'>
          <FormLabel>DOB:</FormLabel>
          <Input type='date' name='dob' value={dob}  onChange={(e)=>setDob(e.target.value)}/>
          </div>
          </div>
  


          <div>
          <div className='form-element'>
          <FormLabel>Gender:</FormLabel>
          <Select sx={{height:30}} type='text' name='gender' value={gender} onChange={(e)=>setGender(e.target.value)}>
            <option hidden>Choose gender</option>
            <MenuItem value='Male'>Male</MenuItem>
            <MenuItem value='Female'>Female</MenuItem>
            <MenuItem value='Other'>Other</MenuItem>
          </Select>
          </div>


          <div className='form-element'>
        <FormLabel>Marital Status:</FormLabel>
          <Select sx={{height:30}} type='text' name='maritalstatus' value={maritalStatus} onChange={(e)=>setMaritalStatus(e.target.value)}>
            <MenuItem hidden>Choose marital status:</MenuItem>
            <MenuItem value='single'>Single</MenuItem>
            <MenuItem value='married'>Married</MenuItem>
            <MenuItem value='FormControlorced'>FormControlorced</MenuItem>
            <MenuItem value='widowed'>Widowed</MenuItem>
          </Select>
          </div>

          <div className='form-element'>
          <FormLabel>Ethnicity:</FormLabel>
          <Select sx={{height:30}} type='text' name='ethnicity' value={ethnicity} onChange={(e)=>setEthnicity(e.target.value)}>
            <option hidden>Choose:</option>
            <MenuItem value='white'>White</MenuItem>
            <MenuItem value='africanameerican'>African American</MenuItem>
            <MenuItem value='asian'>Asian</MenuItem>
            <MenuItem value='hispanic'>Hispanic</MenuItem>
          </Select>
          </div>
          
      
        {/* UNCOMMENT THIS WHEN LOGIN AUTH IS IMPLEMENTED<div>
          <label>Password:</label>
          <Input type='text' name='password' value={password}  onChange={(e)=>setPassword(e.target.value)}/>
        </div> */}
          <div className='form-element'>
          <FormLabel>Referral:</FormLabel>
          <Input type='text' name='referral' value={referral}  onChange={(e)=>setReferral(e.target.value)}/>
          </div>
          <div className='form-element'>
        <FormLabel>Education:</FormLabel>
          <Select sx={{height:30}} type='text' name='education' value={education} onChange={(e)=>setEducation(e.target.value)}>
            <option hidden>Choose education:</option>
            <MenuItem value='highschool'>High School</MenuItem>
            <MenuItem value='college'>College</MenuItem>
            <MenuItem value='bachelor'>Bachelor's Degree</MenuItem>
            <MenuItem value='master'>Master's Degree</MenuItem>
            <MenuItem value='doctorate'>Doctorate</MenuItem>
          </Select>
       

        </div>
        <div className='form-element'>
          <FormLabel>Office</FormLabel>
          <Select sx={{height:30}} type='text' name='office' value={office} onChange={(e)=>setOffice(e.target.value)}>
            <option hidden>Choose Office:</option>
            <MenuItem value='VA'>Virginia</MenuItem>
            <MenuItem value='MD'>Maryland</MenuItem>
          </Select>
          </div>
          </div>
          </Box>
        <Button sx={{margin:4}} type="submit" size="small" variant='contained'>Add Representative</Button>  
      </form>
        </div>

    </div>
  )
}

export default CreateRep