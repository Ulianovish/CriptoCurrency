import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Axios from 'axios';
import Error from './Error';

const Formulario = ({ setMoneda, setCriptoMoneda }) => {

    const [listaCripto, setListaCripto] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await Axios.get(url);

            setListaCripto(resultado.data.Data);
        }
        consultarAPI();

    }, [])

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar' },
        { codigo: 'COP', nombre: 'Peso Colombiano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' },
    ]

    const [moneda, Seleccionar] = useMoneda('Elige tu Moneda', '', MONEDAS);
    const [criptomoneda, SeleccionarCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listaCripto);

    const cotizarMoneda = e => {
        e.preventDefault();

        if (moneda === '' || criptomoneda === '') {
            setError(true);
            return;
        }

        setError(false);
        setMoneda(moneda);
        setCriptoMoneda(criptomoneda);

    }

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error && <Error mensaje="Todos los campos son obligatorios" />}
            <Seleccionar />
            <SeleccionarCripto />
            <Boton
                type="submit"
                value="calcular"
            />
        </form>
    );
}

export default Formulario;

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`;