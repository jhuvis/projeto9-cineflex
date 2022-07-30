import React from "react";
import styled from 'styled-components';

export default function Filme(props) 
{
    const {img, id} = {...props};
    const [src, setSrc] = React.useState(img);
    return(
        <Caixa>
            <img src={src}></img>
        </Caixa>
    );
}

const Caixa = styled.div`
	width: 145px;
    height: 209px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 5px;
img {  
	width: 129px;
    height: 193px;
}
`;