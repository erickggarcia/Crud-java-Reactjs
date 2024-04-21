import styled from "styled-components";

export const UsersContainer = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5px;

    h1 {
        margin-bottom: 10px;
    }
`;

export const TableContainer = styled.table`
    width: 1200px;
    max-width: 1200px;
    border-collapse: collapse;
`;

export const TableHeader = styled.tr`
    background-color: #1b75bb;
    color: white;
    td {
        padding: 8px;
        text-align: center;
        font-weight: bold;
    }
`;