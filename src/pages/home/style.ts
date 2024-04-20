import styled from "styled-components";

export const HomeContainer = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
    gap: 1.5rem;

    h1 {
        color: #1b75bb;
    }
`

export const FormContainer = styled.form`
    border-radius: 6px;
    width: 300px;
    background-color: #CCCCCC;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;

    input[type="text"], input[type="password"] {
        padding: 5px;
        border: 0;
        border-radius: 6px;

    }

    button {
        border-radius: 6px;
        padding: 5px 0;
        border: 0;
        background-color: #1b75bb ;
        color: white;
        font: bold;

        cursor: pointer;
    }
`