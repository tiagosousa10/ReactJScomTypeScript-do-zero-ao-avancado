import { useEffect, useState, useContext } from "react";
import { Container } from "../../components/Container";
import { PanelHeader } from "../../components/PanelHeader";

import { FiTrash2 } from "react-icons/fi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";

import {
  collection,
  getDocs,
  where,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../services/firebaseConnection";
import { ref, deleteObject } from "firebase/storage";
import { AuthContext } from "../../contexts/AuthContext";

interface CarProps {
  id: string;
  name: string;
  year: string;
  price: string | number;
  city: string;
  km: string;
  images: ImageCarProps[];
  uid: string;
}

interface ImageCarProps {
  name: string;
  uid: string;
  url: string;
}

export function Dashboard() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    function loadCars() {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user.uid));
      getDocs(queryRef)
        .then((snapshot) => {
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
        })
        .catch(() => {
          setLoading(false);
        });
    }

    loadCars();
  }, [user]);

  async function handleDeleteCar(car: CarProps) {
    const itemCar = car;
    const docRef = doc(db, "cars", itemCar.id);
    await deleteDoc(docRef);

    itemCar.images.map(async (image) => {
      const imagePath = `/images/${image.uid}/${image.name}`;
      const imageRef = ref(storage, imagePath);

      try {
        await deleteObject(imageRef);
        setCars(cars.filter((oldCar) => oldCar.id !== car.id)); // retorna todos os carros diferentes do id recebido
      } catch (err) {
        console.log("erro ao excluir" + err);
      }
    });
  }

  return (
    <Container>
      <div className="py-6 md:py-8 space-y-6 md:space-y-8">
        <PanelHeader />

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
            <p className="text-muted-foreground text-lg">
              Você ainda não possui carros cadastrados.
            </p>
          </div>
        ) : (
          <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <Card
                key={car.id}
                className="relative overflow-hidden group hover:shadow-lg transition-shadow"
              >
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleDeleteCar(car)}
                >
                  <FiTrash2 size={18} />
                </Button>

                <img
                  className="w-full h-64 object-cover"
                  src={car.images[0]?.url || ""}
                  alt={car.name}
                />
                <CardHeader>
                  <CardTitle className="text-xl">{car.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {car.year} | {car.km} km
                  </p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <strong className="text-2xl font-bold">{car.price}€</strong>
                  </div>
                  <div className="pt-2 border-t">
                    <span className="text-sm text-muted-foreground">
                      {car.city}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </main>
        )}
      </div>
    </Container>
  );
}
