import {useState} from 'react'



export default function App(){
  //                              ----useStates----

  const [input,setInput] = useState('')
  const [tasks,setTasks] = useState<string[]>([])
  const [editTask,setEditTask] = useState({
    enabled:false,
    task:''
  })


//                              ----funcoes----
  function handleRegister(){
    if(!input){
      alert('preencha o nome da sua tarefa')
      return;
    }

    if(editTask.enabled){
      handleSaveEdit()
      return
    }

    setTasks(oldTasks => [...oldTasks,input])
    setInput('')
  }

  function handleSaveEdit(){ //editar conforme o index 
    const findIndexTask = tasks.findIndex(task => task === editTask.task)
    const allTasks = [ ...tasks];

    allTasks[findIndexTask] = input;
    setTasks(allTasks)
    
    setEditTask({
      enabled:false,
      task:''
    })

    setInput('')
  }

  function handleDelete(item:string){
    const removeTask = tasks.filter(task => task !== item)
    console.log(removeTask)
    setTasks(removeTask)
  }

  function handleEdit(item:string){
    setInput(item)
    setEditTask({
      enabled:true,
      task:item
    })
  }


//                              ----return----

  return(
    <div>
      <h1>Lista de Tarefas</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Digite o nome da tarefa' />
      <button onClick={handleRegister}>
        {editTask.enabled ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
      </button>
      <hr/>
      {tasks.map((task,index) => (
        <section key={task}>
          <span>{task}</span>
          <button  onClick={() => handleEdit(task)}>Editar</button>
          <button onClick={() => handleDelete(task)}>EXCLUIR</button>
        </section>
      ))}
    </div>
  )
}

