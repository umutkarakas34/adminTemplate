import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // API instance'ını kullanıyoruz

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post('/admin/login', { username, password });
      localStorage.setItem('token', response.data.token); // Token'ı localStorage'a kaydediyoruz
      navigate('/'); // Giriş başarılı, ana sayfaya yönlendiriyoruz
    } catch (error) {
      setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" marginBottom={3}>Giriş Yap</Typography>
      <TextField
        label="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Şifre"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
           {error && (
        <Typography color="error" marginTop={2}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        sx={{ marginTop: 3 }}
      >
        Giriş Yap
      </Button>
    </Box>
  );
};

export default Login;

