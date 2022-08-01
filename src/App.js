import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Filmes from "./Filmes";
import Topo from "./Topo";
import Sessoes from "./Sessoes";
import Assentos from "./assentos/Assentos";
import Sucesso from "./Sucesso";
import styled from 'styled-components';

export default function App() {
    
    return (
        <>
            <Body>
            <Topo />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Filmes />} />
                    <Route path="/sessoes/:idFilme" element={<Sessoes />} />
                    <Route path="/assentos/:idSessao" element={<Assentos />} />
                    <Route path="/sucesso" element={<Sucesso />} />
                </Routes>
            </BrowserRouter>
            </Body>
        </>
    );
  }

  const Body = styled.div`
    display: flex;
    flex-direction: column;
`;
  