import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import Sessao from "./Sessao";

export default function Sessoes() {
  const {idFilme} = useParams();
  const [sessoes, setSessoes] = useState([]);
  const [filme, setFilme] = useState({});

  useEffect(() => {
    const requisicao = axios.get(
      `https://mock-api.driven.com.br/api/v7/cineflex/movies/${idFilme}/showtimes`
    );

    requisicao.then((res) => {
        setSessoes(res.data.days);
        setFilme(res.data)
    });
  }, []);

  return (
    <>
        <Container>
            <p>Selecione o horário</p>
        </Container>
        <Dias>
            {sessoes.map((dia) => <Sessao                         
                                semana = {dia.weekday}
                                data = {dia.date}
                                horarios = {dia.showtimes}
                            />)}
        </Dias>
        <Bottom>
                <Box>
                    <img src={filme.posterURL}></img>
                </Box>
                <div><p>{filme.title}</p></div>
        </Bottom>
    </>
  );
}

const Dias = styled.div`
    display: flex;
    align-items:  flex-start;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 150px;
`;

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
        font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 26px;
line-height: 30px;
display: flex;
align-items: center;

color: #293845;
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