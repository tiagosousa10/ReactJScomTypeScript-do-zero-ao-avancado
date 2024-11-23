import {Link} from 'react-router-dom'


export function Home(){
    return(
        <div>
            <h1>Bem vindo ao HOME!</h1>
            <span>primeiraPagina de Navegaçao</span>
            <hr/>

            <Link to="/sobre">Sobre</Link> 
            <br/>
            <Link to="/contato">Contatos</Link>
        </div>
    )
}
