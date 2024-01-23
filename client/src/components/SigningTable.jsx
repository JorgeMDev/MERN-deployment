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


const SigningTable = (props) => {

    //modal variables
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState('')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [office, setOffice] = useState('')
  




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
    axios.put(process.env.REACT_APP_API_URL + `/api/customer/${updateId}`, {status : 'In verification'}, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        handleClose();
        alert('Update Successful');
        navigate('/')
       
      })
      .catch(err => console.log(err));
  }



    const navigate = useNavigate()

    let newComment = ''

    //Customers filtered by verification
    const verifList = props.customers.filter((eachCust)=>eachCust.status == 'Signing')

    const handleStatus = (id) => {
        alert('Contract Signed! Client goes to verification!')
        


    }


   

   
    
   

   

  



  return (
    <div>
      <h1>Customers Signing Table</h1>
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
        verifList.map((eachCust, i)=>{
          return (
            <TableRow key={i}>
              <TableCell>{moment(eachCust.dos).format('MMM DD, YY')}</TableCell>
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
              <TableCell>{eachCust.status}</TableCell>
              <TableCell><Button size="small" variant='contained' color="info" onClick={()=>handleOpen(eachCust._id)}>Mark as Signed</Button></TableCell>
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

                    <DialogContentText>Do you want to put this customer 'in verification'? </DialogContentText>
           
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

export default SigningTable