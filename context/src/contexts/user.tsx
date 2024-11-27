import { createContext, ReactNode, useState} from 'react'

type UserContextData = {
    aluno:string;
    qtdAlunos:number;
    mudaNome: (nome) => void;
} 

interface UserProviderProps{
    children:ReactNode;
}

export const UserContext = createContext({} as UserContextData)


function UserProvider({children} : UserProviderProps){
    const [aluno,setAluno] = useState('Andre Moura')
    const [qtdAlunos,setQtdAlunos] = useState(40)

    function mudaNome(nome:string){
        setAluno(nome)
    }

    return(
        <UserContext.Provider value={{aluno, qtdAlunos,mudaNome}}>
            {children}
        </UserContext.Provider>
    )
}


export default UserProvider
