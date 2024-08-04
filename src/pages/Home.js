import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, Typography, Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TableContainerStyled = styled(TableContainer)({
  margin: 'auto',
  marginTop: '50px',
  maxWidth: '80%',
  textAlign: 'center',
});

const TableHeadStyled = styled(TableHead)({
  backgroundColor: '#f5f5f5',
});

const TableCellStyled = styled(TableCell)({
  fontWeight: 'bold',
});

const IconButtonStyled = styled(IconButton)({
  margin: '0 5px',
});

const HeaderStyled = styled('div')({
  textAlign: 'center',
  margin: '20px 0',
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([
    {
      telegram_id: 123456,
      username: 'john_doe',
      first_name: 'John',
      last_name: 'Doe',
      referral_code: 'REF123',
      referred_by: 654321,
      token: 10.5,
      ref_earning: 2.5,
      ticket: 3,
      ref_earning_claim_date: '2024-08-04',
    },
    {
      telegram_id: 789012,
      username: 'jane_smith',
      first_name: 'Jane',
      last_name: 'Smith',
      referral_code: 'REF456',
      referred_by: 654322,
      token: 15.0,
      ref_earning: 3.0,
      ticket: 5,
      ref_earning_claim_date: '2024-08-05',
    },
  ]);

  const handleOpen = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setData((prevData) =>
      prevData.map((row) =>
        row.telegram_id === selectedRow.telegram_id ? selectedRow : row
      )
    );
    handleClose();
  };

  return (
    <>
      <HeaderStyled>
        <Typography variant="h4">Users</Typography>
      </HeaderStyled>
      <TableContainerStyled component={Paper}>
        <Table>
          <TableHeadStyled>
            <TableRow>
              <TableCellStyled>Telegram ID</TableCellStyled>
              <TableCellStyled>Username</TableCellStyled>
              <TableCellStyled>First Name</TableCellStyled>
              <TableCellStyled>Last Name</TableCellStyled>
              <TableCellStyled>Referral Code</TableCellStyled>
              <TableCellStyled>Referred By</TableCellStyled>
              <TableCellStyled>Token</TableCellStyled>
              <TableCellStyled>Ref Earning</TableCellStyled>
              <TableCellStyled>Ticket</TableCellStyled>
              <TableCellStyled>Ref Earning Claim Date</TableCellStyled>
              <TableCellStyled>Actions</TableCellStyled>
            </TableRow>
          </TableHeadStyled>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.telegram_id}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.first_name}</TableCell>
                <TableCell>{row.last_name}</TableCell>
                <TableCell>{row.referral_code}</TableCell>
                <TableCell>{row.referred_by}</TableCell>
                <TableCell>{row.token}</TableCell>
                <TableCell>{row.ref_earning}</TableCell>
                <TableCell>{row.ticket}</TableCell>
                <TableCell>{row.ref_earning_claim_date}</TableCell>
                <TableCell>
                  <IconButtonStyled aria-label="edit" onClick={() => handleOpen(row)}>
                    <EditIcon />
                  </IconButtonStyled>
                  <IconButtonStyled aria-label="delete">
                    <DeleteIcon />
                  </IconButtonStyled>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainerStyled>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Edit User
          </Typography>
          {selectedRow && (
            <div>
              <TextField
                margin="normal"
                fullWidth
                label="Token"
                name="token"
                type="number"
                value={selectedRow.token}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Ref Earning"
                name="ref_earning"
                type="number"
                value={selectedRow.ref_earning}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Ticket"
                name="ticket"
                type="number"
                value={selectedRow.ticket}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                fullWidth
                label="Ref Earning Claim Date"
                name="ref_earning_claim_date"
                type="date"
                value={selectedRow.ref_earning_claim_date}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button onClick={handleSave} variant="contained" color="primary" sx={{ mt: 2 }}>
                Save
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Home;
