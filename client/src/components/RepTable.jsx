import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import moment from 'moment'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import NavBarMui from './NavBarMui'



const RepTable = () => {
  const navigate = useNavigate()
  const [allReps, setAllReps] = useState([])

  //api call for all reps
  useEffect(()=>{
    axios.get('https://crm-production.up.railway.app/api/reps', {withCredentials: true})
        .then(response=>{
            console.log(response.data)
            setAllReps(response.data) 
        })
        .catch(err=>navigate("/login"))
  },[])

  const handleNewRep = () => {
    navigate('https://crm-production.up.railway.app/rep/new')
  }

  const handleBack = () => {
    navigate('/')
  }



  return (
    <div>
       <NavBarMui/>
      <div>
      <h1>List of Sales Representatives</h1>
      <div>
    <div>
    <Button size="small" variant='outlined'  onClick={handleNewRep}>Add New Rep</Button>   <Button size="small" variant='outlined' onClick={handleBack}>Back to Dashboard</Button> 
    </div>
    <TableContainer aria-label="simple table">
   <Table>
    <TableHead>
      <TableRow>
        <TableCell>Rep name</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Office</TableCell>
        <TableCell>Total customers</TableCell>
        <TableCell>Date created</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {
        allReps.map((eachRep, i)=>{
          return (
            <TableRow key={i}>
              <TableCell><Link to={`rep/${eachRep._id}`}>{eachRep.firstName} {eachRep.lastName}</Link></TableCell>
              <TableCell>{eachRep.phone}</TableCell>
              <TableCell>{eachRep.email}</TableCell>
              <TableCell>{eachRep.office}</TableCell>
              <TableCell>{eachRep.totalCustomers.length}</TableCell>
              <TableCell>{moment(eachRep.createdAt).format('dddd LT MM/DD/YY')}</TableCell>
            </TableRow>
          )
        })
      }
    </TableBody>
   </Table>
   </TableContainer>
   </div>

   </div> 
    </div>
  )
}

export default RepTable