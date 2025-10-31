import {useState,useEffect} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom'
import {BsInfoCircle} from 'react-icons/bs'

import { API_URL } from '../../config/api'

import styles from './detail.module.css'

interface CoinGeckoDetail {
  id: string;
  name: string;
  symbol: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    fully_diluted_valuation?: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    price_change_percentage_24h: number;
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
    circulating_supply?: number;
    total_supply?: number;
    max_supply?: number;
  };
  market_cap_rank: number;
}

function Detail() {
  const {cripto} = useParams()
  const navigate = useNavigate()

  const [coin,setCoin] = useState<CoinGeckoDetail | null>(null)
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    async function getCoin(){
      try{
        setLoading(true);
        fetch(`${API_URL}/coins/${cripto}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Moeda não encontrada');
          }
          return response.json();
        })
        .then((data : CoinGeckoDetail) => {
          setCoin(data)
          setLoading(false);
        })
        .catch((error) => {
          console.log("erro: ", error)
          navigate("/")
        })

      }catch(e){
        console.log("erro: ",e)
        navigate("/")
      }
    }

    getCoin()
  },[cripto, navigate])


  function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  function formatCompactCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
    }).format(value);
  }

  function formatNumber(value: number) {
    return new Intl.NumberFormat("en-US").format(value);
  }

  function getPricePosition(current: number, low: number, high: number) {
    if (high === low) return 50;
    return ((current - low) / (high - low)) * 100;
  }

  if(loading || !coin){
    return(
      <div className={styles.container}>
        <div className={styles.loading}>Carregando Detalhes...</div>
      </div>
    )
  }

  const marketData = coin.market_data;
  const currentPrice = marketData.current_price.usd;
  const change24h = marketData.price_change_percentage_24h;
  const isPositive = change24h >= 0;
  const low24h = marketData.low_24h.usd;
  const high24h = marketData.high_24h.usd;
  const pricePosition = getPricePosition(currentPrice, low24h, high24h);

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link to="/">Criptomoedas</Link>
        <span> / </span>
        <span>{coin.name} Price</span>
      </nav>

      <div className={styles.mainLayout}>
        {/* Left Section - Information */}
        <div className={styles.leftSection}>
          {/* Coin Header */}
          <div className={styles.coinHeader}>
            <img 
              src={coin.image.large}
              alt={`${coin.name} logo`}
              className={styles.coinLogo}
            />
            <div className={styles.coinTitle}>
              <h1>{coin.name} {coin.symbol.toUpperCase()}</h1>
              <span className={styles.coinRank}>Rank #{coin.market_cap_rank}</span>
            </div>
          </div>

          {/* Price Section */}
          <div className={styles.priceSection}>
            <h2 className={styles.currentPrice}>{formatCurrency(currentPrice)}</h2>
            <div className={styles.priceChange}>
              <span className={isPositive ? styles.changePositive : styles.changeNegative}>
                {isPositive ? '+' : ''}{change24h.toFixed(2)}% (24h)
              </span>
              <BsInfoCircle className={styles.infoIcon} />
            </div>
          </div>

          {/* 24h Range Bar */}
          <div className={styles.rangeBarContainer}>
            <div className={styles.rangeLabels}>
              <span className={styles.rangeLabel}>24h Low</span>
              <span className={styles.rangeLabel}>24h High</span>
            </div>
            <div className={styles.rangeBar}>
              <div className={styles.rangeBarBg}>
                <div 
                  className={styles.rangeBarFill}
                  style={{ width: `${pricePosition}%` }}
                />
                <div 
                  className={styles.rangeIndicator}
                  style={{ left: `${pricePosition}%` }}
                />
              </div>
            </div>
            <div className={styles.rangeValues}>
              <span>{formatCurrency(low24h)}</span>
              <span>{formatCurrency(high24h)}</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className={styles.metricsGrid}>
            <div className={styles.metricItem}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>Market Cap</span>
                <BsInfoCircle className={styles.metricInfoIcon} />
              </div>
              <span className={styles.metricValue}>
                {formatCompactCurrency(marketData.market_cap.usd)}
              </span>
            </div>

            <div className={styles.metricItem}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>Fully Diluted Valuation</span>
                <BsInfoCircle className={styles.metricInfoIcon} />
              </div>
              <span className={styles.metricValue}>
                {marketData.fully_diluted_valuation?.usd 
                  ? formatCompactCurrency(marketData.fully_diluted_valuation.usd)
                  : 'N/A'}
              </span>
            </div>

            <div className={styles.metricItem}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>24 Hour Trading Vol</span>
                <BsInfoCircle className={styles.metricInfoIcon} />
              </div>
              <span className={styles.metricValue}>
                {formatCompactCurrency(marketData.total_volume.usd)}
              </span>
            </div>

            <div className={styles.metricItem}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>Circulating Supply</span>
                <BsInfoCircle className={styles.metricInfoIcon} />
              </div>
              <span className={styles.metricValue}>
                {marketData.circulating_supply 
                  ? `${formatNumber(marketData.circulating_supply)} ${coin.symbol.toUpperCase()}`
                  : 'N/A'}
              </span>
            </div>

            <div className={styles.metricItem}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>Total Supply</span>
                <BsInfoCircle className={styles.metricInfoIcon} />
              </div>
              <span className={styles.metricValue}>
                {marketData.total_supply 
                  ? `${formatNumber(marketData.total_supply)} ${coin.symbol.toUpperCase()}`
                  : 'N/A'}
              </span>
            </div>

            <div className={styles.metricItem}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>Max Supply</span>
                <BsInfoCircle className={styles.metricInfoIcon} />
              </div>
              <span className={styles.metricValue}>
                {marketData.max_supply 
                  ? `${formatNumber(marketData.max_supply)} ${coin.symbol.toUpperCase()}`
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Section - Chart Placeholder */}
        <div className={styles.rightSection}>
          <div className={styles.chartPlaceholder}>
            <div className={styles.chartHeader}>
              <h3>Gráfico de Preços</h3>
              <p>Integração de gráfico em desenvolvimento</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
  
  export default Detail
