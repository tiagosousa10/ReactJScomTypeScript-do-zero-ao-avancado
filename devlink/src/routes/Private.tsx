import { ReactNode,useState,useEffect } from 'react'
import {auth} from '../services/firebaseConnection'
import {onAuthStateChanged} from 'firebase/auth'

import {Navigate} from 'react-router-dom'

interface PrivateProps{
    children: ReactNode;
}

export function Private({children} : PrivateProps) : any{

    const [loading,setLoading] = useState(true)
    const [signed,setSigned] = useState(false) //false = nao está logado

   useEffect(() => {

    const unsub = onAuthStateChanged(auth, (user) => {
        if(user){
            const userData = {
                uid:user?.uid,
                email:user?.email
            }

            localStorage.setItem('@reactlinks', JSON.stringify(userData))
            setLoading(false)
            setSigned(true)
        } else{
            setLoading(false)
            setSigned(false)
        }
    })

    //para limpar = cleanUp
    return () => {
        unsub();
    }
   },[])

   if(loading){
    return <div></div>
   }

   if(!signed){ //se nao estiver logado redirecionar sempre para a page LOGIN!
    return <Navigate to={"/login"}   />
   }

    return children;
}
