import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';

const initialData = [
  { id: 1, name: 'John', age: 25, country: 'USA' },
  { id: 2, name: 'Alice', age: 30, country: 'Canada' },
  { id: 3, name: 'Bob', age: 22, country: 'UK' },
  // ... more data
];

const TableWithFilters = () => {
  const [filters, setFilters] = useState({ name: '', age: '', country: '' });
  const [filteredData, setFilteredData] = useState(initialData);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const applyFilters = () => {
    const filtered = initialData.filter((item) => {
      return Object.keys(filters).every((key) => {
        const filterValue = filters[key].toLowerCase();
        return String(item[key]).toLowerCase().includes(filterValue);
      });
    });
    setFilteredData(filtered);
  };

  return (
    <div>
      <TextField
        label="Name"
        value={filters.name}
        onChange={(e) => handleFilterChange('name', e.target.value)}
      />
      <TextField
        label="Age"
        value={filters.age}
        onChange={(e) => handleFilterChange('age', e.target.value)}
      />
      <TextField
        label="Country"
        value={filters.country}
        onChange={(e) => handleFilterChange('country', e.target.value)}
      />
      <Button onClick={applyFilters}>Apply Filters</Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableWithFilters;
