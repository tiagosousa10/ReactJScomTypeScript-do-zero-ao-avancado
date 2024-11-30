import { useEffect, useState, useContext } from "react"
import { Container } from "../../components/Container"
import { PanelHeader } from "../../components/PanelHeader"

import { FiTrash2} from'react-icons/fi'

import {collection,getDocs,where, query} from 'firebase/firestore'
import {db} from '../../services/firebaseConnection'

import {AuthContext} from '../../contexts/AuthContext'

interface CarProps{
    id:string,
    name:string,
    year:string,
    price:string | number,
    city:string,
    km:string,
    images: ImageCarProps[],
    uid:string
}

interface ImageCarProps{
    name:string,
    uid:string,
    url:string
}

export function Dashboard(){
    const [cars,setCars] = useState<CarProps[]>([])
    const {user} = useContext(AuthContext)

    useEffect(() => {
        function loadCars(){
            if(!user?.uid){
                return;
            }

            const carsRef = collection(db,'cars')
            const queryRef = query(carsRef, where('uid', '==', user.uid))
            getDocs(queryRef)
            .then((snapshot) => {
                const listCars = [] as CarProps[]

                snapshot.forEach((doc) => {
                    listCars.push({
                        id:doc.id,
                        name:doc.data().name,
                        year:doc.data().year,
                        km:doc.data().km,
                        city:doc.data().city,
                        price:doc.data().price,
                        images:doc.data().images,
                        uid: doc.data().uid
                    })
                })

                setCars(listCars)
            })
        }

        loadCars()
    }, [user])



    return(
        <Container>
            <PanelHeader/>
            <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                <section className="w-full bg-white rounded-lg relative">
                    <button 
                    onClick={() => {}}
                    className="absolute px-3 bg-white w-14 h-14 rounded-full items-center justify-center right-2 top-2 drop-shadow">
                        <FiTrash2 size={26} color="#000"/>
                    </button>

                    <img  
                    className="w-full rounded-lg mb-2 max-h-70 " 
                    src="https://firebasestorage.googleapis.com/v0/b/webcarros-784f0.firebasestorage.app/o/images%2FMDZTGkLor5ZO2YWPny6bRmUu12p2%2F10a37b43-ffa1-4834-bce9-429b96fad117?alt=media&token=fe7ba021-a75c-4ea4-ab09-b74fec4bb3f8" />
                    <p className="font-bold mt-1 px-2 mb-2">Nissa vera</p>

                    <div className="flex flex-col px-2">
                       <span className="text-zinc-700">
                        Ano 2016/2016 | 230.000 km
                        </span>
                        <strong className="text-black font-bold mt-4">
                            150.000$</strong> 
                    </div>

                    <div className="w-full h-px bg-slate-200 my-2"></div>

                    <div className="px-2 pb-2">
                        <span className="text-black">Campo grande</span>
                    </div>

                </section>
            </main>

        </Container>
    )
}
