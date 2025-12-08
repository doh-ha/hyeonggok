import { Link, useLocation } from "react-router-dom";
import "./Layout.css";

function Layout({ children }) {
  const location = useLocation();

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="logo">확통으로 사냥하기</h1>
          <ul className="nav-menu">
            <li>
              <Link to="/quiz" className={location.pathname === "/quiz" ? "active" : ""}>
                퀴즈 풀기
              </Link>
            </li>
            <li>
              <Link to="/shop" className={location.pathname === "/shop" ? "active" : ""}>
                아이템 구매
              </Link>
            </li>
            <li>
              <Link to="/upgrade" className={location.pathname === "/upgrade" ? "active" : ""}>
                아이템 강화
              </Link>
            </li>
            <li>
              <Link to="/battle" className={location.pathname === "/battle" ? "active" : ""}>
                전투
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="main-content">{children}</main>
    </div>
  );
}

export default Layout;
