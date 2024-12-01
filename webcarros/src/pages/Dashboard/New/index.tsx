import { ChangeEvent, useState, useContext } from "react";
import { Container } from "../../../components/Container";
import { PanelHeader } from "../../../components/PanelHeader";

import {FiUpload, FiTrash} from 'react-icons/fi'
import {useForm} from 'react-hook-form'
import {Input} from '../../../components/Input'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import {AuthContext} from '../../../contexts/AuthContext'
import {v4 as uuidV4} from 'uuid'

import {storage,db} from '../../../services/firebaseConnection'
import {addDoc,collection} from 'firebase/firestore'
import {ref,uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage'
import toast from "react-hot-toast";


const schema = z.object({
    name:z.string().nonempty('O campo nome é obrigatorio'),
    model: z.string().nonempty('O modelo é obrigatorio'),
    year: z.string().nonempty('O ano do carro é obrigatorio'),
    km:z.string().nonempty('O KM é obrigatorio'),
    price: z.string().nonempty('O preço é obrigatorio'),
    city:z.string().nonempty('A cidade obrigatorio'),
    whatsapp: z.string().min(1,'O telefone é obrigatorio').refine((value) => /(\d{11,12})$/.test(value) , {
        message:'Numero de telemovel Invalido!'
    }),
    description:z.string().nonempty('A descricao é obrigatorio')
})

type FormData = z.infer<typeof schema>

interface ImageItemProps{
    uid:string,
    name:string,
    previewUrl:string,
    url:string
}

export function New(){
    const [carImages,setCarImages] = useState<ImageItemProps[]>([])
    const {user} = useContext(AuthContext)
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode:'onChange'
    })


    function onSubmit(data:FormData){
        if(carImages.length === 0){
            toast.error('Envie pelo menos 1 imagem.')
            return;
        }

        const carListImages = carImages.map((car) => {
            return{
                uid:car.uid,
                name:car.name,
                url:car.url
            }
        })

        addDoc(collection(db,'cars'), { //adicionar na base dados
            name:data.name.toUpperCase(),
            model:data.model,
            whatsapp:data.whatsapp,
            city:data.city,
            year:data.year,
            km:data.km,
            price: data.price,
            description: data.description,
            created: new Date(),
            owner: user?.name,
            uid:user?.uid,
            images: carListImages,
        })
        .then(() => {
            reset();
            setCarImages([])
            console.log('cadastrado com sucesso!')
            toast.success('Carro cadastrado com sucesso!')
        })
        .catch((e) => {
            console.log('error' + e)
        })

    }

    async function handleFile(e:ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0]

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                await handleUpload(image)

            } else{
                alert('Envie uma imagem JPEG ou PNG!')
                return;
            }
        }
    }

    async function handleUpload(image:File){
        if(!user?.uid){
            return;
        }

        const currentUid = user?.uid;
        const uidImage = uuidV4() // gerar um uid aleatorio

        const updaloadRef = ref(storage, `images/${currentUid}/${uidImage}`) // referencia onde quero guardar as imagens na BASE DADOS
        
        uploadBytes(updaloadRef, image)// envia para a referencia a image
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadUrl) => {
                const imageItem = {
                    name:uidImage,
                    uid:currentUid,
                    previewUrl: URL.createObjectURL(image),
                    url:downloadUrl
                }

                setCarImages((oldImages) => [...oldImages,imageItem])
                toast.success('Imagem cadastrada com sucesso!')
            })
        })
    }

   async function handleDeleteImage(item:ImageItemProps){
     const imagePath = `images/${item.uid}/${item.name}`  
     
     const imageRef = ref(storage, imagePath)

     try{
        await deleteObject(imageRef)
        setCarImages(carImages.filter((car) => car.url !== item.url))
     }catch(e){
        console.log('erro ao elimniar' + e)
     }
    }



    return(
        <Container>
            <PanelHeader/>

            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
                <button 
                    className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
                    <div className="absolute cursor-pointer">
                        <FiUpload size={30} color="#000"  />
                    </div>
                    <div className="cursor-pointer">
                        <input 
                            type="file"
                            accept="image/**" 
                            className="opacity-0 cursor-pointer" 
                            onChange={handleFile}/>
                    </div>
                </button>

                {carImages.map((item) => (
                    <div key={item.name} className="w-full h-32 flex items-center justify-center relative ">
                        <button className="absolute" onClick={() => handleDeleteImage(item)}>
                            <FiTrash size={28} color="#fff"/>
                        </button>
                        <img src={item.previewUrl} className="rounde-lg h-32 object-cover" alt="fotoCarro"/>
                    </div>
                ))}
            </div>


            <div className="w-full bg-white p-3 rounded-lg flex-col flex sm:flex-row items-center gap-2 mt-2">
                <form className="w-full" onClick={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <p className="mb-2 font-medium">Nome do carro</p>
                        <Input 
                            type="text"  
                            register={register} 
                            name="name" error={errors.name?.message} 
                            placeholder="Ex. Onix 1.0..."     />
                    </div>

                    <div className="mb-3">
                        <p className="mb-2 font-medium">Modelo do carro</p>
                        <Input 
                            type="text"  
                            register={register} 
                            name="model" 
                            error={errors.model?.message} 
                            placeholder="Ex. 1.0 flex PLUS Manual..."     />
                    </div>

                    <div className="flex w-full mb-3 flex-row items-center gap-4">
                    <div className="w-full">
                        <p className="mb-2 font-medium">Ano do carro</p>
                        <Input 
                        type="text" 
                         register={register} 
                         name="year" 
                         error={errors.year?.message}
                          placeholder="Ex. 2016/2016..."     />
                    </div>

                    <div className="w-full">
                        <p className="mb-2 font-medium">KM do carro</p>
                        <Input 
                        type="text" 
                         register={register} 
                         name="km" 
                         error={errors.km?.message}
                          placeholder="Ex. 23.555..."     />
                    </div>
                    </div>

                    <div className="flex w-full mb-3 flex-row items-center gap-4">
                    <div className="w-full">
                        <p className="mb-2 font-medium">Telefone / Whatsapp</p>
                        <Input 
                        type="text" 
                         register={register} 
                         name="whatsapp" 
                         error={errors.whatsapp?.message}
                          placeholder="Ex. 351917381333..."     />
                    </div>

                    <div className="w-full">
                        <p className="mb-2 font-medium">Cidade</p>
                        <Input 
                        type="text" 
                         register={register} 
                         name="city" 
                         error={errors.city?.message}
                          placeholder="Ex. Porto..."     />
                    </div>
                    </div>

                    <div className="mb-3">
                        <p className="mb-2 font-medium">Preço</p>
                        <Input 
                            type="text"  
                            register={register} 
                            name="price" error={errors.price?.message} 
                            placeholder="Ex. 93.000..."     />
                    </div>

                    <div className="mb-3">
                        <p className="mb-2 font-medium">Descricao</p>
                        <textarea 
                            className="border-2 w-full rounded-md h-24 px-2" 
                            {...register("description")} 
                            name="description" 
                            id="description" 
                            placeholder="Digite a descricao completa do carro..."
                            />
                            {errors.description && <p className="mb-1 text-red-500"> {errors.description.message} </p>}

                    </div>

                    <button type="submit" className="rounded-md bg-zinc-900 text-white font-medium w-full h-10">
                        Adicionar
                    </button>
                </form>
            </div>

        </Container>
    )
}
