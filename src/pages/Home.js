import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { CSVLink } from 'react-csv'; // CSV indirme işlemi için react-csv'i kullanıyoruz
import api from '../api/api';

const TableContainerStyled = styled(TableContainer)({
  margin: 'auto',
  marginTop: '50px',
  maxWidth: '80%',
  textAlign: 'center',
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/admin/users');
      setData(response.data);
    } catch (error) {
      console.error('Veriler çekilirken bir hata oluştu:', error);
    }
  };

  // CSV başlıkları ve verileri ayarlıyoruz
  const csvHeaders = [
    { label: "Telegram ID", key: "telegram_id" },
    { label: "Kullanıcı Adı", key: "username" },
    { label: "Ad", key: "first_name" },
    { label: "Soyad", key: "last_name" },
    { label: "Referral Kodu", key: "referral_code" },
    { label: "Referans Olan", key: "referred_by" },
    { label: "Token", key: "token" },
    { label: "Referans Kazanç", key: "ref_earning" },
    { label: "Bilet", key: "ticket" },
    { label: "Kazanç Talep Tarihi", key: "ref_earning_claim_date" },
  ];

  const csvData = data.map((row) => ({
    telegram_id: row.telegram_id,
    username: row.username,
    first_name: row.first_name,
    last_name: row.last_name,
    referral_code: row.referral_code,
    referred_by: row.referred_by,
    token: row.token,
    ref_earning: row.ref_earning,
    ticket: row.ticket,
    ref_earning_claim_date: formatDate(row.ref_earning_claim_date),
  }));

  return (
    <>
      <Typography variant="h4" textAlign="center" margin="20px 0">
        Kullanıcılar
      </Typography>
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <CSVLink data={csvData} headers={csvHeaders} filename={"kullanici_verileri.csv"}>
          <Button variant="contained" color="primary">
            CSV Olarak İndir
          </Button>
        </CSVLink>
      </Box>
      <TableContainerStyled component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Telegram ID</TableCell>
              <TableCell>Kullanıcı Adı</TableCell>
              <TableCell>Ad</TableCell>
              <TableCell>Soyad</TableCell>
              <TableCell>Referral Kodu</TableCell>
              <TableCell>Referans Olan</TableCell>
              <TableCell>Token</TableCell>
              <TableCell>Referans Kazanç</TableCell>
              <TableCell>Bilet</TableCell>
              <TableCell>Kazanç Talep Tarihi</TableCell>
            </TableRow>
          </TableHead>
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
                <TableCell>{formatDate(row.ref_earning_claim_date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainerStyled>
    </>
  );
};

export default Home;
