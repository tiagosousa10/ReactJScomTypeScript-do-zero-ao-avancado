import { FormEvent, useState, useEffect } from "react";
import { FiTrash } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";

import { Header } from "../../components/Header";

import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#f1f1f1");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#121212");

  const [links, setLinks] = useState<LinkProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      const lista = [] as LinkProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });

      setLinks(lista);
    });
    //limpar - desmontar - unMount -> caso va para outra pagina e nao precise do recurso
    return () => {
      unsub();
    };
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (nameInput === "" || urlInput === "") {
      alert("Preencha todos os campos!");
      return;
    }

    //criar collection
    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
        console.log("cadastrado com sucesso!");
      })
      .catch((e) => {
        console.log("erro ao cadastrar. " + e);
      });
  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
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
              PREENCHA O FORMULÁRIO PARA CRIAR SEU LINK
            </p>
            <h1 className="text-4xl font-bold text-gray-900">Adicionar Link</h1>
          </div>

          <form
            className="flex flex-col w-full"
            onSubmit={handleRegister}
          >
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Nome do Link
              </label>
              <input
                type="text"
                placeholder="Digite o nome do link..."
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                URL do Link
              </label>
              <input
                type="url"
                placeholder="Digite a url..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Cor do Texto
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={textColorInput}
                  onChange={(e) => setTextColorInput(e.target.value)}
                  className="w-16 h-12 rounded-lg border border-gray-300 cursor-pointer"
                />
                <span className="text-sm text-gray-600">
                  {textColorInput}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Cor de Fundo
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={backgroundColorInput}
                  onChange={(e) => setBackgroundColorInput(e.target.value)}
                  className="w-16 h-12 rounded-lg border border-gray-300 cursor-pointer"
                />
                <span className="text-sm text-gray-600">
                  {backgroundColorInput}
                </span>
              </div>
            </div>

            {nameInput !== "" && (
              <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <label className="block text-gray-700 text-sm font-medium mb-3">
                  Veja como está ficando:
                </label>
                <article
                  className="w-full flex flex-col items-center justify-center rounded-lg px-4 py-3 transition-all"
                  style={{
                    backgroundColor: backgroundColorInput,
                    color: textColorInput,
                  }}
                >
                  <p className="font-medium">{nameInput}</p>
                </article>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Cadastrar <FaArrowRight />
            </button>
          </form>
        </div>
      </div>

      {/* MEUS LINKS */}
      <div className="w-full max-w-4xl px-4 mt-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="font-bold text-gray-900 mb-6 text-2xl">Meus Links</h2>

          {links.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhum link cadastrado ainda.
            </p>
          ) : (
            <div className="space-y-3">
              {links.map((link) => (
                <article
                  key={link.id}
                  className="flex items-center justify-between rounded-lg py-3 px-4 transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: link.bg, color: link.color }}
                >
                  <p className="font-medium">{link.name}</p>
                  <button
                    className="border border-dashed border-gray-400 p-2 rounded bg-white/20 hover:bg-white/30 transition-colors"
                    onClick={() => handleDeleteLink(link.id)}
                  >
                    <FiTrash size={18} color={link.color} />
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
