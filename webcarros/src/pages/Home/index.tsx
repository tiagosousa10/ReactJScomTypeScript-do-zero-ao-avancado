import {useState,useEffect} from 'react'
import { Container } from "../../components/Container";
import {collection,query,getDocs,orderBy, where} from 'firebase/firestore'
import {db} from '../../services/firebaseConnection'
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Skeleton } from '../../components/ui/skeleton';
import { Spinner } from '../../components/ui/spinner';
import { Combobox, ComboboxOption } from '../../components/ui/combobox';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../components/ui/carousel';
import { Button } from '../../components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/input';

interface CarProps{
    id:string,
    name:string,
    year:string,
    uid:string,
    price:string | number,
    city:string,
    km:string,
    images: CarImageProps[]
}

interface CarImageProps{
    name:string,
    uid:string,
    url:string
}

export function Home(){
    const [ cars,setCars] = useState<CarProps[]>([])
    const [loading, setLoading] = useState(true)
    const [input,setInput] = useState('')
    const [selectedBrand, setSelectedBrand] = useState<string>('')
    const [selectedKm, setSelectedKm] = useState<string>('')

    useEffect(() => {
        loadCars()
    }, [])

    function loadCars(){
        setLoading(true)
        const carsRef = collection(db,'cars')
        const queryRef = query(carsRef, orderBy('created', 'desc'))
    
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
            setLoading(false)
        })
        .catch(() => {
            setLoading(false)
        })
    }

    async function handleSearchCar(){
        if(input === '' && selectedBrand === '' && selectedKm === ''){
            loadCars()
            return;
        }

        setLoading(true)
        setCars([])

        let q = query(collection(db,'cars'))
        
        if(input){
            q = query(q, 
                where('name', '>=', input.toUpperCase()),
                where('name','<=',input.toUpperCase() + '\uf8ff')
            )
        }

        const querySnapshot = await getDocs(q)
        const listCars = [] as CarProps[]
        
        querySnapshot.forEach((doc) => {
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

        let filteredCars = listCars

        // Filtros adicionais podem ser aplicados aqui
        if(selectedKm){
            const kmValue = parseInt(selectedKm)
            filteredCars = filteredCars.filter(car => {
                const carKm = parseInt(car.km.replace(/[^\d]/g, ''))
                return carKm <= kmValue
            })
        }

        setCars(filteredCars)
        setLoading(false)
    }

    // Extrair marcas únicas dos carros
    const brands = Array.from(new Set(cars.map(car => car.name.split(' ')[0])))
        .sort()
        .map(brand => ({ value: brand, label: brand }))

    const kmOptions: ComboboxOption[] = [
        { value: '50000', label: 'Até 50.000 km' },
        { value: '100000', label: 'Até 100.000 km' },
        { value: '150000', label: 'Até 150.000 km' },
        { value: '200000', label: 'Até 200.000 km' },
    ]

    return(
        <Container>
            <div className="py-6 md:py-8 space-y-6 md:space-y-8">
                {/* Search and Filters Section */}
                <section className="bg-white p-4 md:p-6 rounded-lg shadow-sm max-w-5xl mx-auto">
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input 
                                    type="text" 
                                    placeholder="Digite o nome do carro..." 
                                    className="pl-10 w-full"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearchCar()}
                                />
                            </div>
                            <Button onClick={handleSearchCar} className="w-full sm:w-auto">
                                <Search className="mr-2 h-4 w-4" />
                                Pesquisar
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Combobox
                                options={brands.length > 0 ? brands : [{ value: '', label: 'Nenhuma marca disponível' }]}
                                value={selectedBrand}
                                onValueChange={setSelectedBrand}
                                placeholder="Filtrar por marca..."
                                className="w-full"
                            />
                            <Combobox
                                options={kmOptions}
                                value={selectedKm}
                                onValueChange={setSelectedKm}
                                placeholder="Filtrar por quilometragem..."
                                className="w-full"
                            />
                        </div>
                    </div>
                </section>

                {/* Title */}
                <h1 className="font-bold text-center text-2xl md:text-3xl text-foreground">
                    Carros novos e usados em Portugal
                </h1>

                {/* Cars Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[...Array(6)].map((_, i) => (
                            <Card key={i} className="overflow-hidden">
                                <Skeleton className="h-64 w-full" />
                                <CardHeader>
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-8 w-1/3" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : cars.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">Nenhum carro encontrado.</p>
                    </div>
                ) : (
                    <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {cars.map((car) => (
                            <Link key={car.id} to={`/car/${car.id}`} className="group">
                                <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    <div className="relative aspect-video overflow-hidden bg-muted">
                                        {car.images && car.images.length > 0 ? (
                                            <Carousel className="w-full h-full">
                                                <CarouselContent>
                                                    {car.images.map((image, idx) => (
                                                        <CarouselItem key={idx}>
                                                            <img 
                                                                src={image.url}
                                                                alt={car.name}
                                                                className="w-full h-64 object-cover"
                                                            />
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                                {car.images.length > 1 && (
                                                    <>
                                                        <CarouselPrevious className="left-2" />
                                                        <CarouselNext className="right-2" />
                                                    </>
                                                )}
                                            </Carousel>
                                        ) : (
                                            <Skeleton className="w-full h-64" />
                                        )}
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-xl line-clamp-1 group-hover:text-primary transition-colors">
                                            {car.name}
                                        </CardTitle>
                                        <p className="text-sm text-muted-foreground">
                                            {car.year} | {car.km} km
                                        </p>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="flex items-baseline gap-2">
                                            <strong className="text-2xl font-bold text-foreground">
                                                {car.price}€
                                            </strong>
                                        </div>
                                        <div className="pt-2 border-t">
                                            <span className="text-sm text-muted-foreground">{car.city}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </main>
                )}
            </div>
        </Container>
    )
}
