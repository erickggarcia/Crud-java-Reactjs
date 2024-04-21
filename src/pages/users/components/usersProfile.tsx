import { useState, useRef } from 'react';
import { ImageContainer, TableRow } from "./style";
import { userDataReload } from '..';
import { Modal, Box, Typography, TextField, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import profile from '../../../assets/images/profile/profile-picture.png'

interface EditModalProps {
    open: boolean;
    handleClose: () => void;
    userData: { name: string; birthDate: string; photoUrl: string; }
    handleEdit: (editData: any) => void;
    formattingData: (data: string) => string;
    id: number
}

export function UsersProfile({ fetchData, name, birthDate, photoUrl, id }: userDataReload) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    
    function EditModal({id, open, handleClose, userData, handleEdit, formattingData}: EditModalProps) {
        const { register, handleSubmit, watch } = useForm();
        watch()
        
        const formatData = (data: any) => {
            const { birthDate, ...rest } = data;
            const [year, month, day] = birthDate.split('-');
            const formattedDate = `${day}/${month}/${year}`;
            return { ...rest, birthDate: formattedDate };
        };
        
    
        const onSubmit = (data: any) => {
            const editData = formatData({ ...data, id });
            handleEdit(editData);
            handleClose();
        };

        {console.log('essa é a imagem' , photoUrl)}
        return (
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
                    <ImageContainer>
                        <img style={{marginRight: '5px', display: 'block', maxHeight: '30px', maxWidth:'30px'}} src={photoUrl ? photoUrl: profile } alt="" />
                        <label htmlFor="photoUrl" style={{marginRight:'5px'}}>Link da imagem</label>
                        <input {...register('photoUrl')} type="text"/>
                    </ImageContainer>
    
                    <TextField
                        label="Nome"
                        defaultValue={userData.name}
                        fullWidth
                        sx={{ marginTop: 2 }}
                        {...register('name', { required: true })}
                    />
                    <TextField
                        label="Data de Nascimento"
                        type="date"
                        defaultValue={formattingData(userData.birthDate)}
                        fullWidth
                        sx={{ marginTop: 2 }}
                        {...register('birthDate', { required: true })}
                    />
    
                    <Button onClick={handleSubmit(onSubmit)} variant="contained" sx={{ mt: 2 }}>Salvar</Button>
                </Box>
            </Modal>
        );
    }
    

    const handleEditOpen = () => {
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleDeleteOpen = () => {
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    function DeleteModal({ id, open, handleClose, handleDelete }: any) {
        return (
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
                    <Typography style={{ display: 'flex', flexDirection: 'column' }} id="modal-modal-title" variant="h6" component="h2" gutterBottom>
                        Tem certeza que deseja deletar?
                        <span style={{ color: 'red', fontSize: '14px' }}>* Ao deletar o usuário o registro será apagado</span>
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button style={{ background: 'red' }} onClick={() => handleDelete(id)} variant="contained" sx={{ mt: 2 }}>Deletar</Button>
                        <Button style={{ background: '#1b75bb' }} onClick={handleDeleteClose} variant="contained" sx={{ mt: 2 }}>Cancelar</Button>
                    </div>
                </Box>
            </Modal>
        );
    }

     async function handleEdit (editData: any) {
        try {
            const response = await fetch(`http://localhost:5100/user`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editData)
            });
            if (!response.ok) {
                throw new Error('Failed to update user');
            } else {
                console.log("usuário editado com sucesso");
                fetchData();
                handleEditClose();
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    

    async function handleDelete(id: number): Promise<void> {
        try {
            const response = await fetch(`http://localhost:5100/user/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            } else {
                console.log("usuário deletado com sucesso");
                fetchData();
                handleDeleteClose();
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    function formattingData(data: string) {
        const [day, month, year] = data.split('/')
        return `${year}-${month}-${day}`
    }

    function handleClick(event: any) {
        const target = event.currentTarget;
        const id = target.getAttribute('data-id');

        if (target.textContent === "edit" && id) {
            handleEditOpen();
        } else if (target.textContent === "delete" && id) {
            handleDeleteOpen();
        }
    }

    const editRef = useRef(null);
    const deleteRef = useRef(null);

    return (
        <>
            <TableRow>
                <td>
                    <div style={{display: 'flex', justifyContent:'center'}}>
                        <img style={{marginRight: '5px', display: 'block', maxHeight: '30px', maxWidth:'30px'}} src={photoUrl ? photoUrl :  profile} alt="" />
                    </div>
                </td>
                <td>{name}</td>
                <td>{birthDate}</td>
                <td ref={editRef} onClick={handleClick} data-id={id} style={{color: 'green'}}>edit</td>
                <td ref={deleteRef} onClick={handleClick} data-id={id} style={{color: 'red'}}>delete</td>
            </TableRow>
            <EditModal
                open={editOpen}
                handleClose={handleEditClose}
                userData={{ name, birthDate, photoUrl }}
                id={id}
                handleEdit={handleEdit}
                formattingData={formattingData}
            />
            <DeleteModal
                id={id}
                open={deleteOpen}
                handleClose={handleDeleteClose}
                handleDelete={handleDelete}
            />
        </>
    )
}
