import styled from "styled-components";

export const TableRow = styled.tr`
    td {
        padding: 8px;
        text-align: center;
        border-bottom: 1px solid #ddd;

        &:last-child,
        &:nth-last-child(2) { 
            cursor: pointer;
        }
    }

    &:nth-child(even) {
        background-color: #f2f2f2;
    }

    &:hover {
        background-color: #ddd;
    }
`;