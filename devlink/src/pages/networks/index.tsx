import {FormEvent, useState,useEffect} from 'react'
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import {db} from '../../services/firebaseConnection'
import {
    setDoc,
    doc,
    getDoc
} from 'firebase/firestore'



export function Networks(){
    const [facebook,setFacebook] = useState('')
    const [instagram,setInstagram] = useState('')
    const [youtube,setYoutube] = useState('')
    

    useEffect(() => {
        function loadLinks(){
            const docRef = doc(db,"social","link")
            getDoc(docRef).then((snapshot) => {
                if(snapshot.data() !== undefined){
                    setFacebook(snapshot.data()?.facebook)
                    setInstagram(snapshot.data()?.instagram)
                    setYoutube(snapshot.data()?.youtube)
                }
            })
        }

        loadLinks()
    },[])

    function handleRegister(e:FormEvent){
        e.preventDefault()
        setDoc(doc(db,"social","link"), {
            facebook:facebook,
            instagram:instagram,
            youtube:youtube
        })
        .then(()=> {
            console.log('cadastrado com sucesso')
        })
        .catch((e) => {
            console.log('erro ao guardar! : '+ e)
        })
    }



    return(
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>

            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas Redes Sociais</h1>
                                        {/* ---FORM--- */}
            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Link do facebook</label>
                <Input  
                    type="url" 
                    placeholder="Digite o url do facebook..."
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do Instagram</label>
                <Input  
                    type="url" 
                    placeholder="Digite o url do instagram..."
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do Yotube</label>
                <Input  
                    type="url" 
                    placeholder="Digite o url do youtube..."
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                />

                <button type='submit' className='text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium'>Guardar Links</button>

            </form>
        </div>
    )
}
