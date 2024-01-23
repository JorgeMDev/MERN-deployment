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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Textarea from '@mui/joy/Textarea';


import { TextField } from '@mui/material'



const AdminTable = (props) => {

  //modal variables
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [office, setOffice] = useState('')


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
        setOpen(false);
        alert('Succseful delete')
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

  //  const handleFilterByMonth = (customers) => {
  //   props.onFilterByMonth(customers)

  //  }
   
   //filter logic
  
    const [filters, setFilters] = useState({ rep: '', status: '', office: '' });
    const [filteredData, setFilteredData] = useState(props.customers);

  
  
    const handleFilterChange = (key, value) => {
      setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    };
  
    const applyFilters = () => {
      const filtered = searchList.filter((item) => {
        return Object.keys(filters).every((key) => {
          const filterValue = filters[key].toLowerCase();

          return (
            (key === 'rep' &&
              item.user &&
              (String(item.user.firstName).toLowerCase().includes(filterValue) ||
                String(item.user.lastName).toLowerCase().includes(filterValue))) ||
            (key === 'office' && String(item[key]).toLowerCase().includes(filterValue)) ||
            (key !== 'rep' && key !== 'office' && String(item[key]).toLowerCase().includes(filterValue))
          );
        });
      });
      setFilteredData(filtered);
    };

 
    

  //SEARCH FUNCTION block of code to filter by name, lastname, email. status, office
  const keys = ['firstName', 'lastName','email', 'status','office'];

  const search = (customersData) => {
    
    return customersData.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchInput.toLocaleLowerCase())))
  }
  const searchList = search(props.customers)


//open modal
  const handleOpen = (id) => {
    axios.get(process.env.REACT_APP_API_URL+`/api/customer/${id}`, {withCredentials: true})
        .then(response=>{

        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setOffice(response.data.office)
        setDeleteId(id)
    
      })
      .catch(err=>{
        console.log(err.response)
      })

  

  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
  

  // Create an object to store total revenue per office
let officeRevenueMap = {};

// Iterate through customers and calculate total revenue per office
filteredData.forEach((eachCust) => {
  const office = eachCust.office;
  const revenue = eachCust.price;

  // Initialize total revenue for the office if not present
  if (!officeRevenueMap[office]) {
    officeRevenueMap[office] = 0;
  }

  // Update total revenue for the office
  officeRevenueMap[office] += revenue;
});

// Now, officeRevenueMap contains the total revenue for each office



  return (
   <div>
     <h1 style={{textAlign: 'center'}}>Sales Report</h1>
    
    <Box style={{justifyContent: "space-around", alignItems:'center', display: 'flex', margin: 5, gap: 5}}>
    
      <Button size="small" onClick={handleNewCustomer} variant='outlined'>Add New Customer</Button> 
  

      <Box sx={{marginBottom: 3}}>
      {/* Render a table or any other UI component to display office revenues */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Office</TableCell>
            <TableCell>Total Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(officeRevenueMap).map(([office, revenue]) => (
            <TableRow key={office}>
              <TableCell>{office}</TableCell>
              <TableCell>${revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
 
{/* 
      <Button size="small" onClick={()=>handleFilterByMonth(filteredData)} variant='outlined'>This Month Sales</Button> */}
      {/* <TextField margin='normal' type="text" label="Search" placeholder='name, office , status' size='small' onChange={(e)=> setSearchInput(e.target.value)} value={searchInput} />  */}
    
     
    </Box>
    <TextField
        label="Rep"
        value={filters.rep}
        onChange={(e) => handleFilterChange('rep', e.target.value)}
        sx={{marginRight: 2}}
      />
      <TextField
        label="Status"
        value={filters.status}
        onChange={(e) => handleFilterChange('status', e.target.value)}
        sx={{marginRight: 2}}
      />
      <TextField
        label="Office"
        value={filters.office}
        onChange={(e) => handleFilterChange('office', e.target.value)}
        sx={{marginRight: 2, maxWidth: 100}}
      />
      <Button onClick={applyFilters}>Apply Filters</Button>
   
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: 840 }} >
    <Table sx={{ minWidth: 650}} stickyHeader aria-label="sticky table" >
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
        filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((eachCust, i) =>{
          return (
        
            <TableRow key={i}>
              <TableCell>{moment(eachCust.dos).format('MMM DD, YY')}</TableCell>
              <TableCell>{eachCust.office}</TableCell>
              <TableCell> <span style={{ color: eachCust.user ? 'black' : 'red' }}>{eachCust.user ? eachCust.user.firstName ? eachCust.user.firstName : 'no usar assigend' : 'no user assigned'} {eachCust.user && eachCust.user.lastName ? eachCust.user.lastName : ''}</span></TableCell>
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
              <TableCell>{eachCust.doi ? moment(eachCust.doi).format('MMM DD, YY') : 'Pending'}</TableCell>
              <TableCell>{eachCust.installer}</TableCell>   
              <TableCell>{eachCust.status}</TableCell>
              <TableCell><Button size="small" variant='contained' color="error" onClick={()=>handleOpen(eachCust._id)}>delete</Button></TableCell>
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
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
   </TableContainer>
   </Paper>

   <Box >
      <Dialog open={open} onClose={handleClose}  >
        <DialogTitle>Customer: {firstName} {lastName} - Office:{office} </DialogTitle>
        <DialogContent>

                    <DialogContentText>Are you sure you want to delete this customer? </DialogContentText>
           
        </DialogContent>
        
        <Box sx={{maxWidth: 200}}>
        <Button sx={{ margin: 2}} size='small' variant="outlined" onClick={()=>handleDelete(deleteId)}>
        Yes
        </Button>
        <Button sx={{ margin: 2}} size='small' variant="outlined" onClick={()=>handleClose()}>
        No
        </Button>
        </Box>




        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
   </div> 
  )
}

export default AdminTable