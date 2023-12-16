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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Textarea from '@mui/joy/Textarea';


const VerificationTable = (props) => {


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [office, setOffice] = useState('')
    const [comments, setComments] = useState([])
    const [commentText, setCommentText] = useState('')
    const [custId, setCustId] = useState('')

    const navigate = useNavigate()

    let newComment = ''

    //Customers filtered by verification
    const verifList = props.customers.filter((eachCust)=>eachCust.status == 'verification')

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
        console.log(newComment)

        newComment = 'Verif: ' + commentText
       

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

    const testApi = () => {
      axios.get(process.env.REACT_APP_API_URL+'/api/test/comment', {withCredentials: true})
        .then(response=>{
        console.log(response.data)
      })
      .catch(err=>{
        console.log(err.response)
      })

    }




  return (
    <div>
        <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
     <TableHead>
      <TableRow>
        <TableCell sx={{minWidth: 70}}>Date of Sale</TableCell>
        <TableCell>Office</TableCell>   
        <TableCell>Rep</TableCell>
        <TableCell>Customer name</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>Price</TableCell>
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
        <TableCell>Latest Comment</TableCell>
        <TableCell>Updated at</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    
      
      {
        verifList.map((eachCust, i)=>{
          return (
            <TableRow key={i}>
              <TableCell>{newComment}</TableCell>
              <TableCell>{moment(eachCust.dos).format('MMM DD, YY')}</TableCell>
              <TableCell>{eachCust.office}</TableCell>
              <TableCell>{eachCust.user.firstName} {eachCust.user.lastName}</TableCell>
              <TableCell>{eachCust.firstName} {eachCust.lastName}</TableCell>
              <TableCell>{eachCust.phone}</TableCell>
              <TableCell>${eachCust.price}</TableCell>
              <TableCell>{eachCust.coapFirstName} {eachCust.coapLastName}</TableCell>
              <TableCell>{eachCust.CoapPhone}</TableCell>
              <TableCell>{eachCust.address}</TableCell>
              <TableCell>{eachCust.approval}</TableCell>
              <TableCell>{eachCust.bank}</TableCell>
              <TableCell>{eachCust.paymentPlan}</TableCell>
              <TableCell>{moment(eachCust.doi).format('MMM DD, YY')}</TableCell>
              <TableCell>{eachCust.installer}</TableCell>   
              <TableCell>{eachCust.status}</TableCell>
              <TableCell><Button size="small" variant='contained' color="info" onClick={()=>handleOpen(eachCust._id)}>Add Comment</Button></TableCell>
              <TableCell>{eachCust.comments[eachCust.comments.length -1].text}</TableCell>
              <TableCell>{moment(eachCust.updatedAt).format('dddd LT MM/DD/YY')}</TableCell>
            </TableRow>
          )
        })
      } 
    </TableBody>
    </Table>
   </TableContainer>

  
      <Box >
      <Dialog open={open} onClose={handleClose}  >
        <DialogTitle>Customer: {firstName} {lastName} - Office:{office} </DialogTitle>
        <DialogContent>

                 {
              
                  comments.map((comment, i) =>(

                    <DialogContentText key={i}>{moment(comment.timestamp).format('MMM DD, YY, hh:mm a')}: {comment.text} </DialogContentText>
           

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

export default VerificationTable