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
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';  
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';


const RepTable = () => {
  const navigate = useNavigate()
  const [allUsers, setAllUsers] = useState([])

    //modal variables
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState('')


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [office, setOffice] = useState('')

  const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    //open modal
  const handleOpen = (id) => {
    axios.get(process.env.REACT_APP_API_URL+`/api/user/${id}`, {withCredentials: true})
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
  


  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

  //api call for all reps
  useEffect(()=>{
    axios.get(process.env.REACT_APP_API_URL+'/api/allUsers', {withCredentials: true})
        .then(response=>{
            console.log(response.data)
            setAllUsers(response.data) 
            setFilteredUsers(response.data);
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

  const handleSearchInputChange = (e) => {
    const input = e.target.value;
    setSearchInput(input);

    if (input.trim() === '') {
      // If the search input is empty, show the entire table
      setFilteredUsers(allUsers);
    } else {
      // Filter users based on search input
      const filtered = allUsers.filter(
        (user) =>
          user.firstName.toLowerCase().includes(input.toLowerCase()) ||
          user.lastName.toLowerCase().includes(input.toLowerCase()) ||
          String(user.phone).toLowerCase().includes(input.toLowerCase()) ||
          user.email.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredUsers(filtered);
    }

    setPage(0); // Reset page when the search changes
  };



  return (
    <div>
       <NavBarMui/>
      <div>
      <h1>List of Users</h1>
      <div>
    <div  >
    <Button sx={{marginLeft: 3}} size="small" variant='outlined'  onClick={handleNewRep}>Add New User</Button>   <Button size="small" variant='outlined' onClick={handleBack}>Back to Dashboard</Button> 
 
    </div>
    <TextField
            sx={{marginLeft: 3}}
            label="Search"
            variant="outlined"
            margin="normal"
            size="small"
            onChange={handleSearchInputChange}
            value={searchInput}
          />
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer  sx={{ maxHeight: 840, margin: 5 }}>
   <Table sx={{ minWidth: 650}} stickyHeader aria-label="sticky table">
    <TableHead>
      <TableRow>
        <TableCell>User name</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Office</TableCell>
        <TableCell>DOB</TableCell>
        <TableCell>Action</TableCell>
        <TableCell>Date created</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {
        filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((eachRep, i) =>{
          return (
            <TableRow key={i}>
              <TableCell><Link to={`user/${eachRep._id}`}>{eachRep.firstName} {eachRep.lastName}</Link></TableCell>
              <TableCell>{String(eachRep.phone).toLowerCase()}</TableCell>
              <TableCell>{eachRep.email}</TableCell>
              <TableCell>{eachRep.office}</TableCell>
              <TableCell>{moment(eachRep.dob).format('MM/DD/YYYY')}</TableCell>
              <TableCell><Button sx={{marginRight: 1}} size="small" variant='contained' onClick={()=>handleEdit(eachRep._id)}>Edit</Button><Button size="small" variant='contained' color="error" onClick={()=>handleOpen(eachRep._id)}>delete</Button></TableCell>
              <TableCell>{moment(eachRep.createdAt).format('dddd LT MM/DD/YY')}</TableCell>
            </TableRow>
          )
        })
      }
    </TableBody>
   </Table>
   <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
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

                    <DialogContentText>Are you sure you want to delete this user? </DialogContentText>
           
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

   </div> 
    </div>
  )
}

export default RepTable