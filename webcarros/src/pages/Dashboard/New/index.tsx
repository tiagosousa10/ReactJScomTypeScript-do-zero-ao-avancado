import { ChangeEvent, useState, useContext } from "react";
import { Container } from "../../../components/Container";
import { PanelHeader } from "../../../components/PanelHeader";

import {FiUpload, FiTrash} from 'react-icons/fi'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import {AuthContext} from '../../../contexts/AuthContext'
import {v4 as uuidV4} from 'uuid'

import {storage,db} from '../../../services/firebaseConnection'
import {addDoc,collection} from 'firebase/firestore'
import {ref,uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage'
import toast from "react-hot-toast";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { Spinner } from '../../../components/ui/spinner';


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
    const [uploading, setUploading] = useState(false)
    const {user} = useContext(AuthContext)
    const form = useForm<FormData>({
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

        addDoc(collection(db,'cars'), {
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
            form.reset();
            setCarImages([])
            toast.success('Carro cadastrado com sucesso!')
        })
        .catch((e) => {
            console.log('error' + e)
            toast.error('Erro ao cadastrar carro.')
        })

    }

    async function handleFile(e:ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0]

            if(image.type === 'image/jpeg' || image.type === 'image/png'){
                await handleUpload(image)

            } else{
                toast.error('Envie uma imagem JPEG ou PNG!')
                return;
            }
        }
    }

    async function handleUpload(image:File){
        if(!user?.uid){
            return;
        }

        setUploading(true)
        const currentUid = user?.uid;
        const uidImage = uuidV4()

        const updaloadRef = ref(storage, `images/${currentUid}/${uidImage}`)
        
        uploadBytes(updaloadRef, image)
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
                setUploading(false)
            })
        })
        .catch(() => {
            toast.error('Erro ao fazer upload da imagem.')
            setUploading(false)
        })
    }

   async function handleDeleteImage(item:ImageItemProps){
     const imagePath = `images/${item.uid}/${item.name}`  
     
     const imageRef = ref(storage, imagePath)

     try{
        await deleteObject(imageRef)
        setCarImages(carImages.filter((car) => car.url !== item.url))
        toast.success('Imagem removida!')
     }catch(e){
        console.log('erro ao elimniar' + e)
        toast.error('Erro ao remover imagem.')
     }
    }



    return(
        <Container>
            <div className="py-6 md:py-8 space-y-6 md:space-y-8">
                <PanelHeader/>

                {/* Image Upload Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Imagens do Carro</CardTitle>
                        <CardDescription>Adicione pelo menos uma imagem do carro</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                            <label className="border-2 border-dashed w-full sm:w-48 rounded-lg flex items-center justify-center cursor-pointer border-primary h-32 hover:bg-accent transition-colors">
                                {uploading ? (
                                    <Spinner />
                                ) : (
                                    <>
                                        <div className="flex flex-col items-center gap-2">
                                            <FiUpload size={30} className="text-primary" />
                                            <span className="text-sm text-muted-foreground">Upload</span>
                                        </div>
                                        <input 
                                            type="file"
                                            accept="image/jpeg,image/png" 
                                            className="hidden" 
                                            onChange={handleFile}
                                            disabled={uploading}
                                        />
                                    </>
                                )}
                            </label>

                            <div className="flex flex-wrap gap-3 flex-1">
                                {carImages.map((item) => (
                                    <div key={item.name} className="relative group w-32 h-32 rounded-lg overflow-hidden border">
                                        <button 
                                            className="absolute top-1 right-1 z-10 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity" 
                                            onClick={() => handleDeleteImage(item)}
                                        >
                                            <FiTrash size={16} />
                                        </button>
                                        <img 
                                            src={item.previewUrl} 
                                            className="w-full h-full object-cover" 
                                            alt="Preview"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Form Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Informações do Carro</CardTitle>
                        <CardDescription>Preencha todos os campos abaixo</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome do carro</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex. Onix 1.0..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="model"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Modelo do carro</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex. 1.0 flex PLUS Manual..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="year"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ano do carro</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ex. 2016/2016..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="km"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>KM do carro</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ex. 23.555..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="whatsapp"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Telefone / Whatsapp</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ex. 351917381333..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cidade</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ex. Porto..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Preço</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Ex. 93.000..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descrição</FormLabel>
                                            <FormControl>
                                                <Textarea 
                                                    placeholder="Digite a descricao completa do carro..."
                                                    className="min-h-[100px]"
                                                    {...field} 
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full" size="lg">
                                    Adicionar Carro
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </Container>
    )
}
