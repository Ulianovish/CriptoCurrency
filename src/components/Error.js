import React from 'react';
import styled from '@emotion/styled';

const Error = ({ mensaje }) => {
    return (
        <Mensaje>{mensaje}</Mensaje>
    );
}

export default Error;

const Mensaje = styled.p`
    background-color: #B7322C;
    padding: 1rem;
    color: #FFF;
    font-size: 30px;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    font-family: 'Bebas Neue', cursive;
`;