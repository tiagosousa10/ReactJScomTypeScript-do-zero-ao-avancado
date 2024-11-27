import { useState } from 'react'
import {Alunos} from './components/Alunos'
import {Footer}from './components/Footer'
import UserProvider from './contexts/user'


function App() {


  return (
    <UserProvider>

    <div>
      <h1>Escola dev</h1>
      <br/>
      <hr/>

      <Alunos />
    </div>
    

    <Footer/>
    </UserProvider>
  )
}

export default App
