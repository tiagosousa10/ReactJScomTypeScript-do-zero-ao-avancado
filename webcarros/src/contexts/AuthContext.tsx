import {ReactNode,createContext,useState,useEffect} from 'react'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from '../services/firebaseConnection'

interface AuthProviderProps {
    children: ReactNode;
}


type AuthContextData = {
 signed:boolean;
 loadingAuth:boolean;
}


interface UserProps{
    uid:string,
    name:string | null,
    email: string| null
}

export const AuthContext = createContext({} as AuthContextData)



function AuthProvider( { children } : AuthProviderProps){
    const [user,setUser] = useState<UserProps | null>(null) // comeca com false
    const [loadingAuth,setLoadingAuth] = useState(true)


    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                //tem user logado
                setUser({
                    uid:user.uid,
                    name:user?.displayName,
                    email:user?.email
                })

                setLoadingAuth(false) // para encerrar o loading 

            } else {
                //nao tem user logado
                setUser(null)
                setLoadingAuth(false)
            }
        })


        return () => {
            unsub() // desmontar para nao perder processamento
        }
    }, [])



    return(
        <AuthContext.Provider value={{signed:!!user, loadingAuth}}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthProvider;
