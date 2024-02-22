import React, {useState, useEffect} from 'react'
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
import TableSortLabel from '@mui/material/TableSortLabel';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import TextField from '@mui/material/TextField';
import { useMediaQuery } from '@mui/material';
import Textarea from '@mui/joy/Textarea';



const AdminTable = (props) => {


  const isMobile = useMediaQuery('(max-width:600px)');
  

  //modal variables
  const [open, setOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [deleteId, setDeleteId] = useState('')
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [custId, setCustId] = useState('');

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [office, setOffice] = useState('')

  const [orderBy, setOrderBy] = useState('dos');
  const [order, setOrder] = useState('asc');


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
        alert('Customer deleted successfully!')
      })
      .catch(err=>console.log(err))
  }

  const handleNewCustomer = () => {
    navigate('/customer/new')
  }

  const handleRepList = () => {
    navigate('/all/reps')
  }

  const handlePayments = () => {
    navigate('/payments')
  }

  const handlePerformance = () => {
    navigate('/performance')
  }


    const filteredData = props.customers

    let newComment = ''
 

  

    const [filterRep, setFilterRep] = useState('');
    const [filterOffice, setFilterOffice] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
 


    const filteredList = filteredData 
    .filter((cust) => (!filterRep || (cust.user && `${cust.user.firstName} ${cust.user.lastName}`.toLowerCase().includes(filterRep.toLowerCase()))))
    .filter((cust) => (!filterOffice || cust.office === filterOffice))
    .filter((cust) => (!filterStatus || cust.status === filterStatus))
   
    .filter((cust) => {
      const searchKeys = ['firstName', 'lastName', 'office', 'user.firstName', 'user.lastName'];
      return searchKeys.some(
        (key) => cust[key]?.toLowerCase().includes(searchInput.toLowerCase()) || filterRep === searchInput
      );
    });


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

    
    const handleNewComment = (e) => {
      e.preventDefault()
     

      newComment = props.userRole + ': '+ commentText
     

      axios.post(process.env.REACT_APP_API_URL + `/api/${custId}/comment`, {newComment}, {withCredentials:true})
      .then(response=>{
        console.log(response.data)
        setOpen(false);
        props.onNewComment()
     
      })
      .catch(err=>console.log(err))
  }


  const handleChange = (event) => {
    
      setCommentText(event.target.value)

  }


//open modal
  const handleOpen = (id, word) => {
    axios.get(process.env.REACT_APP_API_URL+`/api/customer/${id}`, {withCredentials: true})
        .then(response=>{

        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setOffice(response.data.office)
        setComments(response.data.comments)
        setDeleteId(id)
        setCustId(id)
        
    
      })
      .catch(err=>{
        console.log(err.response)
      })

  if (word === 'comment') {
    console.log('comment abre')
    setOpenComment(true);
  }else{
    setOpen(true);
  }


  
};

const handleClose = () => {
  setOpen(false);
  setOpenComment(false);
};
  

  // Create an object to store total revenue per office
let officeRevenueMap = {};

// Iterate through customers and calculate total revenue per office
filteredList.forEach((eachCust) => {
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
    <h1>Quicklinks</h1>
    <Button sx={{marginRight: 2}} size="small" onClick={handlePayments} variant='outlined'>Verified Customers</Button>
    <Button size="small" onClick={handlePerformance} variant='outlined'>Sales Performance (by rep)</Button>

    


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
      <InputLabel>Filter by Status</InputLabel>
     <Select
    margin="dense"
    label="Filter by Status"
    size="small"
    placeholder='Status'
    onChange={(e) => setFilterStatus(e.target.value)}
    value={filterStatus}
    sx={{marginRight: 5, width: 200}}
    
>
          <MenuItem value="">All</MenuItem>
          <MenuItem value='Pending approval'>Pending Approval</MenuItem>
          <MenuItem value='Pending install'>Pending Install</MenuItem>
          <MenuItem value='Pending contract'>Pending contract</MenuItem>
          <MenuItem value='Signing'>Signing</MenuItem>
          <MenuItem value='In verification'>Verification</MenuItem>
          <MenuItem value='Verified'>Verified</MenuItem>
          <MenuItem value='Paid'>Paid</MenuItem>
          <MenuItem value='Cancelled'>Cancelled</MenuItem>
          <MenuItem value='Declined'>Declined</MenuItem>
      </Select>
      </Box>
    
   
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: 840 }} >
    <Table sx={{ minWidth: 650}} stickyHeader aria-label="sticky table" >
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
        <TableCell>Actions</TableCell>
        <TableCell>Comments</TableCell>
        <TableCell>Updated at</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>


    
      
      {
        filteredList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((eachCust, i) =>{
          return (
        
            <TableRow key={i}>
              <TableCell>{moment(eachCust.dos).format('MMM DD, YY')}</TableCell>
              <TableCell>{eachCust.status}</TableCell>
              <TableCell>{eachCust.office}</TableCell>
              <TableCell>{eachCust.user ? (<Typography style={{ color: eachCust.user.lastName ? 'black' : 'red' }}> {eachCust.user.firstName ? eachCust.user.firstName 
              : 'no user assigned'}{' '} {eachCust.user.lastName ? eachCust.user.lastName : ''}  </Typography> ) 
              : (<Typography style={{ color: 'red' }}>no user assigned</Typography> )}</TableCell>
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
              <TableCell><Button sx={{marginBottom: 1}} size="small" variant='contained' color="error" onClick={()=>handleOpen(eachCust._id)}>delete</Button><Button size="small" variant='contained' color="info" onClick={()=>handleOpen(eachCust._id, 'comment')}>Comments</Button></TableCell>
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
        count={filteredList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
   </TableContainer>
   </Paper>
      {/* Modal for deletion */}
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


      {/* Modal for comments */}
      <Box >
      <Dialog open={openComment} onClose={handleClose}  >
        <DialogTitle>Customer: {firstName} {lastName} - Office:{office} </DialogTitle>
        <DialogContent>

                 {
              
                  comments.map((comment, i) =>(

                    <DialogContentText key={i}><span style={{fontWeight: 'bold'}}>{moment(comment.timestamp).format('MMM DD, YY, hh:mm a')}</span>, {comment.text} </DialogContentText>
           

                  ))
                  
                }   
        
        </DialogContent>

        <Textarea sx={{minWidth: 400, margin: 2}} minRows={2} onChange={handleChange} placeholder="Add comment here.."/>
        
        <Box sx={{maxWidth: 200}}>
        <Button sx={{ margin: 2}} size='small' variant="outlined" onClick={handleNewComment}>
        Add Comment
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