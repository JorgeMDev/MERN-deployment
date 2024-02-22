import React, {useState} from 'react'
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
import Textarea from '@mui/joy/Textarea';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TablePagination from '@mui/material/TablePagination';


const TestTable = (props) => {

  console.log(props.customers)


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [office, setOffice] = useState('');
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [custId, setCustId] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filterRep, setFilterRep] = useState('');
  const [filterOffice, setFilterOffice] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

    const navigate = useNavigate()

    let newComment = ''

    //Customers filtered by verification
    const verifList = props.customers.filter((eachCust)=>eachCust.status == 'In verification')

    // Apply additional filters
    const filteredList = verifList
    .filter((cust) => (!filterRep || (cust.user && `${cust.user.firstName} ${cust.user.lastName}`.toLowerCase().includes(filterRep.toLowerCase()))))
    .filter((cust) => (!filterOffice || cust.office === filterOffice))
   
    .filter((cust) => {
      const searchKeys = ['firstName', 'lastName', 'office', 'user.firstName', 'user.lastName'];
      return searchKeys.some(
        (key) => cust[key]?.toLowerCase().includes(searchInput.toLowerCase()) || filterRep === searchInput
      );
    });

    const [open, setOpen] = useState(false);

    const handleOpen = (id) => {


        axios.get(process.env.REACT_APP_API_URL+`/api/customer/${id}`, {withCredentials: true})
        .then(response=>{
        console.log(response.data)
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setOffice(response.data.office)
        setComments(response.data.comments)
        setCustId(id)
    
      })
      .catch(err=>{
        console.log(err.response)
      })

      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
   

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

  



  return (
    <div>
      <h1>Customers Verification Table</h1>
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
  
      
    
    
   
          
           
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 840 }} >
    <Table sx={{ minWidth: 650}} stickyHeader aria-label="sticky table">
     <TableHead>
      <TableRow>
        <TableCell sx={{minWidth: 70}}>Date of Sale</TableCell>
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
        <TableCell>Status</TableCell>
        <TableCell>Actions</TableCell>
        <TableCell>Latest Comment</TableCell>
        <TableCell>Updated at</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    
  
      {
        filteredList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((eachCust, i) =>{
          return (
            <TableRow key={i}>
              <TableCell>{moment(eachCust.dos).format('MMM DD, YY')}</TableCell>
              <TableCell>{eachCust.office}</TableCell>
              <TableCell>
  {eachCust.user ? (
    <Typography style={{ color: eachCust.user.lastName ? 'black' : 'red' }}>
      {eachCust.user.firstName ? eachCust.user.firstName : 'no user assigned'}{' '}
      {eachCust.user.lastName ? eachCust.user.lastName : ''}
    </Typography>
  ) : (
    <Typography style={{ color: 'red' }}>no user assigned</Typography>
  )}
              </TableCell>

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
              <TableCell>{eachCust.status}</TableCell>
              <TableCell><Button size="small" variant='contained' color="info" onClick={()=>handleOpen(eachCust._id)}>Add Comment</Button></TableCell>
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

  
      <Box >
      <Dialog open={open} onClose={handleClose}  >
        <DialogTitle>Customer: {firstName} {lastName} - Office:{office} </DialogTitle>
        <DialogContent>

                 {
              
                  comments.map((comment, i) =>(

                    <DialogContentText key={i}><Typography style={{fontWeight: 'bold'}}>{moment(comment.timestamp).format('MMM DD, YY, hh:mm a')}</Typography>, {comment.text} </DialogContentText>
           

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

export default TestTable