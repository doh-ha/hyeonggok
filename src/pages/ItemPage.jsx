// CSS 파일을 가져옵니다
import "./ItemPage.css";
// 아이템 데이터를 가져옵니다
import itemsData from "../data/items.json";

function ShopPage() {
  return (
    <div className="page">
      <h2>아이템 구매</h2>
      <p>아이템을 구매하세요!</p>

      {/* 아이템 목록을 표시합니다 */}
      <div className="items-container">
        {/* itemsData 배열의 각 아이템을 순회하면서 카드를 만듭니다 */}
        {itemsData.map((item) => (
          <div key={item.id} className="item-card">
            {/* 아이템 아이콘을 표시합니다 */}
            <div className="item-icon">{item.icon}</div>
            {/* 아이템 정보를 표시합니다 */}
            <div className="item-info">
              <h3 className="item-name">{item.name}</h3>
              <div className="item-level">
                강화 단계: {item.currentLevel} / {item.maxLevel}
              </div>
            </div>
            {/* 구매 버튼을 표시합니다 */}
            <button className="buy-button">구매</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopPage;
