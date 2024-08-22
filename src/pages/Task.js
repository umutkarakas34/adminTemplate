import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  TextField,
  Button,
  Modal,
  Input
} from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import api from '../api/api';

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

const Task = () => {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [data, setData] = useState([]);
  const [taskImages, setTaskImages] = useState([]);

  // Görevleri listeleme
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('admin/tasks');
      setData(response.data);
    } catch (error) {
      console.error('Görevler yüklenirken bir hata oluştu:', error);
    }
  };

  const handleOpen = (task) => {
    setSelectedTask(task);
    setTaskImages([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setTaskImages(e.target.files);
  };

  const handleSave = async () => {
    try {
      if (selectedTask?.id) {
        // Güncelleme için PUT isteği
        await api.put(`admin/tasks/${selectedTask.id}`, {
          task_title: selectedTask.task_title,
          task_description: selectedTask.task_description,
          task_reward: selectedTask.task_reward,
          task_link: selectedTask.task_link,
        });
        console.log("calıstı");
      } else {
        // Yeni görev ekleme işlemi için POST isteği
        const formData = new FormData();
        formData.append('task_title', selectedTask?.task_title);
        formData.append('task_description', selectedTask?.task_description);
        formData.append('task_reward', selectedTask?.task_reward);
        formData.append('task_link', selectedTask?.task_link);
  
        for (let i = 0; i < taskImages.length; i++) {
          formData.append('task_images', taskImages[i]);
        }
  
        await api.post('/admin/create-task', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
  
      fetchTasks(); // Görevleri güncelle
      handleClose(); // Modalı kapat
    } catch (error) {
      console.error('Görev kaydedilirken bir hata oluştu:', error);
    }
  };
  
  

  const handleDelete = async (id) => {
    try {
      await api.delete(`admin/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Görev silinirken bir hata oluştu:', error);
    }
  };

  return (
    <>
      <HeaderStyled>
        <Typography variant="h4">Görevler</Typography>
      </HeaderStyled>
      <Box display="flex" justifyContent="center" marginBottom={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpen({ task_title: '', task_description: '', task_link: '', task_reward: 0 })}
        >
          Yeni Görev Ekle
        </Button>
      </Box>
      <TableContainerStyled component={Paper}>
        <Table>
          <TableHeadStyled>
            <TableRow>
              <TableCellStyled>Görev Başlığı</TableCellStyled>
              <TableCellStyled>Görev Resmi</TableCellStyled>
              <TableCellStyled>Görev Açıklaması</TableCellStyled>
              <TableCellStyled>Görev Bağlantısı</TableCellStyled>
              <TableCellStyled>Görev Ödülü</TableCellStyled>
              <TableCellStyled>İşlemler</TableCellStyled>
            </TableRow>
          </TableHeadStyled>
          <TableBody>
            {data.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.task_title}</TableCell>
                <TableCell>
  {task.task_image ? (
    <img 
      src={task.task_image} 
      alt="Task Image" 
      style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
    />
  ) : (
    'Resim Yok'
  )}
</TableCell>

                <TableCell>{task.task_description}</TableCell>
                <TableCell>{task.task_link}</TableCell>
                <TableCell>{task.task_reward}</TableCell>
                <TableCell>
                  <IconButtonStyled aria-label="edit" onClick={() => handleOpen(task)}>
                    <EditIcon />
                  </IconButtonStyled>
                  <IconButtonStyled aria-label="delete" onClick={() => handleDelete(task.id)}>
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
            {selectedTask?.id ? 'Görevi Düzenle' : 'Yeni Görev Ekle'}
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            label="Görev Başlığı"
            name="task_title"
            value={selectedTask?.task_title || ''}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Görev Açıklaması"
            name="task_description"
            value={selectedTask?.task_description || ''}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Görev Bağlantısı"
            name="task_link"
            value={selectedTask?.task_link || ''}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Görev Ödülü"
            name="task_reward"
            value={selectedTask?.task_reward || ''}
            onChange={handleChange}
            type="number"
          />
          <Input
            type="file"
            inputProps={{ multiple: true }}
            onChange={handleImageChange}
            sx={{ mt: 2 }}
          />
          <Button onClick={handleSave} variant="contained" color="primary" sx={{ mt: 2 }}>
            Kaydet
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Task;
