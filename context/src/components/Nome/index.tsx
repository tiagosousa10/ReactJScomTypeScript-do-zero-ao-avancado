import {useContext} from 'react'
import {UserContext} from '../../contexts/user'

export function Nome(){
    const {aluno} = useContext(UserContext)

    return(
        <div>
            <h1>Aluno: {aluno}</h1>
            <br/>
           
        </div>
    )
}
