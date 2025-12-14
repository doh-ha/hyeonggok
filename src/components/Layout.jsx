// React의 useState와 useEffect를 가져옵니다
import { useState, useEffect } from "react";
// react-router-dom에서 Link와 useLocation을 가져옵니다
// Link: 페이지 이동을 위한 컴포넌트
// useLocation: 현재 페이지 경로를 알려주는 Hook
import { Link, useLocation } from "react-router-dom";
import "./Layout.css";

function Layout({ children }) {
  // 현재 페이지의 경로를 가져옵니다
  const location = useLocation();
  // 보유 코인을 저장하는 상태
  const [coins, setCoins] = useState(0);

  // 컴포넌트가 처음 화면에 나타날 때 실행됩니다
  useEffect(() => {
    // localStorage에서 저장된 코인을 가져옵니다
    const savedCoins = localStorage.getItem("coins");
    if (savedCoins) {
      // 저장된 코인이 있으면 숫자로 변환해서 상태에 저장합니다
      setCoins(parseInt(savedCoins, 10));
    } else {
      // 저장된 코인이 없으면 0으로 초기화합니다
      localStorage.setItem("coins", "0");
      setCoins(0);
    }

    // 코인을 주기적으로 업데이트하는 함수
    const updateCoins = () => {
      const updatedCoins = localStorage.getItem("coins");
      if (updatedCoins) {
        setCoins(parseInt(updatedCoins, 10));
      }
    };

    // 0.5초마다 코인을 확인해서 업데이트합니다
    const interval = setInterval(updateCoins, 500);

    // 컴포넌트가 사라질 때 interval을 정리합니다
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="layout">
      {/* 네비게이션 바 */}
      <nav className="navbar">
        <div className="nav-container">
          {/* 로고 */}
          <h1 className="logo">확통으로 사냥하기</h1>
          <div className="nav-right">
            {/* 보유 코인 표시 */}
            <div className="coin-display">보유 코인: {coins}</div>
            {/* 메뉴 목록 */}
            <ul className="nav-menu">
              <li>
                {/* 퀴즈 풀기 링크 */}
                <Link
                  to="/quiz"
                  className={location.pathname === "/quiz" ? "active" : ""}
                >
                  퀴즈 풀기
                </Link>
              </li>
              <li>
                {/* 아이템 구매 링크 */}
                <Link
                  to="/shop"
                  className={location.pathname === "/shop" ? "active" : ""}
                >
                  아이템 구매
                </Link>
              </li>
              <li>
                {/* 아이템 강화 링크 */}
                <Link
                  to="/upgrade"
                  className={
                    location.pathname === "/upgrade" ? "active" : ""
                  }
                >
                  아이템 강화
                </Link>
              </li>
              <li>
                {/* 전투 링크 */}
                <Link
                  to="/battle"
                  className={
                    location.pathname === "/battle" ? "active" : ""
                  }
                >
                  전투
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* 페이지 내용 */}
      <main className="main-content">{children}</main>
    </div>
  );
}

export default Layout;
