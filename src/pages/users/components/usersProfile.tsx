import { useState, useRef } from 'react';
import { TableRow } from "./style";
import { UserData } from '..';
import { Modal, Box, Typography, TextField, Button } from '@mui/material'

async function deleteUser(id: number): Promise<void> {
    try {
        const response = await fetch(`http://localhost:5100/user/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete user');
        } else {
            console.log("usuário deletado com sucesso")
        }
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

export function UsersProfile({ name, birthDate, photoUrl, id }: UserData) {
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState({ name, birthDate, photoUrl });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEdit = () => {
        console.log('Dados editados:', userData);
        handleClose();
    };

    function formattingData(data: string) {
        const [day, month, year] = data.split('/')
        return`${year}-${month}-${day}`
    }

    function handleClick(event: any) {
        const target = event.currentTarget;
        const id = target.getAttribute('data-id');

        if (target.textContent === "edit" && id) {
            handleOpen();
        } else if (target.textContent === "delete" && id) {
            deleteUser(id);
        }
    }

    const editRef = useRef(null);
    const deleteRef = useRef(null);

    return (
        <>
            <TableRow>
                <td>{photoUrl}</td>
                <td>{name}</td>
                <td>{birthDate}</td>
                <td ref={editRef} onClick={handleClick} data-id={id}>edit</td>
                <td ref={deleteRef} onClick={handleClick} data-id={id}>delete</td>
            </TableRow>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: '5px',
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
                        Editar Usuário
                    </Typography>
                    <TextField
                        label="Nome"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        fullWidth
                        sx={{ marginTop: 2 }} 
                    />
                    <TextField
                        label="Data de Nascimento"
                        name="birthDate"
                        type="date"
                        value={formattingData(userData.birthDate)}
                        onChange={handleChange}
                        fullWidth
                        sx={{ marginTop: 2 }} 
                    />
                    <TextField
                        label="URL da Foto"
                        name="photoUrl"
                        value={userData.photoUrl}
                        onChange={handleChange}
                        fullWidth
                        sx={{ marginTop: 2 }} 
                    />
                    <Button onClick={handleEdit} variant="contained" sx={{ mt: 2 }}>Salvar</Button>
                </Box>
            </Modal>
        </>
    )
}
