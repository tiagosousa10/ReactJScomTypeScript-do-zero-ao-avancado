import { useState } from 'react'
import './App.css'

import logoImg from './assets/logo.png'


function App() {

  return (
  <div>
    <main className='container'>
      <img src={logoImg}  className='logo' alt='Logo da calculdora' />

      <h1 className='title' >Qual a melhor opção?</h1>

      <form className='form'>
        <label htmlFor="">Alcool (preço por litro) : </label>
        <input 
          type="number" 
          className='input'
          placeholder='4,90' min='1' 
          step={'0.01'}
          required 
          />

        <label htmlFor="">Gasolina (preço por litro) : </label>
        <input 
          type="number" 
          className='input'
          placeholder='4,90' min='1' 
          step={'0.01'}
          required 
          />

          <input  className='button' type='submit' value={'Calcular'} />
      </form>
    </main>

  </div>
  )
}

export default App
