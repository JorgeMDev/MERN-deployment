import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { FormControl, FormLabel } from '@mui/material'
import NavBarMui from './NavBarMui'




const CustomerDetails = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [office, setOffice] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState()
  const [dob, setDob] = useState()
  const [doi, setDoi] = useState()
  const [price, setPrice] = useState()
  const [bank, setBank] = useState()
  const [approval, setApproval] = useState()
  const [status, setStatus] = useState('')
  const [comments, setComments] = useState([])
  const [repId, SetRepId] = useState('')
  const [allReps, setAllReps] = useState([])
  const {id} = useParams()

  //variable to hanlde errors on validation
  const [errors, setErrors] = useState([])
  //get all the customer info to populate forms
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/customer/${id}`, {withCredentials: true})
      .then(response=>{
        console.log(response.data)
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
        setOffice(response.data.office)
        setAddress(response.data.address)
        setPhone(response.data.phone)
        setDob(moment(response.data.dob).format("YYYY-MM-DD"))
        setDoi(moment(response.data.doi).format('YYYY-MM-DD'))
        setPrice(response.data.price)
        setBank(response.data.bank)
        setApproval(response.data.approval)
        setStatus(response.data.status)
        setComments(response.data.comments)
        SetRepId(response.data.rep)

      })
      .catch(err=>{
        console.log(err.response)
        const errorResponseDataErrors = err.response.errors
        const errMsgArr = []
        for (const eachKey in errorResponseDataErrors){
          errMsgArr.push(errorResponseDataErrors[eachKey].message)
        }
        setErrors(errMsgArr)
      })

      axios.get('http://localhost:8000/api/reps', {withCredentials: true})
      .then(response=>{
          console.log(response.data)
          setAllReps(response.data) 
      })
      .catch(err=>navigate("/login"))

  },[])
 
  //call a put method to update customer
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put(`http://localhost:8000/api/customer/${id}`, {firstName, lastName, email, office, address, phone, dob, doi, price, bank,approval, status, comments, rep : repId}, {withCredentials: true})
      .then(response=>{
        console.log(response.data)
        navigate('/')
      })
      .catch(err=>console.log(err))
  }
  


  const handleHome = () => {
    navigate('/')
  }


  return (
    <div>
       <NavBarMui/>
        <div style={{margin: "10%"}}>
      {/* UPDATE FORM FOR EXISTING CUSTOMER */}
    <h1>Update a Customer</h1>
    <Button size="small" variant='outlined' onClick={handleHome}>back to Dashboard</Button>
    <Box sx={{display: 'flex', justifyContent: 'center', alignContent: 'space-around'}}>
    <form onSubmit={(e)=>handleSubmit(e)}>
      <Grid container sx={{boxShadow: 2, borderRadius: 2, padding: 5, marginTop: 2}}>
       
        <FormControl sx={{marginRight: 5}}>
        <FormLabel>First name:</FormLabel>
        <Input type='text' name='firstName' value={firstName}  onChange={(e)=>setFirstName(e.target.value)}/>
       
      
        <FormLabel>Last name:</FormLabel>
        <Input type='text' name='lastName' value={lastName}  onChange={(e)=>setLastName(e.target.value)}/>
       
        <FormLabel>Phone number:</FormLabel>
        <Input type='number' name='phone' value={phone}  onChange={(e)=>setPhone(e.target.value)}/>
     
        <FormLabel>Email:</FormLabel>
        <Input type='text' name='email' value={email}  onChange={(e)=>setEmail(e.target.value)}/>
     
        <FormLabel>Address:</FormLabel>
        <Input type='text' name='address' value={address}  onChange={(e)=>setAddress(e.target.value)}/>
     
        <FormLabel>DOB:</FormLabel>
        <Input type='date' name='dob' value={dob}  onChange={(e)=>setDob(e.target.value)}/>
     
        <FormLabel>Date of installation:</FormLabel>
        <Input type='date' name='doi' value={doi}  onChange={(e)=>setDoi(e.target.value)}/>
        </FormControl>
  
        <FormControl sx={{maxWidth: 200}}>
        <FormLabel>Office</FormLabel>
        <Select type='text' name='office' value={office} onChange={(e)=>setOffice(e.target.value)}>
          <MenuItem value='VA'>Virginia</MenuItem>
          <MenuItem value='MD'>Maryland</MenuItem>
        </Select>
    
        <FormLabel>Price:</FormLabel>
        <Input type='number' name='price' value={price}  onChange={(e)=>setPrice(e.target.value)}/>
   
        <FormLabel>Bank:</FormLabel>
        <Input type='text' name='bank' value={bank}  onChange={(e)=>setBank(e.target.value)}/>
     
        <FormLabel>Approval:</FormLabel>
        <Input type='number' name='approval' value={approval}  onChange={(e)=>setApproval(e.target.value)}/>
     
        <FormLabel>Status:</FormLabel>
        <Select type='text' name='status' value={status} onChange={(e)=>setStatus(e.target.value)}>
          <MenuItem value='Sold'>Sold</MenuItem>
          <MenuItem value='Installed'>Installed</MenuItem>
          <MenuItem value='Contract signed'>Contract Signed</MenuItem>
          <MenuItem value='Verified'>Verified</MenuItem>
          <MenuItem value='Paid'>Paid</MenuItem>
        </Select>
    
      <FormLabel>Representative:</FormLabel>
      <Select type='text' name='rep' value={repId} onChange={(e)=>SetRepId(e.target.value)}>
      {
        allReps.map((eachRep,i)=>(
            <MenuItem key={i} value={eachRep._id}>{eachRep.firstName}  {eachRep.lastName}</MenuItem>
        ))
      }
      </Select>
    
        <FormLabel>Comments:</FormLabel>
        <textarea name='comments' value={comments} onChange={(e)=>setComments(e.target.value)} rows='4' cols='50'>
        </textarea>
      </FormControl>
   
      </Grid>
      <Button sx={{marginTop: 3, marginRight: 3}} type='submit' size="small" variant='contained'>Update Customer</Button>
    </form>
    </Box>
      {/* SHOW ERRROR MESSAGE FOR VALIDATIONS */}
      {
        errors.map((eachErr,i)=>(
          <p key={i} syle={{color: 'red'}}>{eachErr}</p>
        ))
      }
      </div>
  </div>
  )
}

export default CustomerDetails