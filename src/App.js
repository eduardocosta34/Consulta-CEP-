import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [endereco, setEndereco] = useState({});

  function manipularEndereco(evento) {
    const cep = evento.target.value;

    setEndereco({
      cep,
    });

    if (cep && cep.length === 8) {
      //obter o cep
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((resposta) => resposta.json())
        .then((dados) => {
          setEndereco((enderecoAntigo) => {
            return {
              ...enderecoAntigo,
              cep: cep,
              rua: dados.logradouro,
              bairro: dados.bairro,
              cidade: dados.localidade,
              estado: dados.uf,
            };
          });
        });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <input
          placeholder="Digite o CEP"
          onChange={manipularEndereco}
          className="input"
        />

        <ul>
          <li>Rua: {endereco.rua}</li>
          <li>Bairro: {endereco.bairro}</li>
          <li>Cidade: {endereco.cidade}</li>
          <li>Estado: {endereco.estado}</li>
          <li>CEP: {endereco.cep}</li>
        </ul>
      </header>
    </div>
  );
}

export default App;
