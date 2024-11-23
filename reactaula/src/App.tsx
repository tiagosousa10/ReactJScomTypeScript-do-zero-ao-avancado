import { useState } from 'react'
import logoImg from './assets/logo.png'
import './App.css'



function App() {
  const [textoFrase,setTextoFrase] = useState('')
  const [categoriaSelecionada,setCategoriaSelecionada] = useState(0)


  const allFrases = [
    {
    id:1,
    nome:'Motivacao',
    frases:[
      'Siga os bons e aprenda com eles',
      'o bom-senso vale mais do que muito conhecimento',
      'mais uma frase de motivacao'
    ]
  },
  {
    id:2,
    nome:'Bom dia',
    frases:[
      'Acordar de bem com a vida é o primeiro passo para ter um dia abençoado',
      'Bom dia familia',
      'Escreva no seu coraçao'
    ]
  },
  {
    id:3,
    nome:'Boa Noite',
    frases:[
      'Boa noite, durma bem',
      'Bom Noite EHEHE wadwadwa',
    ]
  }
]

function  handleSwitchCategory(index:number){
  setCategoriaSelecionada(index)
  }

function gerarFrase(){
    const numeroAleatorio = Math.floor(Math.random() * allFrases[categoriaSelecionada].frases.length)

    setTextoFrase(`"${allFrases[categoriaSelecionada].frases[numeroAleatorio]}"`)
  }

  return (
      <div className='container'>
        <img src={logoImg} alt='logo-frases'/>

        <h2 className='title'>Categorias</h2>

        <section className='category-area'>
        {allFrases.map((item,index) => (
                    <button 
                    key={item.id} 
                    className='category-button'
                    style={{borderWidth: item.nome === allFrases[categoriaSelecionada].nome ? 2 : 0,borderColor:"#1fa4db" }}                                          
                    onClick={() => handleSwitchCategory(index)}
                    >{item.nome}</button>
        ))}
          </section>


        <button className='button-frase' onClick={() => gerarFrase()}>Gerar Frase</button>

        {textoFrase !== '' && <p className='textoFrase'>{textoFrase}</p>
      }
      </div>
  )
}

export default App
