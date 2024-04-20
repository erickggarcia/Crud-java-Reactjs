import { FormContainer, HomeContainer } from "./style";

export function Home() {
    return (
        <HomeContainer>
        <h1>Login Administrativo</h1>
        <FormContainer action="">
            <input type="text" id="" placeholder="Usuário"/>
            <input type="password" id="" placeholder="Senha" />
            <button type="submit">Entrar</button>
        </FormContainer>
        </HomeContainer>
    )
}