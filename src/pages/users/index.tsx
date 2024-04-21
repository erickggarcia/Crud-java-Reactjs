import { useEffect, useState } from "react";
import { UsersProfile } from "./components/usersProfile";
import { UsersContainer, TableContainer, TableHeader } from "./style";
import { useForm } from "react-hook-form";
import { Modal, Box, Typography, TextField, Button } from '@mui/material'
import { Loading } from "../../components/loading";

interface UserData {
    id: number
    name: string
    birthDate: string
    photoUrl: string
}

export interface userDataReload extends UserData {
    fetchData: () => void
}

export interface registrationModalProps {
    open: boolean
    handleClose: () => void
    userData: { name: string; birthDate: string; photoUrl: string; }
    handleRegister: (registrationData: any) => void
}

export function Users() {
    {document.title = 'DevelCode | Users'}

    const [data, setData] = useState<UserData[]>([]);
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5100/user")
            const jsonData = await response.json()
            setData(jsonData as UserData[])
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    function RegistrationModal({open, handleClose, handleRegister} : registrationModalProps) {
        const { register, handleSubmit, watch } = useForm()
        watch()

        const formatData = (data: any) => {
            const { birthDate, ...rest } = data
            const [year, month, day] = birthDate.split('-')
            const formattedDate = `${day}/${month}/${year}`
            return { ...rest, birthDate: formattedDate }
        }
        
        const onSubmit = (data: any) => {
            const registrationData = formatData({ ...data })
            handleRegister(registrationData)
            handleClose()
        }

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
                        Criar Usuário
                    </Typography>
    
                    <TextField
                        label="Nome"
                        defaultValue=""
                        fullWidth
                        sx={{ marginTop: 2 }}
                        {...register('name', { required: true })}
                    />

                    <TextField
                        label="Foto de perfil"
                        defaultValue=""
                        fullWidth
                        sx={{ marginTop: 2 }}
                        {...register('photoUrl')}
                    />
                    <TextField
                        label="Data de Nascimento"
                        type="date"
                        defaultValue={`${new Date().toISOString().split('T')[0]}`}
                        fullWidth
                        sx={{ marginTop: 2 }}
                        {...register('birthDate', { required: true })}
                    />
    
                    <Button onClick={handleSubmit(onSubmit)} variant="contained" sx={{ mt: 2 }}>Salvar</Button>
                </Box>
            </Modal>
        )
    }

    const handleRegistrationOpen = () => {
        setOpen(true)
    }

    const handleRegistrationClose = () => {
        setOpen(false)
    }
    

    async function handleRegistration (registrationData: any) {
        try {
            const response = await fetch(`http://localhost:5100/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationData)
            })
            if (!response.ok) {
                throw new Error('Failed to register user')
            } else {
                console.log("usuário Cadastrado com sucesso");
                fetchData();
                handleRegistrationClose();
            }
        } catch (error) {
            console.error('Error registering user:', error);
        } 
    };
    

    return (
        <UsersContainer>
            <h1>Usuários cadastrados</h1>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div>
                        <div>
                            <button type="submit" onClick={handleRegistrationOpen}>Cadastrar Usuário</button>
                        </div>
                    </div>
                    <TableContainer>
                        <thead>
                            <TableHeader>
                                <td>Foto do perfil</td>
                                <td>Nome do usuário</td>
                                <td>Data de nascimento</td>
                                <td colSpan={2}>Ações</td>
                            </TableHeader>
                        </thead>
                        <tbody>
                            {data.map((item) =>
                                <UsersProfile key={item.id} fetchData={fetchData} id={item.id} name={item.name} birthDate={item.birthDate} photoUrl={item.photoUrl}/>
                            )}
                        </tbody>
                    </TableContainer>
                </>
            )}
            <RegistrationModal
                open={open}
                handleClose={handleRegistrationClose}
                userData={{ name: '', birthDate: '', photoUrl: '' }}
                handleRegister={handleRegistration}
            />
        </UsersContainer>
    )
    
    
}
