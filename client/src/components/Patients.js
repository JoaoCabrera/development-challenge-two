import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import FormPatients from './FormPatients';

export default function Patients() {

  const [patients, setPatients] = useState([]);
  const [formPatients, setFormPatients] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [patientUpdate, setPatientUpdate] = useState([]);
  const [incrementId, setIncrementId] = useState(1);

  const handleClickOpen = () => {
    setFormPatients(true);
  }

  const handleClose = () => {
    setFormPatients(false);
    setPatientUpdate([]);
  }

  const loadPatients = async () => {
    try {
      const result = await axios.get("https://1ouruzni23.execute-api.sa-east-1.amazonaws.com/patients");
      setPatients(result.data.Items);
      const data = result.data.Items.sort(
        (a, b) => a.idpatients < b.idpatients ? -1 : a.idpatients > b.idpatients ? 1 : 0
      );
      setIncrementId(data[data.length - 1].idpatients + 1);
    } catch (err) {
      console.log(err.message)
    }
  }

  const deletePatient = async (idpatients) => {
    try {
      await axios.delete(`https://1ouruzni23.execute-api.sa-east-1.amazonaws.com/patients/${idpatients}`);
    }catch (err) {
      console.log(err);
    }
    setClicked(!clicked);
  }

  const getPatientUpdate = async (idpatients) => {
    try {
      const result = await axios.get(`https://1ouruzni23.execute-api.sa-east-1.amazonaws.com/patients/${idpatients}`);
      setPatientUpdate(result.data.Item);
    }catch (err) {
      console.log(err);
    }
    handleClickOpen();
  }

  useEffect(() => {
    loadPatients();
  }, [clicked]);

  return (
    <>
    <div className="btn-container">
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
        Adicionar Paciente
      </Button>
      <FormPatients 
        open={formPatients}
        close={handleClose}
        clicked={clicked}
        setClicked={setClicked}
        patientUpdate={patientUpdate}
        incrementId={incrementId}
        patients={patients}
      />
    </div>
    <div className="table--container">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell align="center">Nome</TableCell>
            <TableCell align="center">Data de Nascimento</TableCell>
            <TableCell align="center">E-mail</TableCell>
            <TableCell align="center">Endereço</TableCell>
            <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow
                key={patient.idpatients}
              >
                <TableCell align="center">{patient.name}</TableCell>
                <TableCell align="center">
                  {patient.birth_date.split('T')[0].split('-').reverse().join('/')}
                </TableCell>
                <TableCell align="center">{patient.email}</TableCell>
                <TableCell align="center">{patient.address}</TableCell>
                <TableCell align="center">
                  <Button 
                    variant="contained" 
                    startIcon={<EditIcon />}
                    onClick={() => getPatientUpdate(patient.idpatients)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => deletePatient(patient.idpatients)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  );
}
