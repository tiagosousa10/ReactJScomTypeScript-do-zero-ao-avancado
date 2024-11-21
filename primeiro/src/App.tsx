import React,{useState} from "react"

export default function App(){
  const [input,setInput] = useState('')
  const [aluno,setAluno] = useState('sem nada')
  const [idade,setIdade] = useState('')

  function mostrarAluno(){
    setAluno(input)
    console.log(idade)
  }



  return(
    <div>

    <h1>Conhecendo useState</h1>

    <input 
    type="text"
     placeholder="Digite o nome" 
     value={input}
     onChange={(e) => setInput(e.target.value)} />
  <br/>  <br/>
     <input placeholder="Digite a idade" value={idade} onChange={(e) => setIdade(e.target.value)} />

    <br/>

    <button onClick={mostrarAluno}>Mostrar Aluno</button>

    <hr/>

    <h3>Bem vindo {aluno}</h3>
    </div>
  )
}


