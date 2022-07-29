import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function FormPatients({ open, close, clicked, setClicked, patientUpdate, incrementId }) {

  const [newPatient, setNewPatient] = useState([]);
  const [validate, setValidate] = useState(false);

  const validateForm = ({ name, birth_date, email, address }) => {
    if (name && birth_date && email && address){
      const nameCheck = name.length >= 10;
      const dateCheck = birth_date.length > 1;
      const emailCheck = email.split('').includes('@') && email.split('.').includes('com');
      const addressCheck = address.length > 3;
  
      if (nameCheck && dateCheck && emailCheck && addressCheck) {
        setValidate(false);
      } else {
        setValidate(true);
      }
    }
  }

  const handleChangePatient = (value) => {
    setNewPatient(prev => ({
      ...prev,
      [value.target.name]: value.target.value,
    }))
    validateForm(newPatient);
  }

  const addNewPatient = async () => {
    try {
      await axios.post("https://1ouruzni23.execute-api.sa-east-1.amazonaws.com/patients", {
        idpatients: incrementId,
        name: newPatient.name,
        email: newPatient.email,
        birth_date: newPatient.birth_date,
        address: newPatient.address,
      });
    } catch (err) {
      console.log(err.message);
    }
    close();
    setClicked(!clicked)
  }

  const updatePatient = async () => {
    try {
      await axios.put("https://1ouruzni23.execute-api.sa-east-1.amazonaws.com/patients", {
        idpatients: newPatient.idpatients,
        name: newPatient.name,
        email: newPatient.email,
        birth_date: newPatient.birth_date,
        address: newPatient.address,
      });
    } catch (err) {
      console.log(err.message);
    }
    close();
    setClicked(!clicked)
  }

  useEffect(() => {
    if (patientUpdate.idpatients) {
      setNewPatient(patientUpdate);
    }
    setValidate(true);
  }, [patientUpdate]);

  if (patientUpdate.idpatients) {
    return (
      <div>
        <Dialog open={open} onClose={close} fullWidth>
          <DialogTitle>Informações do paciente</DialogTitle>
          <DialogContent>
          <DialogContentText>
              Nome
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              type="text"
              defaultValue={patientUpdate.name}
              fullWidth
              variant="standard"
              onChange={handleChangePatient}
            />
            <DialogContentText>
              E-mail
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="email"
              type="email"
              defaultValue={patientUpdate.email}
              fullWidth
              variant="standard"
              onChange={handleChangePatient}
            />
            <DialogContentText>
              Data de Nascimento
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="birth_date"
              type="date"
              defaultValue={patientUpdate.birth_date}
              fullWidth
              variant="standard"
              onChange={handleChangePatient}
            />
            <DialogContentText>
              Endereço
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              name="address"
              type="text"
              defaultValue={patientUpdate.address}
              fullWidth
              variant="standard"
              onChange={handleChangePatient}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={close}>Cancelar</Button>
            <Button onClick={updatePatient} disabled={validate}>Salvar</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
  return (
    <div>
      <Dialog open={open} onClose={close} fullWidth>
        <DialogTitle>Informações do paciente</DialogTitle>
        <DialogContent>
        <DialogContentText>
            Nome
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangePatient}
          />
          <DialogContentText>
            E-mail
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="email"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChangePatient}
          />
          <DialogContentText>
            Data de Nascimento
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="birth_date"
            type="date"
            fullWidth
            variant="standard"
            onChange={handleChangePatient}
          />
          <DialogContentText>
            Endereço
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="address"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChangePatient}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancelar</Button>
          <Button onClick={addNewPatient} disabled={validate}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}