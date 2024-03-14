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
import Textarea from '@mui/joy/Textarea';
import { Typography } from '@mui/material'
import TextField from '@mui/material/TextField'

const RepView = (props) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [office, setOffice] = useState('')
    const [comments, setComments] = useState([])
    const [commentText, setCommentText] = useState('')
    const [custId, setCustId] = useState('')
    const [userEmail, SetUserEmail] = useState('')
    const [searchInput, setSearchInput] = useState('');
    const [repList, setRepList] = useState([])
    const [userName, setUserName] = useState(props.userFirstName + ' ' + props.userLastName)

    const navigate = useNavigate()

    let newComment = ''



    //Create use effect to get user data
    useEffect(()=>{

        axios.get(process.env.REACT_APP_API_URL+`/api/customers/${props.userId}`, {withCredentials: true})
        .then(response=>{
          console.log('RESPUESTA', response.data)
          setRepList(response.data.filter((eachCust)=>eachCust.status == 'In verification'))
       
        })
        .catch(err=>console.log(err))

    },[])

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

        newComment = 'Rep: ' + commentText
       

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
      <h1>Customers in verification</h1>
      {/* <Box style={{justifyContent: "space-around", alignItems:'center', display: 'flex', margin: 5, gap: 5}}>
    
    
    <Typography>Revenue: <span style={{color: "green"}}>{totalRev}</span></Typography>


    <Button size="small" onClick={()=>handleFilterByMonth(searchList)} variant='outlined'>This Month Sales</Button>
    <TextField margin='normal' type="text" label="Search" size='small' onChange={(e)=> setSearchInput(e.target.value)} value={searchInput} /> 
  </Box> */}
        <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
     <TableHead>
      <TableRow>
        <TableCell sx={{minWidth: 70}}>Date of Sale</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Office</TableCell>   
        <TableCell>Rep</TableCell>
        <TableCell>Customer name</TableCell>
        <TableCell>Phone</TableCell>
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
        repList.map((eachCust, i)=>{
          return (
            <TableRow key={i}>
              <TableCell>{moment(eachCust.dos).format('MMM DD, YY')}</TableCell>
              <TableCell>{eachCust.status}</TableCell>
              <TableCell>{eachCust.office}</TableCell>
              <TableCell>{userName}</TableCell>
              <TableCell>{eachCust.firstName} {eachCust.lastName}</TableCell>
              <TableCell>{eachCust.phone}</TableCell>
              {/* <TableCell>${eachCust.price}</TableCell>
              <TableCell>{eachCust.coapFirstName} {eachCust.coapLastName}</TableCell>
              <TableCell>{eachCust.CoapPhone}</TableCell>
              <TableCell>{eachCust.address}</TableCell>
              <TableCell>{eachCust.approval}</TableCell>
              <TableCell>{eachCust.bank}</TableCell>
              <TableCell>{eachCust.paymentPlan}</TableCell>
              <TableCell>{moment(eachCust.doi).format('MMM DD, YY')}</TableCell>
              <TableCell>{eachCust.installer}</TableCell>    */}
              <TableCell><Button size="small" variant='contained' color="info" onClick={()=>handleOpen(eachCust._id)}>View Comments</Button></TableCell>
              <TableCell>{eachCust.comments.length !== 0 ? eachCust.comments[eachCust.comments.length -1].text : 'No comments'}</TableCell>
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

export default RepView