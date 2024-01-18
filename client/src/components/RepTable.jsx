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
  const [allUsers, setAllUsers] = useState([])

  //api call for all reps
  useEffect(()=>{
    axios.get(process.env.REACT_APP_API_URL+'/api/allUsers', {withCredentials: true})
        .then(response=>{
            console.log(response.data)
            setAllUsers(response.data) 
        })
        .catch(err=>navigate("/login"))
  },[])

  const handleNewRep = () => {
    navigate('/rep/new')
  }

  const handleBack = () => {
    navigate('/')
  }

  const handleDelete = (deleteId) => {
    axios.delete(process.env.REACT_APP_API_URL + `/api/user/${deleteId}`, {withCredentials: true})
      .then(response=>{
        alert('User deleted')
      })
      .catch(err=>console.log(err))
  }

  const handleEdit = (editId) => {
   
    navigate(`user/${editId}`)

  }



  return (
    <div>
       <NavBarMui/>
      <div>
      <h1>List of Users</h1>
      <div>
    <div>
    <Button size="small" variant='outlined'  onClick={handleNewRep}>Add New User</Button>   <Button size="small" variant='outlined' onClick={handleBack}>Back to Dashboard</Button> 
    </div>
    <TableContainer aria-label="simple table">
   <Table>
    <TableHead>
      <TableRow>
        <TableCell>User name</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Office</TableCell>
        <TableCell>Action</TableCell>
        <TableCell>Date created</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {
        allUsers.map((eachRep, i)=>{
          return (
            <TableRow key={i}>
              <TableCell><Link to={`user/${eachRep._id}`}>{eachRep.firstName} {eachRep.lastName}</Link></TableCell>
              <TableCell>{eachRep.phone}</TableCell>
              <TableCell>{eachRep.email}</TableCell>
              <TableCell>{eachRep.office}</TableCell>
              <TableCell><Button sx={{marginRight: 1}} size="small" variant='contained' onClick={()=>handleEdit(eachRep._id)}>Edit</Button><Button size="small" variant='contained' color="error" onClick={()=>handleDelete(eachRep._id)}>delete</Button></TableCell>
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