import {Header} from './components/header'
import {Aluno} from './components/aluno'
import {Footer} from './components/footer'

export default function App(){
  return(
    <div>
      <Header title="Curso React + Typescript"/>
      <h1>Meu projeto</h1>
      <Aluno nome="Andre" idade={15} />
      <Aluno nome="Teste" idade={30}/>
      <Footer/>

    </div>
  )
}


