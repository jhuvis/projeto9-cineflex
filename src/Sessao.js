import { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

export default function Sessao(props) 
{
    const {semana, data, horarios} = {...props};
    const [sem, setSemana] = useState(semana);
    const [da, setData] = useState(data);
    const [horas, setHorarios] = useState(horarios);
    
    return(
        <>
        <Span>{sem} - {da}</Span>
        <Caixa>
        {horas.map((hora) => 
        
            <Link key={hora.id} to={`/assentos/${hora.id}`}>
            <button >
               {hora.name} 
            </button>
            </Link>
        )}  
                                                                       
        </Caixa>
        </>
    );
}

const Span = styled.div`
    font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 23px;
display: flex;
align-items: center;
letter-spacing: 0.02em;

color: #293845;

`;

const Caixa = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
margin-top: 15px;
margin-bottom: 15px;
button{
    width: 83px;
    height: 43px;

    background: #E8833A;
    border-radius: 3px;
    margin-right: 10px;
    margin-bottom: 5px;


    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    border: none;
    
    color: #FFFFFF;
}

`;