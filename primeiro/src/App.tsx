import {useState} from 'react'

export default function App(){
  const[input,setInput] = useState('')
  const [tasks,setTasks] = useState([
    'Estudar React',
    'Jogar a Bola',
    'Fazer o comer'
  ])

  function handleRegister(){
    if(!input){
      alert('preencha o nome da sua tarefa')
      return;
    }

    setTasks(oldTasks => [...oldTasks,input])
    setInput('')
  }
  return(
    <div>
      <h1>Lista de Tarefas</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Digite o nome da tarefa' />
      <button onClick={handleRegister}>Adicionar Tarefa</button>
      <hr/>
      {tasks.map((task,index) => (
        <section key={task}>
          <span>{task}</span>
          <button>EXCLUIR</button>
        </section>
      ))}
    </div>
  )
}

