import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Table, TableBody, TableCell,Box, TableContainer, TableHead, TableRow, Paper, TextField, Button, TablePagination } from '@mui/material';

const RepSalesTable = (props) => {
 

  // Filters logic
  const [filteredData, setFilteredData] = useState(props.customersRep);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [addressFilter, setAddressFilter] = useState('');

  const applyFilters = () => {
    // Filter data based on criteria
    const filtered = props.customersRep.filter((customer) => {
      const nameMatch = customer.firstName.toLowerCase().includes(nameFilter.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(nameFilter.toLowerCase());

      const statusMatch = customer.status.toLowerCase().includes(statusFilter.toLowerCase());

      const addressMatch = customer.address.toLowerCase().includes(addressFilter.toLowerCase());

      return nameMatch && statusMatch && addressMatch;
    });

    setFilteredData(filtered);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [revenueData, setRevenueData] = useState({});

  useEffect(() => {
    // Calculate revenue per month and per year
    const revenueByPeriod = filteredData.reduce((acc, eachCust) => {
      const month = moment(eachCust.dos).format('MMM YYYY');
      const year = moment(eachCust.dos).format('YYYY');

      // Monthly revenue
      acc[month] = (acc[month] || 0) + eachCust.price;

      // Yearly revenue
      acc[year] = (acc[year] || 0) + eachCust.price;

      return acc;
    }, {});

    setRevenueData(revenueByPeriod);
  }, [filteredData]); // Trigger recalculation when filteredData changes

  return (
    <div>
      {/* Revenue per month table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 840 }}>
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Period</TableCell>
                <TableCell>Revenue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(revenueData)
                .filter(([period]) => moment(period, 'MMM YYYY').isSame(moment(), 'year'))
                .map(([period, revenue], i) => (
                  <TableRow key={i}>
                    <TableCell>{period}</TableCell>
                    <TableCell>${revenue}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    <Box sx={{margin: 4}}>
      {/* Filter input fields */}
      <TextField
        label="Customer Name"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
        sx={{marginRight: 2}}
      />
      <TextField
        label="Status"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        sx={{marginRight: 2}}
      />
      <TextField
        label="Address"
        value={addressFilter}
        onChange={(e) => setAddressFilter(e.target.value)}
        sx={{marginRight: 2,maxWidth: 100}}
      />

      {/* Apply Filter button */}
      <Button onClick={applyFilters} variant="contained" color="primary">
        Apply Filter
      </Button>
      </Box>

      

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 840 }}>
          <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
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
                <TableCell>Comments</TableCell>
                <TableCell>Updated at</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((eachCust, i) => (
                <TableRow key={i}>
                  <TableCell>{moment(eachCust.dos).format('MMM DD, YY')}</TableCell>
                  <TableCell>{eachCust.office}</TableCell>
                  <TableCell>
                    <span style={{ color: eachCust.user ? 'black' : 'red' }}>
                      {eachCust.user ? eachCust.user.firstName ? eachCust.user.firstName : 'no usar assigend' : 'no user assigned'} {eachCust.user && eachCust.user.lastName ? eachCust.user.lastName : ''}
                    </span>
                  </TableCell>
                  <TableCell>{eachCust.firstName} {eachCust.lastName}</TableCell>
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
                  <TableCell>{eachCust.comments.length !== 0 ? eachCust.comments[eachCust.comments.length - 1].text : 'No comments'}</TableCell>
                  <TableCell>{moment(eachCust.updatedAt).format('dddd LT MM/DD/YY')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default RepSalesTable;
