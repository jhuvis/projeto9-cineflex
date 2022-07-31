import { useState } from "react";
import styled from 'styled-components';

export default function Assento(props)
{
    const {name, isAvailable, reserva, key} = {...props};

    const [cor, setCor] = useState(() => isAvailable ? "#C3CFD9" : "#FBE192");
    
    function toma()
    {
        if(isAvailable === true)
        {
            if(cor === "#8DD7CF")
            {
                setCor("#C3CFD9");
                reserva(name);
            }
            else
            {
                setCor("#8DD7CF");
                reserva(name);
            }
        }
    }

    return(
        <Botao core={cor} onClick={() => toma()}>
            {name}
        </Botao>

    );
}


const Botao = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.core};
  border: 1px solid #808F9D;
  border-radius: 12px;
  width: 26px;
  height: 26px;
  border: none;
  margin: 5px; 
  
  
`;