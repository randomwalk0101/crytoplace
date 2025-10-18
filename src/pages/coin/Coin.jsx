import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import{ useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import Linechart from '../../components/linechart/Linechart';

const Coin = () => {

   const { id } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET', 
      headers: {
        'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY
      }
    };
    
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options);
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error("Failed to fetch coin data:", error);
    }
  }

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY
      }
    };

    try {
      if (currency.name) {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name}&days=10`, options);
        const data = await response.json();
        setHistoricalData(data);
      }
    } catch (error) {
      console.error("Failed to fetch chart data:", error);
    }
  }

  useEffect(() => {
    fetchCoinData(); // 获取币种基本信息
    fetchHistoricalData(); // 获取图表数据
  }, [id, currency]) // 当 id 或 currency 变化时，重新获取数据

  // 增加健壮性检查：确保数据有效且不是错误对象
   if (coinData && historicalData && !coinData.error && !historicalData.error) {

    return (
      <div className='coin'>
        <div className="coin-name">
          <img src={coinData.image.large} alt="" />
          <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
        </div>
        <div className="coin-chart">
         <Linechart historicalData={historicalData}/>
        </div>

        <div className="coin-info">
           <ul>
            <li>Cryto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
           </ul>

           <ul>
            <li>Current Price</li>
            <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
           </ul>

           <ul>
            <li>Market Cap</li>
            <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
           </ul>

           <ul>
            <li>24h High</li>
            <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
           </ul>

           <ul>
            <li>24h Low</li>
            <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
           </ul>  
            
            

            
        </div>
      </div>
    )
  
  } else {
    return (
      <div className="spinner"></div>
    )
  }
}

export default Coin