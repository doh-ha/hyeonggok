import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import QuizPage from "./pages/QuizPage";
import ItemPage from "./pages/ItemPage";
import UpgradePage from "./pages/UpgradePage";
import BattlePage from "./pages/BattlePage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<BattlePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/shop" element={<ItemPage />} />
          <Route path="/upgrade" element={<UpgradePage />} />
          <Route path="/battle" element={<BattlePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
