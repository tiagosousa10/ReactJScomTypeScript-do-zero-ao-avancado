import { useState, FormEvent, useEffect, useRef, useCallback } from "react";
import styles from "./home.module.css";
import { BsSearch } from "react-icons/bs";
import { BsArrowDown } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";

export interface CoinProps {
  id: string;
  name: string;
  symbol: string;
  priceUsd: number;
  changePercent24Hr: number;
  marketCapUsd: number;
  volumeUsd24Hr: number;
  image?: string;
  market_cap_rank?: number;
  current_price?: number;
  price_change_percentage_24h?: number;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_7d_in_currency?: number;
  market_cap?: number;
  total_volume?: number;
  formatedPrice?: string; //opcional pois nao vem da API
  formatedMarket?: string;
  formatedVolume?: string;
}

function Home() {
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [offset, setOffset] = useState(0);
  const coinsSectionRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const getData = useCallback(async () => {
    const page = Math.floor(offset / 10) + 1;
    fetch(
      `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
    )
      .then((response) => response.json())
      .then((data: CoinProps[]) => {
        const price = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });

        const priceCompact = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
        });

        const formatedResult = data.map((item) => {
          const formated: CoinProps = {
            id: item.id,
            name: item.name,
            symbol: item.symbol,
            priceUsd: item.current_price || 0,
            changePercent24Hr: item.price_change_percentage_24h || 0,
            price_change_percentage_1h_in_currency:
              item.price_change_percentage_1h_in_currency || 0,
            price_change_percentage_7d_in_currency:
              item.price_change_percentage_7d_in_currency || 0,
            marketCapUsd: item.market_cap || 0,
            volumeUsd24Hr: item.total_volume || 0,
            image: item.image,
            market_cap_rank: item.market_cap_rank,
            formatedPrice: price.format(item.current_price || 0),
            formatedMarket: priceCompact.format(item.market_cap || 0),
            formatedVolume: priceCompact.format(item.total_volume || 0),
          };
          return formated;
        });

        setCoins((prevCoins) => {
          const listCoins =
            offset === 0 ? formatedResult : [...prevCoins, ...formatedResult];
          return listCoins;
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, [offset]);

  useEffect(() => {
    getData();
  }, [getData]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (input === "") return;

    // Tenta encontrar o ID da moeda usando a API de busca da CoinGecko
    try {
      const searchTerm = input.toLowerCase().trim();
      const response = await fetch(
        `${API_URL}/search?query=${encodeURIComponent(searchTerm)}`
      );
      const searchData = await response.json();

      if (searchData.coins && searchData.coins.length > 0) {
        // Usa o primeiro resultado da busca
        const coinId = searchData.coins[0].id;
        navigate(`/detail/${coinId}`);
      } else {
        // Se não encontrar, tenta usar o input diretamente como ID
        navigate(`/detail/${searchTerm}`);
      }
    } catch {
      // Em caso de erro, tenta usar o input diretamente
      navigate(`/detail/${input.toLowerCase().trim()}`);
    }
  }

  function handleGetMore() {
    // "carregar mais" - button
    if (offset === 0) {
      // se for a primeira vez
      setOffset(10);
      return;
    }

    setOffset(offset + 10); //caso clique mais vezes
  }

  function scrollToCoins() {
    coinsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function renderChange(value: number) {
    const isPositive = value >= 0;
    const arrow = isPositive ? "▲" : "▼";
    const className = isPositive
      ? styles.changePositive
      : styles.changeNegative;

    return (
      <span className={className}>
        {arrow} {Math.abs(value).toFixed(2)}%
      </span>
    );
  }

  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Explore o Mundo das{" "}
            <span className={styles.heroHighlight}>Criptomoedas</span>
          </h1>
          <p className={styles.heroDescription}>
            Acompanhe em tempo real os preços, tendências e análises das
            principais criptomoedas do mercado. Descubra oportunidades de
            investimento e mantenha-se atualizado com as últimas informações.
          </p>
          <button
            className={styles.scrollButton}
            onClick={scrollToCoins}
            aria-label="Ver criptomoedas"
          >
            <BsArrowDown size={24} />
          </button>
        </div>
      </section>

      {/* Seção de Criptomoedas */}
      <div ref={coinsSectionRef} className={styles.coinsSection}>
        <form action="" className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Digite o nome da moeda... ex. Bitcoin"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <BsSearch size={30} color="#fff" />
          </button>
        </form>

        {/* ---TABELA--- */}
        <div className={styles.tableWrapper}>
          <table className={styles.coinsTable}>
            <thead>
              <tr>
                <th scope="col" className={styles.thCoin}>
                  #
                </th>
                <th scope="col" className={styles.thCoin}>
                  Moeda
                </th>
                <th scope="col" className={styles.thRight}>
                  Preço
                </th>
                <th scope="col" className={styles.thRight}>
                  1h
                </th>
                <th scope="col" className={styles.thRight}>
                  24h
                </th>
                <th scope="col" className={styles.thRight}>
                  7d
                </th>
                <th scope="col" className={styles.thRight}>
                  Volume 24h
                </th>
                <th scope="col" className={styles.thRight}>
                  Market Cap
                </th>
              </tr>
            </thead>
            <tbody id="tbody">
              {coins.length > 0 &&
                coins.map((item) => (
                  <tr className={styles.tableRow} key={item.id}>
                    <td className={styles.rankCell} data-label="#">
                      {item.market_cap_rank || "-"}
                    </td>
                    <td className={styles.coinCell} data-label="Moeda">
                      <Link
                        to={`/detail/${item.id}`}
                        className={styles.coinLink}
                      >
                        <div className={styles.coinInfo}>
                          <img
                            className={styles.coinLogo}
                            alt={`${item.name} logo`}
                            src={item.image || `https://via.placeholder.com/32`}
                          />
                          <div className={styles.coinText}>
                            <span className={styles.coinName}>{item.name}</span>
                            <span className={styles.coinSymbol}>
                              {item.symbol.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className={styles.priceCell} data-label="Preço">
                      {item.formatedPrice}
                    </td>
                    <td className={styles.changeCell} data-label="1h">
                      {renderChange(
                        item.price_change_percentage_1h_in_currency || 0
                      )}
                    </td>
                    <td className={styles.changeCell} data-label="24h">
                      {renderChange(item.changePercent24Hr)}
                    </td>
                    <td className={styles.changeCell} data-label="7d">
                      {renderChange(
                        item.price_change_percentage_7d_in_currency || 0
                      )}
                    </td>
                    <td className={styles.volumeCell} data-label="Volume 24h">
                      {item.formatedVolume}
                    </td>
                    <td
                      className={styles.marketCapCell}
                      data-label="Market Cap"
                    >
                      {item.formatedMarket}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <button className={styles.buttonMore} onClick={handleGetMore}>
          Carregar mais
        </button>
      </div>
    </main>
  );
}

export default Home;
