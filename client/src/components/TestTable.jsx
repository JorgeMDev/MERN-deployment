import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'Date of Sale', label: 'Date of Sale', minWidth: 170 },
  { id: 'Office', label: 'Office', minWidth: 100 },
  {
    id: 'Rep',
    label: 'Rep',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'Customer name',
    label: 'Customer name',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'phone',
    label: 'Phone',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'score',
    label: 'Score',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'coap',
    label: 'Coap',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'coap phone',
    label: 'Coap Phone',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'address',
    label: 'Address',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'aproval',
    label: 'Aproval',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'bank',
    label: 'Bank',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'payment',
    label: 'Payments / Interest',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'DOI',
    label: 'DOI',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'installet',
    label: 'Installer',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'action',
    label: 'Actions',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'Comment',
    label: 'Comment',
    minWidth: 170,
    align: 'right'
  },
  {
    id: 'updated',
    label: 'Updated at',
    minWidth: 170,
    align: 'right'
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];






export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [list, setList] = useState([])


  useEffect(()=>{
    axios.get(process.env.REACT_APP_API_URL+'/api/customers/all', {withCredentials: true})
    .then((response)=>{
      setList(response.data)
      console.log(response.data)
    })
  },[])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {list
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                            
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
