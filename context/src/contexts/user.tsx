import { createContext, ReactNode, useState} from 'react'

type UserContextData = {
    aluno:string;
    qtdAlunos:number;
    mudaNome: (nome:string) => void;
    novoAluno: () => void;
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

    function novoAluno(){
        setQtdAlunos(alunosAntigos => alunosAntigos +1)
    }

    return(
        <UserContext.Provider value={{aluno, qtdAlunos,mudaNome, novoAluno}}>
            {children}
        </UserContext.Provider>
    )
}


export default UserProvider
