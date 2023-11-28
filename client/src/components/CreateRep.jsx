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
  const [role, setRole] = useState('')



  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [errors, setErrors] = useState([])


  

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match!');
    } else {
      setPasswordError('');

      axios.post(process.env.REACT_APP_API_URL+ '/api/register', {firstName, lastName, email, office, address, phone, dob, password, role}, {withCredentials: true})
      .then(response=>{
        console.log(response.data)
        navigate('/')
      })
      .catch(err=>{
        console.log(err.response)
        const errorResposneDataErrors = err.response.data.errors
        const errMsgArr = []
        for (const eachKey in errorResposneDataErrors){
          errMsgArr.push(errorResposneDataErrors[eachKey].message)
        }
        setErrors(errMsgArr)
      })
      
    }

   
      
  }


  const handleHome = () => {
    navigate('/')
  }

  return (
    <div >
        <NavBarMui/>   
       <div>
      <h1 style={{textAlign: "Left"}}>Add a New User</h1>
      {/* REGISTRATION FORM FOR NEW REP */}
      <Button sx={{marginLeft:"10%"}} size="small" variant='outlined' onClick={handleHome}>back to Dashboard</Button>
     
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', margin: "10%", marginTop: 40}}>
        <Box sx={{display:'flex', justifyContent: 'center', boxShadow: 3, padding: 5}}>
          <div>
          <div className='form-element'>
          <FormLabel >First name:</FormLabel>
          <Input type='text' name='firstName' value={firstName}  onChange={(e)=>setFirstName(e.target.value)}/>
          </div>
          
          <div className='form-element'>
          <FormLabel>Last name:</FormLabel>
          <Box>
          <Input type='text' name='lastName' value={lastName}  onChange={(e)=>setLastName(e.target.value)}/>
          </Box>
          </div>

          <div className='form-element'>
          <FormLabel>Phone number:</FormLabel>
          <Input type='number' name='phone' value={phone}  onChange={(e)=>setPhone(e.target.value)}/>
          </div>

          <div className='form-element'>
          <FormLabel>Email:</FormLabel>
          <Box>
          <Input type='text' name='email' value={email}  onChange={(e)=>setEmail(e.target.value)}/>
          </Box>
          </div>

          <div className='form-element'>
          <FormLabel>Address:</FormLabel>
          <Box>
          <Input type='text' name='address' value={address}  onChange={(e)=>setAddress(e.target.value)}/>
          </Box>
          </div>

          
          </div>
  


          <div>
        
          <div className='form-element'>
          <FormLabel>DOB:</FormLabel>
          <Box>
          <Input type='date' name='dob' value={dob}  onChange={(e)=>setDob(e.target.value)}/>
          </Box>
          </div>
          <div className='form-element'>
          <FormLabel>Password:</FormLabel>
          <Box>
          <Input type='password' name='password' value={password}  onChange={(e)=>setPassword(e.target.value)}/>
          </Box>
          </div>
          <div className='form-element'>
          <FormLabel>Confirm Password:</FormLabel>
          <Input type='password' name='referral' value={confirmPassword}  onChange={(e)=>setConfirmPassword(e.target.value)}/>
          </div>
          <div className='form-element'>
          <FormLabel>Office</FormLabel>
          <Box>
          <Select sx={{height:30, width:150}} type='text' name='office' value={office} onChange={(e)=>setOffice(e.target.value)}>
            <option hidden>Choose Office:</option>
            <MenuItem value='VA'>Virginia</MenuItem>
            <MenuItem value='MD'>Maryland</MenuItem>
          </Select>
          </Box>
          </div>
          <div className='form-element'>
          <FormLabel>Role</FormLabel>
          <Box>
          <Select sx={{height:30, width:150}} type='text' name='office' value={role} onChange={(e)=>setRole(e.target.value)}>
            <option hidden>Role:</option>
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='manager'>Manager</MenuItem>
            <MenuItem value='sales'>Sales</MenuItem>
            <MenuItem value='installer'>Installer</MenuItem>
          </Select>
          </Box>
          </div>
        </div> 
        
       
       

  
        
          
          </Box>
        <Button sx={{margin:4, maxWidth: 300}} type="submit" size="small" variant='contained'>Add User</Button>  
        
      </form>
        </div>
        {
        errors.map((eachErr,i)=>(
       
          <p key={i} style={{color: "red"}}>{eachErr}</p>
          
        ))
      }

    </div>
  )
}

export default CreateRep