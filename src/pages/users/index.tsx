import { useEffect, useState } from "react";
import { UsersProfile } from "./components/usersProfile";
import { UsersContainer, TableContainer, TableHeader } from "./style";

interface UserData {
    id: number
    name: string
    birthDate: string
    photoUrl: string
}

export interface userDataReload extends UserData {
    fetchData: () => void
}

export function Users() {
    const [data, setData] = useState<UserData[]>([]);
    
    const fetchData = async () => {
        const response = await fetch("http://localhost:5100/user");
        const jsonData = await response.json();
        setData(jsonData as UserData[]);
    };

    useEffect(() => {
        fetchData()
    }, []);
    
    useEffect(() => {
    }, []);
    

    console.log(data)

    return (
        <UsersContainer>
            <h1>Usuários cadastrados</h1>
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
        </UsersContainer>
    );
}