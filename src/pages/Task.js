import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, Typography, Box, TextField, Button, Grid } from '@mui/material';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

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
  const [data, setData] = useState([
    {
      task_title: 'Task 1',
      task_image: 'image1.jpg',
      task_description: 'Description for task 1',
      task_link: 'http://example.com',
      task_reward: 50,
    },
    {
      task_title: 'Task 2',
      task_image: 'image2.jpg',
      task_description: 'Description for task 2',
      task_link: 'http://example2.com',
      task_reward: 100,
    },
  ]);

  const handleOpen = (task) => {
    setSelectedTask(task);
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

  const handleSave = () => {
    if (selectedTask) {
      setData((prevData) =>
        prevData.map((task) =>
          task.task_title === selectedTask.task_title ? selectedTask : task
        )
      );
    } else {
      // Yeni bir görev ekleme
      setData((prevData) => [
        ...prevData,
        {
          task_title: '',
          task_image: '',
          task_description: '',
          task_link: '',
          task_reward: '',
        },
      ]);
    }
    handleClose();
  };

  return (
    <>
      <HeaderStyled>
        <Typography variant="h4">Tasks</Typography>
      </HeaderStyled>
      <TableContainerStyled component={Paper}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <IconButtonStyled aria-label="add" onClick={() => handleOpen(null)}>
              <AddIcon />
            </IconButtonStyled>
          </Grid>
        </Grid>
        <Table>
          <TableHeadStyled>
            <TableRow>
              <TableCellStyled>Task Title</TableCellStyled>
              <TableCellStyled>Task Image</TableCellStyled>
              <TableCellStyled>Task Description</TableCellStyled>
              <TableCellStyled>Task Link</TableCellStyled>
              <TableCellStyled>Task Reward</TableCellStyled>
              <TableCellStyled>Actions</TableCellStyled>
            </TableRow>
          </TableHeadStyled>
          <TableBody>
            {data.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.task_title}</TableCell>
                <TableCell>{task.task_image}</TableCell>
                <TableCell>{task.task_description}</TableCell>
                <TableCell>{task.task_link}</TableCell>
                <TableCell>{task.task_reward}</TableCell>
                <TableCell>
                  <IconButtonStyled aria-label="edit" onClick={() => handleOpen(task)}>
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
            {selectedTask ? 'Edit Task' : 'Add Task'}
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            label="Task Title"
            name="task_title"
            value={selectedTask?.task_title || ''}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Task Image"
            name="task_image"
            value={selectedTask?.task_image || ''}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Task Description"
            name="task_description"
            value={selectedTask?.task_description || ''}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Task Link"
            name="task_link"
            value={selectedTask?.task_link || ''}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Task Reward"
            name="task_reward"
            type="number"
            value={selectedTask?.task_reward || ''}
            onChange={handleChange}
          />
          <Button onClick={handleSave} variant="contained" color="primary" sx={{ mt: 2 }}>
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Task;
