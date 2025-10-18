import { createContext, useEffect, useState } from "react";


export const CoinContext = createContext();
    
const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoins = async () => {
    // 注意：请将 '<api-key>' 替换为你的真实 API Key
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`;
    const options = {
      method: 'GET',
      headers: {
        'x-cg-demo-api-key': import.meta.env.VITE_COINGECKO_API_KEY
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setAllCoin(data);
    } catch (error) {
      console.error("Failed to fetch coins:", error);
    }
  };

  useEffect(() => {
    fetchAllCoins();
    const interval = setInterval(()=>{
      fetchAllCoins();
}, 300000); // 改为每 5 分钟 (300000毫秒) 刷新一次
    return ()=>clearInterval(interval); // 组件卸载时清除定时器
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
    );
};

export default CoinContextProvider;
