// ------------------------------------------------------------
// IMPORTAÇÕES
// ------------------------------------------------------------

import Header from "./Header";
import Lista from "./Lista"; // Se esta lista precisar de props, posso ajustar depois
import Filho from "./Filho"; // Onde usaremos props
import { useEffect, useState } from "react";


// ------------------------------------------------------------
// COMPONENTE PRINCIPAL DO APP
// ------------------------------------------------------------
function App() {

  // ------------------------------------------------------------
  // useState — Criar estado para variáveis reativas
  // ------------------------------------------------------------
  const [count, setCount] = useState(0); // contador
  const [mensagem, setMensagem] = useState("Carregando..."); // texto modificado pelo useEffect
  const [user, setUser] = useState(null); // dados da API user/1
  const [todos, setTodos] = useState([]); // lista de tarefas da API
  const [texto, setTexto] = useState(""); // formulário controlado


  // ------------------------------------------------------------
  // useEffect — Executado após renderizar o componente
  // Simulação de carregamento
  // ------------------------------------------------------------
  useEffect(() => {
    setTimeout(() => {
      setMensagem("Dados carregados com sucesso!");
    }, 3000);
  }, []);


  // ------------------------------------------------------------
  // useEffect — Consumindo API (usuário)
  // ------------------------------------------------------------
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);


  // ------------------------------------------------------------
  // useEffect — Consumindo API (todos)
  // ------------------------------------------------------------
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);


  // ------------------------------------------------------------
  // RENDERIZAÇÃO
  // ------------------------------------------------------------
  return (
    <div>

      <h1>Meu primeiro app React</h1>
      <p>Olá, React!</p>
      <p>React é baseado em componentes!</p>

      {/* Componente importado */}
      <Header />

      {/* Lista — caso precise receber props, basta avisar que ajusto */}
      <Lista />

      {/* -------------------- CONTADOR -------------------- */}
      <div>
        <h1>Contador: {count}</h1>

        {/* Evento de clique + estado */}
        <button onClick={() => setCount(count + 1)}>
          Aumentar
        </button>
      </div>

      {/* Renderização condicional */}
      {count > 5 && <p>Você clicou mais de 5 vezes!</p>}


      {/* -------------------- MENSAGEM DO useEffect -------------------- */}
      <h1>{mensagem}</h1>

      {/* -------------------- CONSUMINDO API -------------------- */}
      <h1>Consumindo API:</h1>

      {!user && <p>Carregando...</p>}

      {user && (
        <div>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}


      {/* -------------------- LISTA DE TAREFAS -------------------- */}
      <h1>Lista de Tarefas</h1>

      {todos.length === 0 && <p>Carregando...</p>}

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? "✔" : "❌"}
          </li>
        ))}
      </ul>


      {/* -------------------- FORMULÁRIO CONTROLADO -------------------- */}
      <h1>Formulário</h1>

      <input 
        type="text" 
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <p>Você digitou: {texto}</p>


      {/* -------------------- EXEMPLO DE PROPS -------------------- */}
      <h1>Exemplo de Props</h1>
      <Filho nome="Maria" idade={25} />
      {/* Agora os props funcionam pois existe apenas um App */}
      
    </div>
  );
}


// Exportando apenas UMA função App (a correta)
export default App;
