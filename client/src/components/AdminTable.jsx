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
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material'
import TablePagination from '@mui/material/TablePagination';


import { TextField } from '@mui/material'
import VerificationTable from './VerificationTable'



const AdminTable = (props) => {


  const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState('');


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
 

  const handleDelete = (deleteId) => {
    axios.delete(process.env.REACT_APP_API_URL + `/api/customer/${deleteId}`, {withCredentials: true})
      .then(response=>{
        props.onDelete(deleteId)
      })
      .catch(err=>console.log(err))
  }

  const handleNewCustomer = () => {
    navigate('/customer/new')
  }

  const handleRepList = () => {
    navigate('/all/reps')
  }

   


 
   // Function to filter data by month

   const handleFilterByMonth = (customers) => {
    props.onFilterByMonth(customers)

   }
   

  //block of code to filter by name, lastname, email. status, office
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
     <h1>Sales Report</h1>
    
    <Box style={{justifyContent: "space-around", alignItems:'center', display: 'flex', margin: 5, gap: 5}}>
    
      <Button size="small" onClick={handleNewCustomer} variant='outlined'>Add New Customer</Button> 
      <Typography>Revenue: <span style={{color: "green"}}>{totalRev}</span></Typography>
 

      <Button size="small" onClick={()=>handleFilterByMonth(searchList)} variant='outlined'>This Month Sales</Button>
      <TextField margin='normal' type="text" label="Search" size='small' onChange={(e)=> setSearchInput(e.target.value)} value={searchInput} /> 
    </Box>
   

    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
     <TableHead>
      <TableRow>
        <TableCell>Date of Sale</TableCell>
        <TableCell>Office</TableCell>   
        <TableCell>Rep</TableCell>
        <TableCell>Customer name</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>Score</TableCell>
        <TableCell>Coap</TableCell>
        <TableCell>Coap Phone</TableCell>
        <TableCell>Address</TableCell>
        <TableCell>Approval</TableCell>
        <TableCell>Bank</TableCell>
        <TableCell>Payments / Interest</TableCell>
        <TableCell>DOI</TableCell> 
        <TableCell>Installer</TableCell>
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
              <TableCell>{moment(eachCust.dos).format('MMM DD, YY')}</TableCell>
              <TableCell>{eachCust.office}</TableCell>
              <TableCell>{eachCust.user.firstName} {eachCust.user.lastName}</TableCell>
              <TableCell><Link to={`customer/${eachCust._id}`}>{eachCust.firstName} {eachCust.lastName}</Link></TableCell>
              <TableCell>{eachCust.phone}</TableCell>
              <TableCell>${eachCust.price}</TableCell>
              <TableCell>{eachCust.score}</TableCell>
              <TableCell>{eachCust.coapFirstName} {eachCust.coapLastName}</TableCell>
              <TableCell>{eachCust.CoapPhone}</TableCell>
              <TableCell>{eachCust.address}</TableCell>
              <TableCell>{eachCust.approval}</TableCell>
              <TableCell>{eachCust.bank}</TableCell>
              <TableCell>{eachCust.paymentPlan}</TableCell>
              <TableCell>{moment(eachCust.doi).format('MMM DD, YY')}</TableCell>
              <TableCell>{eachCust.installer}</TableCell>   
              <TableCell>{eachCust.status}</TableCell>
              <TableCell><Button size="small" variant='contained' color="error" onClick={()=>handleDelete(eachCust._id)}>delete</Button></TableCell>
              <TableCell>{eachCust.comments.length !== 0 ? eachCust.comments[eachCust.comments.length -1].text : 'No comments'}</TableCell>
              <TableCell>{moment(eachCust.updatedAt).format('dddd LT MM/DD/YY')}</TableCell>
            </TableRow>
          )
        })
      } 
    </TableBody>
    </Table>
    <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={searchList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
   </TableContainer>

    {/* <Box sx={{margin: 2}}>
   <Button size="small" variant='outlined'>This Week</Button> <Button size="small" variant='outlined'>This Month</Button> <Button size="small" variant='outlined'>This Year</Button> <Button size="small" variant='outlined'>2021</Button>
   </Box> */}
   </div> 
  )
}

export default AdminTable