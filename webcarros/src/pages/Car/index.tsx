import {useState,useEffect} from 'react'
import {Container} from '../../components/Container'
import {FaWhatsapp} from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../services/firebaseConnection'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../components/ui/carousel'
import { Button } from '../../components/ui/button'
import { Skeleton } from '../../components/ui/skeleton'

interface CarProps{
    id:string,
    name:string,
    model:string,
    city:string,
    year:string,
    km:string,
    description:string,
    created:string,
    price:string | number,
    owner:string,
    uid:string,
    whatsapp:string,
    images: ImagesCarProps[]
}

interface ImagesCarProps{
    uid:string,
    name:string,
    url:string
}

export function CarDetail(){
    const {id} = useParams()
    const [car, setCar] = useState<CarProps>()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function loadCar(){
            if(!id){
                navigate('/')
                return;
            }

            setLoading(true)
            const docRef = doc(db,'cars',id)
            
            try {
                const snapshot = await getDoc(docRef)

                if(!snapshot.exists() || !snapshot.data()){
                    navigate('/')
                    return;
                }

                setCar({
                    id:snapshot.id,
                    name:snapshot.data()?.name,
                    year:snapshot.data()?.year,
                    city:snapshot.data()?.city,
                    model:snapshot.data()?.model,
                    uid:snapshot.data()?.uid,
                    description:snapshot.data()?.description,
                    created:snapshot.data()?.created,
                    whatsapp:snapshot.data()?.whatsapp,
                    price:snapshot.data()?.price,
                    km:snapshot.data()?.km,
                    owner:snapshot.data()?.owner,
                    images:snapshot.data()?.images,
                })
            } catch (error) {
                console.error('Erro ao carregar carro:', error)
                navigate('/')
            } finally {
                setLoading(false)
            }
        }

        loadCar()
    },[id, navigate])


    if(loading){
        return(
            <Container>
                <div className="py-8 md:py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <Skeleton className="w-full aspect-square rounded-lg" />
                                <Skeleton className="w-full h-48 rounded-lg" />
                            </div>
                            <Skeleton className="w-full h-full min-h-[600px] rounded-lg" />
                        </div>
                    </div>
                </div>
            </Container>
        )
    }

    if(!car){
        return null
    }

    return(
        <Container>
            <div className="py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Coluna Esquerda: Carousel + Contato */}
                        <div className="space-y-6">
                            {/* Carousel de Imagens */}
                            <Card className="overflow-hidden border-2 border-[#B8C4A9] shadow-lg hover:shadow-xl transition-shadow duration-300">
                                {car.images && car.images.length > 0 ? (
                                    <div className="relative w-full">
                                        <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                                            <CarouselContent>
                                                {car.images.map((image, idx) => (
                                                    <CarouselItem key={idx}>
                                                        <div className="relative w-full aspect-square bg-[#B8C4A9] overflow-hidden">
                                                            <img 
                                                                src={image.url} 
                                                                alt={`${car.name} - Imagem ${idx + 1}`}
                                                                className="w-full h-full object-cover"
                                                                loading="lazy"
                                                            />
                                                        </div>
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                            {car.images.length > 1 && (
                                                <>
                                                    <CarouselPrevious className="left-3 bg-white/95 hover:bg-[#D97D55] hover:text-white border-2 border-[#B8C4A9] text-[#6FA4AF] shadow-lg transition-all duration-200 focus:ring-2 focus:ring-[#D97D55] focus:ring-offset-2" />
                                                    <CarouselNext className="right-3 bg-white/95 hover:bg-[#D97D55] hover:text-white border-2 border-[#B8C4A9] text-[#6FA4AF] shadow-lg transition-all duration-200 focus:ring-2 focus:ring-[#D97D55] focus:ring-offset-2" />
                                                </>
                                            )}
                                        </Carousel>
                                    </div>
                                ) : (
                                    <Skeleton className="w-full aspect-square" />
                                )}
                            </Card>

                            {/* Card de Contato */}
                            <Card className="border-2 border-[#B8C4A9] shadow-md hover:shadow-lg transition-shadow duration-200">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl md:text-2xl font-bold text-[#6FA4AF]">
                                        Entre em Contato
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-5">
                                    {car.whatsapp && (
                                        <div className="space-y-2 pb-4 border-b border-[#B8C4A9]">
                                            <p className="text-xs uppercase tracking-wider text-[#B8C4A9] font-semibold">Telefone/WhatsApp</p>
                                            <p className="text-lg text-[#6FA4AF] font-semibold">{car.whatsapp}</p>
                                        </div>
                                    )}

                                    {car.whatsapp && (
                                        <a 
                                            href={`https://api.whatsapp.com/send?phone=${car.whatsapp}&text=Olá! Vi esse ${car.name} no site WebCarros e fiquei interessado!`}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className="block"
                                        >
                                            <Button 
                                                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-base md:text-lg h-14 gap-3 shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 font-semibold"
                                            >
                                                Conversar com vendedor
                                                <FaWhatsapp size={26} />
                                            </Button>
                                        </a>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Coluna Direita: Detalhes do Carro */}
                        <div>
                            <Card className="border-2 border-[#B8C4A9] shadow-md hover:shadow-lg transition-shadow duration-200 h-full">
                                <CardHeader className="pb-6 border-b border-[#B8C4A9]">
                                    <div className="space-y-4">
                                        <div>
                                            <CardTitle className="text-3xl md:text-4xl font-bold text-[#6FA4AF] leading-tight mb-2">
                                                {car.name}
                                            </CardTitle>
                                            {car.model && (
                                                <p className="text-lg md:text-xl text-[#B8C4A9] font-medium">
                                                    {car.model}
                                                </p>
                                            )}
                                        </div>
                                        <div className="pt-2">
                                            <span className="text-3xl md:text-4xl font-bold text-[#D97D55]">
                                                {car.price}€
                                            </span>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-8">
                                    {/* Especificações */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <p className="text-xs uppercase tracking-wider text-[#B8C4A9] font-semibold">Cidade</p>
                                            <p className="text-lg font-bold text-[#6FA4AF]">{car.city}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs uppercase tracking-wider text-[#B8C4A9] font-semibold">Ano</p>
                                            <p className="text-lg font-bold text-[#6FA4AF]">{car.year}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs uppercase tracking-wider text-[#B8C4A9] font-semibold">Quilometragem</p>
                                            <p className="text-lg font-bold text-[#6FA4AF]">{car.km} km</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs uppercase tracking-wider text-[#B8C4A9] font-semibold">Imagens</p>
                                            <p className="text-lg font-bold text-[#6FA4AF]">{car.images?.length || 0}</p>
                                        </div>
                                    </div>

                                    {/* Descrição */}
                                    {car.description && (
                                        <div className="space-y-3 pt-4 border-t border-[#B8C4A9]">
                                            <h3 className="text-xl font-bold text-[#6FA4AF] uppercase tracking-wide">Descrição</h3>
                                            <p className="text-[#6FA4AF] leading-relaxed whitespace-pre-line text-base">
                                                {car.description}
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
