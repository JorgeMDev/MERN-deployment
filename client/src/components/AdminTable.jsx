import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { darkScrollbar, TextField } from '@mui/material'
import Card from '@mui/material/Card';


const AdminTable = (props) => {


  const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState('');

  const handleDelete = (deleteId) => {
    axios.delete(`http://localhost:8000/api/customer/${deleteId}`, {withCredentials: true})
      .then(response=>{
        props.onDelete(deleteId)
      })
      .catch(err=>console.log(err))
  }

  const handleNewCustomer = () => {
    navigate('/customer/new')
  }

  const handleNewRep = () => {
    navigate('/rep/new')
  }

  const handleRepList = () => {
    navigate('/all/reps')
  }

  const keys = ['firstName', 'lastName','email', 'status','office'];

  const search = (customersData) => {
    
    return customersData.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchInput.toLocaleLowerCase())))
  }
  
  const searchList = search(props.customers)

  let totalRevenue = 0
  props.customers.map((eachCust, i)=> totalRevenue+= eachCust.price)
  let totalRev = totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

  return (
   <div>
      <h1>Admin Dashboard</h1>
      <div>

      </div>
    <div style={{padding: 5}}>
      <Button size="small" onClick={handleNewCustomer} variant='outlined'>Add New Customer</Button> <Button size="small" variant='outlined' onClick={handleNewRep}>Add New Rep</Button>  <Button  size="small" variant='outlined' onClick={handleRepList}>List of Reps</Button>
    </div>
    <div style={{display:"flex", justifyContent: "space-around",padding: 5}}>
      <TextField margin='normal' type="text" label="Search" onChange={(e)=> setSearchInput(e.target.value)} value={searchInput} /> 
      <h2 style={{marginTop: 30}}>Revenue: <span style={{color: "green"}}>{totalRev}</span></h2>
    </div>

    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
     <TableHead>
      <TableRow>
        <TableCell>Customer name</TableCell>
        <TableCell>Address</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>DOI</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>Bank</TableCell>
        <TableCell>Approval</TableCell>
        <TableCell>Office</TableCell>
        <TableCell>Rep</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Actions</TableCell>
        <TableCell>Comments</TableCell>
        <TableCell>Updated at</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    
      
      {
        searchList.map((eachCust, i)=>{
          return (
            <TableRow key={i}>
              <TableCell><Link to={`customer/${eachCust._id}`}>{eachCust.firstName} {eachCust.lastName}</Link></TableCell>
              <TableCell>{eachCust.address}</TableCell>
              <TableCell>{eachCust.phone}</TableCell>
              <TableCell>{moment(eachCust.doi).format('MMM DD, YY')}</TableCell>
              <TableCell>${eachCust.price}</TableCell>
              <TableCell>{eachCust.bank}</TableCell>
              <TableCell>{eachCust.approval}</TableCell>
              <TableCell>{eachCust.office}</TableCell>
              <TableCell>{eachCust.rep.firstName} {eachCust.rep.lastName}</TableCell>
              <TableCell>{eachCust.status}</TableCell>
              <TableCell><Button size="small" variant='contained' color="error" onClick={()=>handleDelete(eachCust._id)}>delete</Button></TableCell>
              <TableCell>{eachCust.comments}</TableCell>
              <TableCell>{moment(eachCust.updatedAt).format('dddd LT MM/DD/YY')}</TableCell>
            </TableRow>
          )
        })
      } 
    </TableBody>
    </Table>
   </TableContainer>
    {/* <Box sx={{margin: 2}}>
   <Button size="small" variant='outlined'>This Week</Button> <Button size="small" variant='outlined'>This Month</Button> <Button size="small" variant='outlined'>This Year</Button> <Button size="small" variant='outlined'>2021</Button>
   </Box> */}
   </div> 
  )
}

export default AdminTable