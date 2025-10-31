import { FormEvent, useState, useEffect } from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaArrowRight } from "react-icons/fa";
import { Header } from "../../components/Header";

import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from "firebase/firestore";

export function Networks() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setFacebook(snapshot.data()?.facebook);
          setInstagram(snapshot.data()?.instagram);
          setYoutube(snapshot.data()?.youtube);
        }
      });
    }

    loadLinks();
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();
    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      youtube: youtube,
    })
      .then(() => {
        console.log("cadastrado com sucesso");
      })
      .catch((e) => {
        console.log("erro ao guardar! : " + e);
      });
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 bg-gray-100">
      <div className="w-full max-w-4xl px-4">
        <Header />
      </div>

      <div className="w-full max-w-4xl px-4 mt-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-wider text-teal-500 font-medium mb-2">
              PREENCHA O FORMULÁRIO PARA CONFIGURAR SUAS REDES SOCIAIS
            </p>
            <h1 className="text-4xl font-bold text-gray-900">Minhas Redes Sociais</h1>
          </div>

          <form className="flex flex-col w-full" onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Link do Facebook
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFacebook className="text-gray-400" size={18} />
                </div>
                <input
                  type="url"
                  placeholder="Digite o url do facebook..."
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Link do Instagram
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaInstagram className="text-gray-400" size={18} />
                </div>
                <input
                  type="url"
                  placeholder="Digite o url do instagram..."
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Link do YouTube
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaYoutube className="text-gray-400" size={18} />
                </div>
                <input
                  type="url"
                  placeholder="Digite o url do youtube..."
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Guardar Links <FaArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
