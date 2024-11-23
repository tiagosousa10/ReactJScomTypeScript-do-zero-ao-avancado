import {Link} from 'react-router-dom'

export function Home(){
    return(
        <div>
            <h1>Bem vindo ao HOME!</h1>
            <span>primeiraPagina de Navegaçao</span>
            <br/>

            <Link to={"/sobre"}>Sobre</Link>
        </div>
    )
}
