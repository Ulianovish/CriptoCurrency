import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Axios from 'axios';
import Spinner from './components/Spinner';

function App() {
  const [moneda, setMoneda] = useState('');
  const [criptoMoneda, setCriptoMoneda] = useState('');
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {

    const cotizar = async () => {
      if (moneda === '') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;

      const resultado = await Axios.get(url);

      setCargando(true);

      setTimeout(() => {
        setCargando(false);
        setResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
      }, 3000)
    }

    cotizar();

  }, [moneda, criptoMoneda]);

  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />;

  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt="imagen cripto"
        />
      </div>
      <div>
        <Heading>Cotizador de monedas al instante</Heading>
        <Formulario
          setMoneda={setMoneda}
          setCriptoMoneda={setCriptoMoneda}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700px;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;
