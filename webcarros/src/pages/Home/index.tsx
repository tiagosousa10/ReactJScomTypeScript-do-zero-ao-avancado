import { useState, useEffect, useCallback } from "react";
import { Container } from "../../components/Container";
import { collection, query, getDocs, orderBy, where } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import { Combobox, ComboboxOption } from "../../components/ui/combobox";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { Button } from "../../components/ui/button";
import { Search } from "lucide-react";
import { Input } from "../../components/ui/input";

interface CarProps {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  images: CarImageProps[];
}

interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}

export function Home() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedKm, setSelectedKm] = useState<string>("");

  const [initialLoad, setInitialLoad] = useState(true);

  const loadCars = useCallback(async () => {
    setLoading(true);
    const carsRef = collection(db, "cars");
    const queryRef = query(carsRef, orderBy("created", "desc"));

    try {
      const snapshot = await getDocs(queryRef);
      const listCars = [] as CarProps[];

      snapshot.forEach((doc) => {
        listCars.push({
          id: doc.id,
          name: doc.data().name,
          year: doc.data().year,
          km: doc.data().km,
          city: doc.data().city,
          price: doc.data().price,
          images: doc.data().images,
          uid: doc.data().uid,
        });
      });

      setCars(listCars);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, []);

  const handleSearchCar = useCallback(async () => {
    if (input === "" && selectedBrand === "" && selectedKm === "") {
      await loadCars();
      return;
    }

    setLoading(true);
    setCars([]);

    let q = query(collection(db, "cars"));

    if (input) {
      q = query(
        q,
        where("name", ">=", input.toUpperCase()),
        where("name", "<=", input.toUpperCase() + "\uf8ff")
      );
    }

    const querySnapshot = await getDocs(q);
    const listCars = [] as CarProps[];

    querySnapshot.forEach((doc) => {
      listCars.push({
        id: doc.id,
        name: doc.data().name,
        year: doc.data().year,
        km: doc.data().km,
        city: doc.data().city,
        price: doc.data().price,
        images: doc.data().images,
        uid: doc.data().uid,
      });
    });

    let filteredCars = listCars;

    // Filtro por marca
    if (selectedBrand) {
      filteredCars = filteredCars.filter((car) => {
        const carBrand = car.name.split(" ")[0];
        return carBrand === selectedBrand;
      });
    }

    // Filtro por quilometragem
    if (selectedKm) {
      const kmValue = parseInt(selectedKm);
      filteredCars = filteredCars.filter((car) => {
        const carKm = parseInt(car.km.replace(/[^\d]/g, ""));
        return carKm <= kmValue;
      });
    }

    setCars(filteredCars);
    setLoading(false);
  }, [input, selectedBrand, selectedKm, loadCars]);

  useEffect(() => {
    loadCars().then(() => setInitialLoad(false));
  }, [loadCars]);

  // Executar pesquisa quando os filtros mudarem (após o carregamento inicial)
  useEffect(() => {
    if (!initialLoad) {
      handleSearchCar();
    }
  }, [selectedBrand, selectedKm, initialLoad, handleSearchCar]);

  // Extrair marcas únicas dos carros
  const brands = Array.from(new Set(cars.map((car) => car.name.split(" ")[0])))
    .sort()
    .map((brand) => ({ value: brand, label: brand }));

  const kmOptions: ComboboxOption[] = [
    { value: "50000", label: "Até 50.000 km" },
    { value: "100000", label: "Até 100.000 km" },
    { value: "150000", label: "Até 150.000 km" },
    { value: "200000", label: "Até 200.000 km" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop)",
          }}
        />

        {/* Subtle overlay apenas para melhorar legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>

        {/* Hero Content */}
        <div className="relative z-10 w-full">
          <Container>
            <div className="max-w-4xl mx-auto text-center space-y-8 px-4">
              {/* Hero Title */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                  Encontre o Carro dos Seus Sonhos
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">
                  Milhares de carros novos e usados à sua espera
                </p>
              </div>

              {/* Search and Filters Section */}
              <Card className="bg-white/95 backdrop-blur-sm border-2 border-white/50 shadow-2xl p-6 md:p-8">
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B8C4A9] h-4 w-4 z-10" />
                      <Input
                        type="text"
                        placeholder="Digite o nome do carro..."
                        className="pl-10 w-full"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleSearchCar()
                        }
                      />
                    </div>
                    <Button
                      onClick={handleSearchCar}
                      className="w-full sm:w-auto"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Pesquisar
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Combobox
                      options={
                        brands.length > 0
                          ? brands
                          : [{ value: "", label: "Nenhuma marca disponível" }]
                      }
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
              </Card>
            </div>
          </Container>
        </div>
      </section>

      {/* Main Content */}
      <Container>
        <div className="py-8 md:py-12 space-y-6 md:space-y-8">
          {/* Title */}
          <h2 className="font-bold text-center text-2xl md:text-3xl text-[#6FA4AF]">
            Carros novos e usados em Portugal
          </h2>

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
              <p className="text-[#6FA4AF] text-lg">Nenhum carro encontrado.</p>
            </div>
          ) : (
            <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cars.map((car) => (
                <Card
                  key={car.id}
                  className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#D97D55] group focus-within:ring-2 focus-within:ring-[#D97D55] focus-within:ring-offset-2"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#B8C4A9]">
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
                            <CarouselPrevious className="left-2 z-10 bg-white/90 hover:bg-[#D97D55] hover:text-white border-[#B8C4A9] text-[#6FA4AF]" />
                            <CarouselNext className="right-2 z-10 bg-white/90 hover:bg-[#D97D55] hover:text-white border-[#B8C4A9] text-[#6FA4AF]" />
                          </>
                        )}
                      </Carousel>
                    ) : (
                      <Skeleton className="w-full h-64" />
                    )}
                  </div>
                  <Link
                    to={`/car/${car.id}`}
                    className="block focus:outline-none focus:ring-2 focus:ring-[#D97D55] focus:ring-offset-2 rounded-lg"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl line-clamp-1 group-hover:text-[#D97D55] transition-colors text-[#6FA4AF]">
                        {car.name}
                      </CardTitle>
                      <p className="text-sm text-[#B8C4A9]">
                        {car.year} | {car.km} km
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <strong className="text-2xl font-bold text-[#D97D55]">
                          {car.price}€
                        </strong>
                      </div>
                      <div className="pt-2 border-t border-[#B8C4A9]">
                        <span className="text-sm text-[#B8C4A9]">
                          {car.city}
                        </span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </main>
          )}
        </div>
      </Container>
    </div>
  );
}
