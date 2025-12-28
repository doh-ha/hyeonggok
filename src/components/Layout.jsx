// react-router-dom에서 Link와 useLocation을 가져옵니다
// Link: 페이지 이동을 위한 컴포넌트
// useLocation: 현재 페이지 경로를 알려주는 Hook
import { Link, useLocation } from "react-router-dom";
// 코인 컨텍스트를 가져옵니다
import { useCoins } from "../contexts/CoinContext";
import "./Layout.css";

function Layout({ children }) {
  // 현재 페이지의 경로를 가져옵니다
  const location = useLocation();
  // 코인 컨텍스트에서 현재 코인을 가져옵니다
  const { coins } = useCoins();

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
