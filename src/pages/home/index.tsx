import { FormContainer, HomeContainer } from "./style"
import { useNavigate } from "react-router-dom"

export function Home() {
    {document.title = 'DevelCode | Home'}

    const navigate = useNavigate()
    return (
        <HomeContainer>
        <h1>Login Administrativo</h1>
        <FormContainer action="">
            <input type="text" id="" placeholder="Usuário"/>
            <input type="password" id="" placeholder="Senha" />
            <button type="submit" onClick={(() => navigate("/users"))}>Entrar</button>
        </FormContainer>
        </HomeContainer>
    )
}