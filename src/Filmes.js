import React from 'react';
import styled from 'styled-components';

export default function Filmes() {
	return (
		<Container>
			<p>Selecione o filme</p>
		</Container>
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
