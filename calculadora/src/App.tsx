import { useState, FormEvent } from 'react'
import './App.css'

import logoImg from './assets/logo.png'


/* 
--  calculo = alcool / gasolina
--  se menor do que 0.7 compensa usar alcool
*/

interface InfoProps{
  title:string,
  gasolina:string | number,
  alcool:string|number
}

function App() {
  const [alcoolInput,setAlcoolInput] = useState(0)
  const [gasolinaInput,setGasolinaInput] = useState(0)
  const [info,setInfo] = useState<InfoProps>()

  function calcular(event:FormEvent){
    event.preventDefault()

    const calculo = (alcoolInput/gasolinaInput)
    console.log(calculo)

    if(calculo <= 0.7){
      setInfo({
        title:'Compensa usar Alcool',
        gasolina:formatarMoeda(gasolinaInput),
        alcool:formatarMoeda(alcoolInput)
      })
    } else {
      setInfo({
        title:'Compensa usar Gasolina',
        gasolina:formatarMoeda(gasolinaInput),
        alcool:formatarMoeda(alcoolInput)
      })
    }
  }

  function formatarMoeda(valor:number){

    const valorFormatado = valor.toLocaleString("pt-pt",
      {
        style:'currency',
        currency:'EUR'
      }
    )
    return valorFormatado
  }


  return (
  <div>
    <main className='container'>
      <img src={logoImg}  className='logo' alt='Logo da calculdora' />

      <h1 className='title' >Qual a melhor opção?</h1>

      <form className='form' onSubmit={calcular}>
        <label htmlFor="">Alcool (preço por litro) : </label>
        <input 
          type="number" 
          className='input'
          placeholder='4,90' min='1' 
          step={'0.01'}
          required 
          value={alcoolInput}
          onChange={(e) => setAlcoolInput(Number(e.target.value))}
          />

        <label htmlFor="">Gasolina (preço por litro) : </label>
        <input 
          type="number" 
          className='input'
          placeholder='4,90' min='1' 
          step={'0.01'}
          required 
          value={gasolinaInput} 
          onChange={(e) => setGasolinaInput(Number(e.target.value))}
          />

          <input  className='button' type='submit' value={'Calcular'}  />
      </form>

      {info && Object.keys(info).length > 0 && (
          <section className='result'>
          <h2 className='result-title'>Compensa usar  {info.title} </h2>
          <span>Alcool {info.alcool}</span>
          <span>Gasolina {info.gasolina}</span>

        </section>
      )}

    </main>

  </div>
  )
}

export default App
