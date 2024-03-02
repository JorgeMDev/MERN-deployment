import NavBarMui from './NavBarMui'
import React, {useEffect, useState} from 'react'
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useMediaQuery } from '@mui/material'
import TableSortLabel from '@mui/material/TableSortLabel'

const PaymentsTable = () => {
     //modal variables
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState('')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [office, setOffice] = useState('')

  const [userRole, setUserRole] = useState('')
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')
  const [userId, setUserId] = useState('')

  const [customers, setCustomers] = useState([])

  const navigate = useNavigate()
  const isMobile = useMediaQuery('(max-width:600px)');
  


  //open modal
  const handleOpen = (id) => {
    axios.get(process.env.REACT_APP_API_URL+`/api/customer/${id}`, {withCredentials: true})
        .then(response=>{
        console.log(response.data)
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setOffice(response.data.office)
        setUpdateId(id)
    
      })
      .catch(err=>{
        console.log(err.response)
      })
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

//update customer
const handleUpdate = (updateId) => {
    axios.put(process.env.REACT_APP_API_URL + `/api/customer/${updateId}`, {status : 'Paid'}, { withCredentials: true })
      .then(response => {
        console.log(response.data);
         // Update the state to reflect the changes
         const updatedCustomers = customers.map(customer => {
            if (customer._id === updateId) {
                return { ...customer, status: 'Paid' };
            }
            return customer;
        });
        setCustomers(updatedCustomers);
        handleClose();
        alert('Update Successful');
        navigate('/payments')
       
      })
      .catch(err => console.log(err));
  }
// Get all customers in 'verified' status
useEffect(() => {
axios.get(process.env.REACT_APP_API_URL + '/api/customers/all', { withCredentials: true })
    .then(response => {
        console.log(response.data);
        setCustomers(response.data);
    })
    .catch(err => console.log(err));

    axios.get(process.env.REACT_APP_API_URL+'/api/getUser', {withCredentials: true})
      .then(response=>{
       

        setUserId(response.data._id)
     
        setUserFirstName(response.data.firstName)
        setUserLastName(response.data.lastName)
       
        setUserRole(response.data.role)

        if (response.data.role !== 'admin') {
          alert('You are not authorized to view this page')
          navigate('/login')
        }
      })
      .catch(err=>console.log(err))

    

}, []);

//Filtering logic
    const [filterRep, setFilterRep] = useState('');
    const [filterOffice, setFilterOffice] = useState('');


    const [searchInput, setSearchInput] = useState('');

 
    const filteredData = customers.filter((cust) => cust.status === 'Verified');

    const filteredList = filteredData 
    .filter((cust) => (!filterRep || (cust.user && `${cust.user.firstName} ${cust.user.lastName}`.toLowerCase().includes(filterRep.toLowerCase()))))
    .filter((cust) => (!filterOffice || cust.office === filterOffice))
    
   
    .filter((cust) => {
      const searchKeys = ['firstName', 'lastName', 'office', 'user.firstName', 'user.lastName'];
      return searchKeys.some(
        (key) => cust[key]?.toLowerCase().includes(searchInput.toLowerCase()) || filterRep === searchInput
      );
    });

    //Sorting date of sale

    const [orderBy, setOrderBy] = useState('dos');
    const [order, setOrder] = useState('asc');

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };
    
      const sortByDate = (a, b) => {
        const dateA = new Date(a.dos);
        const dateB = new Date(b.dos);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
      };
  
      const sortedData = filteredList.sort(sortByDate);
  
     
    



 

    //Customers filtered by verification
   const customerList = customers.filter((eachCust)=>eachCust.status == 'Verified')

    const handleStatus = (id) => {
        alert('Paid!')

    }

  return (
    <div>
        <NavBarMui/>
        <h1>Verified Customers</h1>

        <Box style={{justifyContent: "space-around", alignItems:'center', display: 'flex', margin: 5, gap: 5, flexDirection: isMobile ? 'column' : 'row'}}>
    <InputLabel>Filter by Office</InputLabel>
     <Select
    margin="dense"
    label="Filter by Office"
    size="small"
    placeholder='Office'
    onChange={(e) => setFilterOffice(e.target.value)}
    value={filterOffice}
    sx={{marginRight: 5, width: 100}}
>
    <MenuItem value="">All</MenuItem>
    <MenuItem value="MD">MD</MenuItem>
    <MenuItem value="VA">VA</MenuItem>
      </Select>

      <TextField
        margin="dense"
        type="text"
        label="Search Customer"
        placeholder="Customer Name"
        size="small"
        onChange={(e) => setSearchInput(e.target.value)}
        value={searchInput}
        sx={{margin: 1}}
      />
      <TextField
        margin="dense"
        type="text"
        label="Filter by Rep"
        placeholder="Rep Name"
        size="small"
        onChange={(e) => setFilterRep(e.target.value)}
        value={filterRep}
        sx={{margin: 1}}
      />
      </Box>
 

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 840 }} >
    <Table sx={{ minWidth: 650}} stickyHeader aria-label="sticky table">
     <TableHead>
      <TableRow>
      <TableCell>
      <TableSortLabel
            sx={{ padding: 3, borderBottom: '1px solid gray', minHeight: 81 }}
                active={orderBy === 'dos'}
                direction={order}
                onClick={() => handleRequestSort('dos')}
              >
                DOS
        </TableSortLabel>
        </TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Office</TableCell>   
        <TableCell>Rep</TableCell>
        <TableCell>Customer name</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>Bank</TableCell>
        {/* <TableCell>Price</TableCell>
        <TableCell>Coap</TableCell>
        <TableCell>Coap Phone</TableCell>
        <TableCell>Address</TableCell>
        <TableCell>Approval</TableCell>
        <TableCell>Bank</TableCell>
        <TableCell>Payments / Interest</TableCell>
        <TableCell>DOI</TableCell> 
        <TableCell>Installer</TableCell> */} 
        <TableCell>Actions</TableCell>
        <TableCell>Latest Comment</TableCell>
        <TableCell>Updated at</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    
      
      {
        filteredList.map((eachCust, i)=>{
          return (
            <TableRow key={i}>
              <TableCell>{moment(eachCust.dos).format('MMM DD, YY')}</TableCell>
              <TableCell>{eachCust.status}</TableCell>
              <TableCell>{eachCust.office}</TableCell>
              <TableCell>  <span style={{ color: eachCust.user ? 'black' : 'red' }}>{eachCust.user ? eachCust.user.firstName ? eachCust.user.firstName : 'no user assigend' : 'no user assigned'} {eachCust.user && eachCust.user.lastName ? eachCust.user.lastName : ''}</span></TableCell>
              <TableCell>{eachCust.firstName} {eachCust.lastName}</TableCell>
              <TableCell>{eachCust.phone}</TableCell>
              <TableCell>{eachCust.bank}</TableCell>
              {/* <TableCell>${eachCust.price}</TableCell>
              <TableCell>{eachCust.coapFirstName} {eachCust.coapLastName}</TableCell>
              <TableCell>{eachCust.CoapPhone}</TableCell>
              <TableCell>{eachCust.address}</TableCell>
              <TableCell>{eachCust.approval}</TableCell>
              <TableCell>{eachCust.bank}</TableCell>
              <TableCell>{eachCust.paymentPlan}</TableCell>
              <TableCell>{moment(eachCust.doi).format('MMM DD, YY')}</TableCell>
              <TableCell>{eachCust.installer}</TableCell>    */}
              <TableCell><Button size="small" variant='contained' color="info" onClick={()=>handleOpen(eachCust._id)}>Mark as Paid</Button></TableCell>
              <TableCell>{eachCust.comments.length !== 0 ? eachCust.comments[eachCust.comments.length -1].text : 'No comments'}</TableCell>
              <TableCell>{moment(eachCust.updatedAt).format('dddd LT MM/DD/YY')}</TableCell>
            </TableRow>
          )
        })
      } 
    </TableBody>
    </Table>
   </TableContainer>
   </Paper>

   <Box >
      <Dialog open={open} onClose={handleClose}  >
        <DialogTitle>Customer: {firstName} {lastName} - Office:{office} </DialogTitle>
        <DialogContent>

                    <DialogContentText>Do you want to mark this customer as 'Paid'? </DialogContentText>
           
        </DialogContent>
        
        <Box sx={{maxWidth: 200}}>
        <Button sx={{ margin: 2}} size='small' variant="outlined" onClick={()=>handleUpdate(updateId)}>
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

export default PaymentsTable