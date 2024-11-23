import {Link} from 'react-router-dom'

export function Sobre(){
    return(
        <div>
            <h1>PAgina  SOBRE</h1>
            <hr/>
            <Link to={"/"}>Home</Link>
            <br/>
            <Link to="/contato">Contatos</Link>
        </div>
    )
}
