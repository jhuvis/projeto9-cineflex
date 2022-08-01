import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import verde from "./verde.png";
import laranja from "./amarelo.png";
import cinza from "./cinza.png";
import Assento from "./Assento";

let reservas = [];
let cadeiras = [];

export default function Assentos() {
  const {idSessao} = useParams();
  const [date, setDate] = useState({});
  const [name, setName] = useState("");
  const [filme, setFilme] = useState({});
  const [seats, setSeats] = useState([]);
  var [nome, setNome] = useState("");
  var [cpf, setCpf] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    let isApiSubscribed = true;
    const requisicao = axios.get(
      `https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${idSessao}/seats`
    );

    requisicao.then((res) => {
      if (isApiSubscribed) 
      {
        setDate(res.data.day);
        setName(res.data.name);
        setFilme(res.data.movie);
        setSeats(res.data.seats);
      }
    });
    return () => 
    {
      isApiSubscribed = false;
    };
  }, []);

  function reserva(id, name)
  {
    let tem = false;
    let i = 0;
    for(i = 0; i < reservas.length; i++)
    {
      if(reservas[i] === id)
      {
        tem = true;
        break;
      }
    }
    if(tem === false)
    {
      reservas.push(id);
      cadeiras.push(name);
    }
    else
    {
      reservas.splice(i, 1);
      cadeiras.splice(i, 1);
    }   
    
  }

  function finalizar(event)
  {
    event.preventDefault();

    if (reservas.length === 0) 
    {
      return alert("assento vazios");
    }

    const requisicao = axios.post("https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many", 
    {
			ids: reservas,
	    name: nome,
	    cpf: cpf,
		});

    requisicao.then(() => {navigate("/sucesso",
    {
      replace: false,
      state: {
      title : filme.title,
      weekday : date.weekday,
      hora : name,
      assentos : cadeiras,
      nome : nome,
      cpf : cpf,
    },
    })

    setCpf("");
    setNome("");
    const novo = [];
    reservas = [...novo];
    cadeiras = [...novo];

  });
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
                                    id = {seat.id}
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

        <Form>
        <form onSubmit={finalizar}>
        <label htmlFor="nome">Nome do comprador: </label>
         <div><Input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          /></div> 
          <label htmlFor="cpf">CPF do comprador: </label>
          <div><Input
            type="text"
            id="cpf"
            value={cpf}
            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
            onChange={(e) => setCpf(e.target.value)}
            required
          /></div> 
          <Buttom>
          
          <button type="submit">
              Reservar assento(s)
              
          </button>
          
          
          </Buttom>
        </form>
        </Form>

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

const Form = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    margin-bottom: 200px;
    div{
      margin-bottom: 10px;
    }

`;

const Buttom = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px;

    button{
      background: #E8833A;
      border-radius: 3px;
      border: none;
      width: 225px;
      height: 42px;

      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 21px;
      color: #FFFFFF;
    }

`;

const Input = styled.input`
width: 327px;
height: 51px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 3px;
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