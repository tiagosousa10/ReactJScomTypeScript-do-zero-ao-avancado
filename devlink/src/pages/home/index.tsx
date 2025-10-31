import { useState, useEffect } from "react";
import { Social } from "../../components/Social";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinksProps {
  facebook: string;
  youtube: string;
  instagram: string;
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef).then((snapshot) => {
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
    }

    loadLinks();
  }, []);

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            youtube: snapshot.data()?.youtube,
          });
        }
      });
    }

    loadSocialLinks();
  }, []);
  return (
    <div
      className="flex flex-col w-full py-4 items-center justify-center min-h-screen relative"
      style={{
        background:
          "linear-gradient(135deg, #f8f9fa 0%, #ffffff 25%, #f5f5f5 50%, #fafafa 75%, #ffffff 100%)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Textura granulada overlay - camada 1 */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0),
            radial-gradient(circle at 6px 6px, rgba(0,0,0,0.05) 1px, transparent 0)
          `,
          backgroundSize: "8px 8px, 12px 12px",
        }}
      />
      {/* Textura granulada overlay - camada 2 para mais profundidade */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(0,0,0,0.02) 0px,
              transparent 1px,
              transparent 2px,
              rgba(0,0,0,0.02) 3px
            )
          `,
          backgroundSize: "1px 4px",
        }}
      />

      <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-2xl p-8 h-auto w-full max-w-md relative z-10 border-2 border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Tiago Sousa</h1>
        <span className="text-gray-600 mb-6">Veja os meus Links! 👇</span>

        <main className="flex flex-col w-full text-center">
          <div className="w-full space-y-3 mb-6">
            {links.length === 0 ? (
              <p className="text-gray-500 py-8">
                Nenhum link disponível no momento.
              </p>
            ) : (
              links.map((link) => (
                <section
                  key={link.id}
                  className="w-full py-3 px-4 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer shadow-sm"
                  style={{ backgroundColor: link.bg }}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <p
                      className="text-sm md:text-base font-medium"
                      style={{ color: link.color }}
                    >
                      {link.name}
                    </p>
                  </a>
                </section>
              ))
            )}
          </div>

          {socialLinks && Object.keys(socialLinks).length > 0 && (
            <footer className="flex justify-center gap-4 pt-4 border-t border-gray-200">
              {socialLinks.facebook && (
                <Social url={socialLinks.facebook}>
                  <div className="p-2 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors">
                    <FaFacebook size={24} color="#14b8a6" />
                  </div>
                </Social>
              )}

              {socialLinks.youtube && (
                <Social url={socialLinks.youtube}>
                  <div className="p-2 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors">
                    <FaYoutube size={24} color="#14b8a6" />
                  </div>
                </Social>
              )}

              {socialLinks.instagram && (
                <Social url={socialLinks.instagram}>
                  <div className="p-2 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors">
                    <FaInstagram size={24} color="#14b8a6" />
                  </div>
                </Social>
              )}
            </footer>
          )}
        </main>
      </div>
    </div>
  );
}
