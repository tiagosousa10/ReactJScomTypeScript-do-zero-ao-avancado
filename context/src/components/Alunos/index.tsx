import {useContext} from 'react'
import {UserContext} from '../../contexts/user'
import {Nome} from '../Nome'



export function Alunos( ){
    const {qtdAlunos, mudaNome} = useContext(UserContext)

    return(
        <div>
            <h1>Quantidade de alunos: {qtdAlunos}</h1>
            <Nome />
            <button onClick={() => mudaNome("Tiago")}>Mudar o nome para Tiago</button>
            <br/><br/>

        </div>
    )
}
