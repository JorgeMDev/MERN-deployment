import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { FormControl, FormLabel } from '@mui/material';
import NavBarMui from './NavBarMui';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

const CustomerDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    office: '',
    address: '',
    phone: '',
    doi: '',
    price: '',
    bank: '',
    approval: '',
    status: '',
    comments: [],
    coapFirstName: '',
    coapLastName: '',
    coapEmail: '',
    coapCreditScore: '',
    coapPhone: 0,
    user: '',
    creditScore: '',
    dos: '',
    installer: '',
    paymentPlan: '',
  });

  const [allUsers, setAllUsers] = useState([]);


  const [errors, setErrors] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + '/api/allUsers', { withCredentials: true })
    .then(response => {
      setAllUsers(response.data);
    })
    .catch(err => navigate('/login'));
    
    axios.get(process.env.REACT_APP_API_URL + `/api/customer/${id}`, { withCredentials: true })
      .then(response => {
        console.log(response.data)
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          office: response.data.office,
          address: response.data.address,
          phone: response.data.phone,
          doi: response.data.doi !== null ? moment(response.data.doi).format('YYYY-MM-DD') : '', // Check for null and set an empty string,
          price: response.data.price,
          bank: response.data.bank,
          approval: response.data.approval,
          status: response.data.status,
          comments: response.data.comments,
          coapFirstName: response.data.coapFirstName,
          coapLastName: response.data.coapLastName,
          coapEmail: response.data.coapEmail,
          coapCreditScore: response.data.coapCreditScore,
          coapPhone: response.data.coapPhone,
          user: response.data.user,
          creditScore: response.data.creditScore,
          dos: moment(response.data.dos).format('YYYY-MM-DD'),
          installer: response.data.installer,
          paymentPlan: response.data.paymentPlan,
          // Add/update other form fields here
        });
      })
      .catch(err => {
        console.error(err);

        if (err.response && err.response.data && err.response.data.errors) {
          const errorResponseDataErrors = err.response.data.errors;
          const errMsgArr = [];

          for (const eachKey in errorResponseDataErrors) {
            errMsgArr.push(errorResponseDataErrors[eachKey].message);
          }

          setErrors(errMsgArr);
        } else {
          console.error("An error occurred while fetching customer details:", err);
        }
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(process.env.REACT_APP_API_URL + `/api/customer/${id}`, formData, { withCredentials: true })
      .then(response => {
        console.log(response.data);
        alert('Update Successful');
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '1000px' }}>
      <NavBarMui />
      <Box>
        <h1>Update a Customer</h1>
        <Button size="small" variant='outlined' onClick={handleHome}>Back to Dashboard</Button>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: "1%", boxShadow: 1, borderRadius: 2, padding: 3 }}>
              {/* Customer Information */}
              <Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>First name:</FormLabel>
                  <Input type='text' name='firstName' value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                </Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>Last name:</FormLabel>
                  <Input type='text' name='lastName' value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                </Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>Phone number:</FormLabel>
                  <Input type='number' name='phone' value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>Email:</FormLabel>
                  <Input type='text' name='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>Address:</FormLabel>
                  <Input type='text' name='address' value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                </Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>Credit Score:</FormLabel>
                  <Input type='number' name='creditScore' value={formData.creditScore} onChange={(e) => setFormData({ ...formData, creditScore: e.target.value })} />
                </Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>Date of Sale:</FormLabel>
                  <Input type='date' name='dos' value={formData.dos} onChange={(e) => setFormData({ ...formData, dos: e.target.value })} />
                </Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>Date of installation:</FormLabel>
                  <Input type='date' name='doi' value={formData.doi ? formData.doi : ''} onChange={(e) => setFormData({ ...formData, doi: e.target.value })} />
                </Box>
              </Box>
              {/* Other Sections */}
              <Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>Installer:</FormLabel>
                  <Input type='text' name='installer' value={formData.installer} onChange={(e) => setFormData({ ...formData, installer: e.target.value })} />
                </Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>Office:</FormLabel>
                  <Select sx={{ height: 30, width: 100 }} label="Choose Office:" value={formData.office} onChange={(e) => setFormData({ ...formData, office: e.target.value })}>
                    <MenuItem value='VA'>Virginia</MenuItem>
                    <MenuItem value='MD'>Maryland</MenuItem>
                  </Select>
                </Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>Price:</FormLabel>
                  <Input type='number' name='price' value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                </Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>Bank:</FormLabel>
                  <Input type='text' name='bank' value={formData.bank} onChange={(e) => setFormData({ ...formData, bank: e.target.value })} />
                </Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>Payments / Interest:</FormLabel>
                  <Input type='string' name='paymentPlan' value={formData.paymentPlan} onChange={(e) => setFormData({ ...formData, paymentPlan: e.target.value })} />
                </Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>Approval:</FormLabel>
                  <Input type='number' name='approval' value={formData.approval} onChange={(e) => setFormData({ ...formData, approval: e.target.value })} />
                </Box>
                <Box sx={{ padding: 1 }}>
                  <InputLabel>Status:</InputLabel>
                  <Select sx={{ height: 30, width: 100 }} type='text' name='status' label="Status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                    <MenuItem value='Pending approval'>Pending Approval</MenuItem>
                    <MenuItem value='Pending install'>Pending Install</MenuItem>
                    <MenuItem value='Pending contract'>Pending contract</MenuItem>
                    <MenuItem value='Signing'>Signing</MenuItem>
                    <MenuItem value='In verification'>In Verification</MenuItem>
                    <MenuItem value='Verified'>Verified</MenuItem>
                    <MenuItem value='Paid'>Paid</MenuItem>
                    <MenuItem value='Cancelled'>Cancelled</MenuItem>
                  </Select>
                </Box>
              </Box>
              {/* Coap Section */}
              <Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>Coap First name:</FormLabel>
                  <Input type='text' name='coapFirstName' value={formData.coapFirstName} onChange={(e) => setFormData({ ...formData, coapFirstName: e.target.value })} />
                </Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>Coap Last name:</FormLabel>
                  <Input type='text' name='coapLastName' value={formData.coapLastName} onChange={(e) => setFormData({ ...formData, coapLastName: e.target.value })} />
                </Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>Coap Phone number:</FormLabel>
                  <Input type='number' name='coapPhone' value={formData.coapPhone} onChange={(e) => setFormData({ ...formData, coapPhone: e.target.value })} />
                </Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>Coap Email:</FormLabel>
                  <Input type='text' name='coapEmail' value={formData.coapEmail} onChange={(e) => setFormData({ ...formData, coapEmail: e.target.value })} />
                </Box>
                <Box sx={{ padding: 1 }}>
                  <FormLabel>Coap Credit Score:</FormLabel>
                  <Input type='number' name='coapCreditScore' value={formData.coapCreditScore} onChange={(e) => setFormData({ ...formData, coapCreditScore: e.target.value })} />
                </Box>
                <FormLabel>Representative:</FormLabel>
                <Select
                  sx={{ height: 30 }}
                  type='text'
                  value={formData.user}
                  onChange={(e) => setFormData({ ...formData, user: e.target.value })}
                >
                  {allUsers
                    .sort((a, b) => a.firstName.localeCompare(b.firstName))
                    .map((eachUser, i) => (
                      <MenuItem key={i} value={eachUser._id}>
                        {eachUser.firstName}  {eachUser.lastName}
                      </MenuItem>
                    ))}
                </Select>
                
              </Box>
            </Box>
            <Button type='submit' size="small" variant='contained'>Update Customer</Button>
          </form>
        </Box>
        {/* SHOW ERROR MESSAGE FOR VALIDATIONS */}
        {
          errors.map((eachErr, i) => (
            <p key={i} style={{ color: 'red' }}>{eachErr}</p>
          ))
        }
      </Box>
    </Box>
  );
};

export default CustomerDetails;
