import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import verde from "./verde.png";
import laranja from "./amarelo.png";
import cinza from "./cinza.png";
import Assento from "./Assento";

export default function Assentos() {
  const {idSessao} = useParams();
  const [date, setDate] = useState({});
  const [name, setName] = useState("");
  const [filme, setFilme] = useState({});
  const [seats, setSeats] = useState([]);2
  const reservas = [];

  useEffect(() => {
    const requisicao = axios.get(
      `https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${idSessao}/seats`
    );

    requisicao.then((res) => {
        setDate(res.data.day);
        setName(res.data.name);
        setFilme(res.data.movie);
        setSeats(res.data.seats);
    });
  }, []);

  function reserva(name)
  {
    let tem = false;
    let i = 0;
    for(i = 0; i < reservas.length; i++)
    {
      if(reservas[i] === name)
      {
        tem = true;
        break;
      }
    }
    if(tem === false)
    {
      reservas.push(name);
      console.log(reservas);
    }
    else
    {
      reservas.splice(i, 1);
      console.log(reservas);
    }   
    
  }

  return (
    <>
    <Ass>
        <Container>
            <p>Selecione o(s) assento(s)</p>
        </Container>
        <Todos>
        {seats.map((seat, index) => <Assento 

                                    name = {seat.name}
                                    isAvailable = {seat.isAvailable} 
                                    reserva = {reserva}
                                    key = {index}  
                            />)}
        </Todos>
        <Indice>
          <div>
            <img src={verde}></img>
            <p>Selecionado</p>
          </div>
          <div>
            <img src={cinza}></img>
            <p>Disponível</p>
          </div>
          <div>
            <img src={laranja}></img>
            <p>Indisponível</p>
          </div>
        </Indice>

        <Bottom>
                <Box>
                    <img src={filme.posterURL}></img>
                </Box>
                <div><p>{filme.title}</p>
                <p>{date.weekday} - {name}</p></div>
        </Bottom>
    </Ass>
    </>
  );
}

const Box = styled.div`
    width: 64px;
height: 89px;
left: 10px;
bottom: 14px;
display: flex;
    align-items: center;
    justify-content: center;

background: #FFFFFF;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
border-radius: 2px;
margin: 8px;

    img{
        width: 48px;
        height: 72px;
    }
`;

const Bottom = styled.div`
    position: fixed;
    display: flex;
    align-items:  center;
    justify-content: flex-start;
    flex-direction: row;
	  width: 100%;
    height: 117px;
    left: 0px;
    bottom: 0px;
    background: #DFE6ED;
    border: 1px solid #9EADBA;
	
	div p {
        display: flex;
        align-items:  center;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 26px;
        color: #293845;
	}

`;


const Todos = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 350px;
    

`;

const Ass = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Indice = styled.div`
    display: flex;
    width: 60%;
    height: 110px;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    div{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
`;

const Container = styled.div`
	width: 100%;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
	
	p {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 28px;

        letter-spacing: 0.04em;

        color: #293845;
	}
`;