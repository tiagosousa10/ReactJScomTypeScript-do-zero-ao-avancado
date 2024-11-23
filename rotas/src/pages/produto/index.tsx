import {useParams} from 'react-router-dom'

export function Produto(){
    const {id} = useParams()

    return(
        <div>
            <h1>Bem vindo ao PRODUTO {id}</h1>
        </div>
    )
}
