import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";
import Filme from './Filme';

export default function Filmes() 
{
    const [filmes, setFilmes] = useState([]);

	useEffect(() => {
		const requisicao = axios.get("https://mock-api.driven.com.br/api/v7/cineflex/movies");

		requisicao.then(resposta => {
			setFilmes(resposta.data);
		});
	}, []);

	if(filmes === []) 
    {
		return <p>Carregando filmes...</p>;
	}
	return (
		<><Container>
            <p>Selecione o filme</p>
        </Container>
        <Todos>
            {filmes.map((filme) => <Link key={filme.id} to={`/sessoes/${filme.id}`}><Filme                         
                                img = {filme.posterURL}
                                
                                
                            /></Link>)}
        </Todos></>
	);
}

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

const Todos = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;
