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
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';



const CustomerDetails = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [office, setOffice] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState()

  const [doi, setDoi] = useState()
  const [price, setPrice] = useState()
  const [bank, setBank] = useState()
  const [approval, setApproval] = useState()
  const [status, setStatus] = useState('')
  const [comments, setComments] = useState([])
  const [userId, SetUserId] = useState('')
  const [allUsers, setAllUsers] = useState([])
  const {id} = useParams()

  const [creditScore, setCreditScore] = useState('')
  const [dos, setDos] = useState('')
  const [installer, setInstaller] = useState('')
  const [paymentPlan, setPaymentPlan] = useState('')

  const [coapFirstName, setCoapFirstName] = useState('')
  const [coapLastName, setCoapLastName] = useState('')
  const [coapEmail, setCoapEmail] = useState('')
  const [coapCreditScore, setCoapCreditScore] = useState('')
  const [coapPhone, setCoapPhone] = useState(0)

  //variable to hanlde errors on validation
  const [errors, setErrors] = useState([])
  //get all the customer info to populate forms
  useEffect(()=>{
    axios.get(process.env.REACT_APP_API_URL + `/api/customer/${id}`, {withCredentials: true})
      .then(response=>{
       
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
        setOffice(response.data.office)
        setAddress(response.data.address)
        setPhone(response.data.phone)
        setCreditScore(response.data.creditScore)
        setDos(moment(response.data.dob).format("YYYY-MM-DD"))
        setDoi(moment(response.data.doi).format('YYYY-MM-DD'))
        setPrice(response.data.price)
        setBank(response.data.bank)
        setApproval(response.data.approval)
        setStatus(response.data.status)
        setComments(response.data.comments)
        setCoapFirstName(response.data.coapFirstName)
        setCoapLastName(response.data.coapLastName)
        setCoapPhone(response.data.coapPhone)
        setCoapCreditScore(response.data.coapCreditScore)
        setCoapEmail(response.data.coapEmail)
        setInstaller(response.data.installer)
        setPaymentPlan(response.data.paymentPlan)
        SetUserId(response.data.user)



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

      axios.get(process.env.REACT_APP_API_URL+'/api/allUsers', {withCredentials: true})
      .then(response=>{
          console.log(response.data)
          setAllUsers(response.data) 
      })
      .catch(err=>navigate("/login"))

  },[])
 
  //call a put method to update customer
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put(process.env.REACT_APP_API_URL+`/api/customer/${id}`, {firstName, lastName, email, office, address, phone, dos, doi, price, bank,approval, status, comments, coapPhone,coapCreditScore,coapEmail,coapFirstName, coapLastName, creditScore,installer, paymentPlan, user : userId}, {withCredentials: true})
      .then(response=>{
        console.log(response.data)
        alert('Update Succesful')
        navigate('/')
      })
      .catch(err=>console.log(err))
  }
  


  const handleHome = () => {
    navigate('/')
  }


  return (
    <Box sx={{minHeight: '1000px'}}>
       <NavBarMui/>
        <Box>
      {/* UPDATE FORM FOR EXISTING CUSTOMER */}
    <h1>Update a Customer</h1>
    <Button size="small" variant='outlined' onClick={handleHome}>back to Dashboard</Button>
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
    <form onSubmit={(e)=>handleSubmit(e)}>
    <Box sx={{ display: 'flex' , justifyContent: 'space-around', alignItems: 'center', margin: "1%", boxShadow: 1, borderRadius: 2, padding: 3}}>

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
     <Box sx={{padding: 1}}>
        <FormLabel>Date of installation:</FormLabel>
        <Input type='date' name='doi' value={doi}  onChange={(e)=>setDoi(e.target.value)}/>
        </Box>
     </Box>
     <Box>
     
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
      <Select sx={{height:30}} type='text' value={userId} onChange={(e)=>SetUserId(e.target.value)}>
      {
        allUsers.map((eachUser,i)=>(
            <MenuItem key={i} value={eachUser._id}>{eachUser.firstName}  {eachUser.lastName}</MenuItem>
        ))
      }
      </Select>
     
     </Box>
     
   
    </Box >
    
    <Button type='submit' size="small" variant='contained'>Update Customer</Button>
    </form>
    </Box>
      {/* SHOW ERRROR MESSAGE FOR VALIDATIONS */}
      {
        errors.map((eachErr,i)=>(
          <p key={i} syle={{color: 'red'}}>{eachErr}</p>
        ))
      }
      </Box>
  </Box>
  )
}

export default CustomerDetails