import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FormLabel } from '@mui/material'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import NavBarMui from './NavBarMui'
import InputLabel from '@mui/material/InputLabel';

const CreateCustomer = () => {
    //Delcaring all states needed in the form
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [office, setOffice] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState(0)
  const [dos, setDos] = useState('')
  const [doi, setDoi] = useState('')
  const [price, setPrice] = useState(0)
  const [bank, setBank] = useState('')
  const [approval, setApproval] = useState(0)
  const [status, setStatus] = useState('')
  const [comments, setComments] = useState('')
  const [allReps, setAllReps] = useState([])
  const [repId, SetRepId] = useState('')

  const [creditScore, setCreditScore] = useState('')
  const [installer, setInstaller] = useState('')

  const [coapFirstName, setCoapFirstName] = useState('')
  const [coapLastName, setCoapLastName] = useState('')
  const [coapEmail, setCoapEmail] = useState('')
  const [coapCreditScore, setCoapCreditScore] = useState('')
  const [coapPhone, setCoapPhone] = useState(0)

  const [paymentPlan, setPaymentPlan] = useState('')


  //variable to hanlde errors on validation
  const [errors, setErrors] = useState([])

  //I need to have all the sales reps to  assign the customer
  useEffect(()=>{
    axios.get(process.env.REACT_APP_API_URL + '/api/reps', {withCredentials: true})
        .then(response=>{
            console.log(response.data)
            setAllReps(response.data) 
        })
        .catch(err=>console.log(err))
  },[])



  //After submit, call e POST method to save info in database
  const handleSubmit = (e, repId) => {
    e.preventDefault()
    
    axios.post(process.env.REACT_APP_API_URL + `/api/customer/${repId}`, {firstName, lastName, email, office, address, phone, dos, doi, price, bank,approval, status, comments, coapPhone,coapCreditScore,coapEmail,coapFirstName, coapLastName, creditScore,installer, paymentPlan}, {withCredentials: true})
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


  const handleHome = () => {
    navigate('/')
  }


  return (
    <div>
            <NavBarMui/> 
      <div>
    <h1>Add a New Customer</h1>
    <Button sx={{marginLeft:1}} size="small" variant='outlined' onClick={handleHome}>Back to Dashboard</Button>
    {/* REGISTRATION FORM FOR NEW REP */}
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
    <form onSubmit={(e)=>handleSubmit(e,repId)}>
    <Box sx={{ display: 'flex' , justifyContent: 'space-around', alignItems: 'center', margin: "10%", boxShadow: 1, borderRadius: 2, padding: 3}}>
      <Box>
        <Box sx={{padding: 1}}>
      <FormLabel>First name:</FormLabel>
      <Input type='text' name='firstName' value={firstName}  onChange={(e)=>setFirstName(e.target.value)}/>
      </Box> 
      <Box sx={{padding: 1}}>
     <FormLabel>Last name:</FormLabel>
     <Input type='text' name='lastName' value={lastName}  onChange={(e)=>setLastName(e.target.value)}/>
     </Box> 
      <Box sx={{padding: 1}}>
     <FormLabel>Phone number:</FormLabel>
     <Input type='number' name='phone' value={phone}  onChange={(e)=>setPhone(e.target.value)}/>
     </Box>
     <Box sx={{padding: 1}}> 
     <FormLabel >Email:</FormLabel>
     <Input type='text' name='email' value={email}  onChange={(e)=>setEmail(e.target.value)}/>
     </Box> 
     <Box sx={{padding: 1}}>
     <FormLabel>Address:</FormLabel>
     <Input type='text' name='address' value={address}  onChange={(e)=>setAddress(e.target.value)}/>
     </Box>
     <Box sx={{padding: 1}}>
     <FormLabel>Credit Score:</FormLabel>
     <Input type='number' name='creditScore' value={creditScore}  onChange={(e)=>setCreditScore(e.target.value)}/>
     </Box>
     <Box sx={{padding: 1}}>
     <FormLabel>Date of Sale:</FormLabel>
     <Input type='date' name='dob' value={dos}  onChange={(e)=>setDos(e.target.value)}/>
     </Box>   
     </Box>
     <Box>
      <Box sx={{padding: 1}}>
        <FormLabel>Date of installation:</FormLabel>
        <Input type='date' name='doi' value={doi}  onChange={(e)=>setDoi(e.target.value)}/>
        </Box>
        <Box sx={{padding: 1}}>
      <FormLabel>Installer:</FormLabel>
      <Box><Input type='text' name='firstName' value={installer}  onChange={(e)=>setInstaller(e.target.value)}/></Box>
      </Box> 
        <Box sx={{padding: 1}}>
        <FormLabel >Office:</FormLabel>
        <Box><Select sx={{height:30, width: 100}} label="Choose Office:"  value={office} onChange={(e)=>setOffice(e.target.value)}>
          <MenuItem value='VA'>Virginia</MenuItem>
          <MenuItem value='MD'>Maryland</MenuItem>
        </Select></Box>
        </Box> 
        <Box sx={{padding: 1}}>
     
        <FormLabel>Price:</FormLabel>
        <Box><Input type='number' name='price' value={price}  onChange={(e)=>setPrice(e.target.value)}/></Box>
        </Box>
        <Box sx={{padding: 1}}>
        <FormLabel>Bank:</FormLabel>
        <Box><Input type='text' name='bank' value={bank}  onChange={(e)=>setBank(e.target.value)}/></Box>
        </Box>
        <Box sx={{padding: 1}}>
     <FormLabel>Payments / Interest:</FormLabel>
     <Input type='string' name='creditScore' value={paymentPlan}  onChange={(e)=>setPaymentPlan(e.target.value)}/>
     </Box>
        <Box sx={{padding: 1}}>
        <FormLabel>Approval:</FormLabel>
        <Box><Input type='number' name='approval' value={approval}  onChange={(e)=>setApproval(e.target.value)}/></Box>
        </Box>
        <Box sx={{padding: 1}}>
        <InputLabel>Status:</InputLabel>
        <Select sx={{height:30, width: 100}} type='text' name='status' label="Status" value={status} onChange={(e)=>setStatus(e.target.value)}>
          <MenuItem value='Pending approval'>Pending Approval</MenuItem>
          <MenuItem value='Pending install'>Pending Install</MenuItem>
          <MenuItem value='Pending contract'>Pending contract</MenuItem>
          <MenuItem value='Singing'>Singning</MenuItem>
          <MenuItem value='In verification'>In Verification</MenuItem>
          <MenuItem value='Verified'>Verified</MenuItem>
          <MenuItem value='Paid'>Paid</MenuItem>
          <MenuItem value='Cancelled'>Cancelled</MenuItem>
        </Select>
        </Box>
          <Box sx={{padding: 1}}>
    
   
      </Box>
    
      
        </Box>
        <Box >
        <Box sx={{padding: 1}}>
      <FormLabel>Coap First name:</FormLabel>
      <Input type='text' name='firstName' value={coapFirstName}  onChange={(e)=>setCoapFirstName(e.target.value)}/>
      </Box> 
      <Box sx={{padding: 1}}>
     <FormLabel>Coap Last name:</FormLabel>
     <Input type='text' name='lastName' value={coapLastName}  onChange={(e)=>setCoapLastName(e.target.value)}/>
     </Box> 
      <Box sx={{padding: 1}}>
     <FormLabel>Coap Phone number:</FormLabel>
     <Input type='number' name='phone' value={coapPhone}  onChange={(e)=>setCoapPhone(e.target.value)}/>
     </Box>
     <Box sx={{padding: 1}}> 
     <FormLabel >Coap Email:</FormLabel>
     <Input type='text' name='email' value={coapEmail}  onChange={(e)=>setCoapEmail(e.target.value)}/>
     </Box> 
     <Box sx={{padding: 1}}>
     <FormLabel>Coap Credit Score:</FormLabel>
     <Input type='number' name='creditScore' value={coapCreditScore}  onChange={(e)=>setCoapCreditScore(e.target.value)}/>
     </Box>
     <FormLabel>Representative:</FormLabel>
      <Select sx={{height:30}} type='text' value={repId} onChange={(e)=>SetRepId(e.target.value)}>
      {
        allReps.map((eachRep,i)=>(
            <MenuItem key={i} value={eachRep._id}>{eachRep.firstName}  {eachRep.lastName}</MenuItem>
        ))
      }
      </Select>
     
     </Box>
   
    </Box >
    
    <Box sx={{marginBottom: 1}}>
    <FormLabel>Comments:</FormLabel>
        <TextField name='comments' value={comments} onChange={(e)=>setComments(e.target.value)} rows='4' cols='50'>
        </TextField>
    </Box>
    
      <Box textAlign='center'>
      <Button type="submit" size="small" variant='contained' sx={{marginBottom: 1}}>Add Customer</Button>
      </Box>
    </form>
      </Box>
          {/* SHOW ERRROR MESSAGE FOR VALIDATIONS */}
          {
        errors.map((eachErr,i)=>(
       
          <p key={i} style={{color: "red"}}>{eachErr}</p>
          
        ))
      }
      </div>
  </div>
  )
}

export default CreateCustomer