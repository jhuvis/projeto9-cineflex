import React from 'react';
import styled from 'styled-components';

export default function Topo() {
	return (
		<Caixa>
			<p>CINEFLEX</p>
		</Caixa>
	);
}

const Caixa = styled.div`
	width: 100%;
    height: 67px;
	background: #C3CFD9;
    display: flex;
    align-items: center;
    justify-content: center;
p {
    
	font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    color: #E8833A;
}
`;

