import {useState,useEffect, useRef, useMemo,useCallback} from 'react'



export default function App(){
  const inputRef = useRef<HTMLInputElement>(null)
  const firstRender = useRef(true)
  //                              ----useStates----
  const [input,setInput] = useState('')
  const [tasks,setTasks] = useState<string[]>([])
  const [editTask,setEditTask] = useState({
    enabled:false,
    task:''
  })


useEffect(() => {
    const tarefasSalvas = localStorage.getItem('@cursoreact')

    if(tarefasSalvas){
      setTasks(JSON.parse(tarefasSalvas))
    }
  },[])

  useEffect(() => {
    if(firstRender.current){
      firstRender.current = false;
      return
    }
    localStorage.setItem('@cursoreact', JSON.stringify(tasks))
    console.log('useEffect foi chamado')

  }, [tasks])


//                              ----funcoes----
  const handleRegister = useCallback(() => {
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
  },[input,tasks])


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
    inputRef.current?.focus()
    setInput(item)
    setEditTask({
      enabled:true,
      task:item
    })
  }



const totalTarefas = useMemo(() => {
  return tasks.length
}, [tasks])

//                              ----return----

  return(
    <div>
      <h1>Lista de Tarefas</h1>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Digite o nome da tarefa'
        ref={inputRef} 
        />
      <button onClick={handleRegister}>
        {editTask.enabled ? 'Atualizar Tarefa' : 'Adicionar Tarefa'}
      </button>

      <hr/>

      <strong>Voce tem {totalTarefas} tarefas</strong>
      <br/> <br/>

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

