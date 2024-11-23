import {Link} from 'react-router-dom'

export function NotFound(){
    return(
        <div>
            <h1>A pagina NÃO EXISTE!</h1>
            <Link to="/">Back HOME!</Link>
        </div>
    )
}
