import {Link} from 'react-router-dom'

export function Contato(){
    return(
        <div>
            <h1>Bem vindo aos Contatos!</h1>
            <h3>Telefone: (xx) xxxxxxx-xxx</h3>

            <hr/>

            <Link to="/sobre">Sobre</Link> 
            <br/>
            <Link to="/">Home</Link>
        </div>
    )
}
