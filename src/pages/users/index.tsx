import { useEffect, useState } from "react";
import { UsersProfile } from "./components/usersProfile";
import { UsersContainer, TableContainer, TableHeader } from "./style";

export interface UserData {
    id: number
    name: string
    birthDate: string
    photoUrl: string
}

export function Users() {
    const [data, setData] = useState<UserData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:5100/user");
            const jsonData = await response.json();
            setData(jsonData as UserData[]);
            localStorage.setItem('usuarios', JSON.stringify(jsonData));
        };
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
                        <UsersProfile key={item.id} id={item.id} name={item.name} birthDate={item.birthDate} photoUrl={item.photoUrl}/>
                    )}
                </tbody>
            </TableContainer>
        </UsersContainer>
    );
}