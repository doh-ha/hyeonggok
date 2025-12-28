import { createContext, useContext, useState, useEffect } from "react";

// 코인 컨텍스트 생성
const CoinContext = createContext();

// 코인 컨텍스트를 사용하기 위한 커스텀 훅
export function useCoins() {
  const context = useContext(CoinContext);
  if (!context) {
    throw new Error("useCoins must be used within a CoinProvider");
  }
  return context;
}

// 코인 프로바이더 컴포넌트
export function CoinProvider({ children }) {
  // 코인 상태 관리
  const [coins, setCoins] = useState(0);

  // 컴포넌트가 마운트될 때 localStorage에서 코인을 불러옵니다
  useEffect(() => {
    const savedCoins = localStorage.getItem("coins");
    if (savedCoins) {
      setCoins(parseInt(savedCoins, 10));
    } else {
      localStorage.setItem("coins", "0");
      setCoins(0);
    }
  }, []);

  // 코인 추가 함수
  const addCoins = (amount) => {
    setCoins((prevCoins) => {
      const newCoins = prevCoins + amount;
      localStorage.setItem("coins", newCoins.toString());
      return newCoins;
    });
  };

  // 코인 사용 함수
  const spendCoins = (amount) => {
    setCoins((prevCoins) => {
      if (prevCoins >= amount) {
        const newCoins = prevCoins - amount;
        localStorage.setItem("coins", newCoins.toString());
        return newCoins;
      }
      return prevCoins;
    });
  };

  // 코인이 충분한지 확인하는 함수
  const hasEnoughCoins = (amount) => {
    return coins >= amount;
  };

  const value = {
    coins,
    addCoins,
    spendCoins,
    hasEnoughCoins,
  };

  return <CoinContext.Provider value={value}>{children}</CoinContext.Provider>;
}
