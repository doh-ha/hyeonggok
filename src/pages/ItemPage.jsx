import "./ItemPage.css";

function ShopPage() {
  // 코인 컨텍스트에서 코인 관련 함수들을 가져옵니다
  const { coins, spendCoins, hasEnoughCoins } = useCoins();
  // 구매한 아이템을 저장하는 상태
  const [ownedItems, setOwnedItems] = useState(() => {
    // localStorage에서 구매한 아이템 목록을 불러옵니다
    const saved = localStorage.getItem("ownedItems");
    return saved ? JSON.parse(saved) : [];
  });

  // 아이템 가격 정의 (아이템 ID별로 가격 설정)
  const itemPrices = {
    1: 100, // 확률의 주사위
    2: 200, // 통계의 안경
    3: 500, // 조합의 검
    4: 500, // 순열의 방패
    5: 500, // 기대값의 반지
  };

  // 아이템 구매 함수
  const handleBuyItem = (itemId) => {
    const price = itemPrices[itemId];

    // 이미 구매한 아이템인지 확인
    if (ownedItems.includes(itemId)) {
      alert("이미 구매한 아이템입니다!");
      return;
    }

    // 코인이 충분한지 확인
    if (!hasEnoughCoins(price)) {
      alert("코인이 부족합니다!");
      return;
    }

    // 코인 차감
    spendCoins(price);

    // 구매한 아이템 목록에 추가
    const newOwnedItems = [...ownedItems, itemId];
    setOwnedItems(newOwnedItems);

    // localStorage에 저장
    localStorage.setItem("ownedItems", JSON.stringify(newOwnedItems));

    // 아이템 강화 레벨 초기화 (새로 구매한 아이템은 레벨 1)
    const savedLevels = localStorage.getItem("itemLevels");
    const itemLevels = savedLevels ? JSON.parse(savedLevels) : {};
    itemLevels[itemId] = 1;
    localStorage.setItem("itemLevels", JSON.stringify(itemLevels));

    alert("아이템을 구매했습니다!");
  };

  return (
    <div className="page">
      <h2>아이템 구매</h2>
      <p>아이템을 구매하세요! (보유 코인: {coins})</p>

      {/* 아이템 목록을 표시합니다 */}
      <div className="items-container">
        {/* itemsData 배열의 각 아이템을 순회하면서 카드를 만듭니다 */}
        {itemsData.map((item) => {
          const price = itemPrices[item.id];
          const isOwned = ownedItems.includes(item.id);
          const canAfford = hasEnoughCoins(price);

          return (
            <div key={item.id} className="item-card">
              {/* 아이템 아이콘을 표시합니다 */}
              <div className="item-icon">{item.icon}</div>
              {/* 아이템 정보를 표시합니다 */}
              <div className="item-info">
                <h3 className="item-name">{item.name}</h3>
                <div className="item-level">
                  강화 단계: {item.currentLevel} / {item.maxLevel}
                </div>
                <div className="item-price">가격: {price} 코인</div>
                {isOwned && <div className="owned-badge">보유 중</div>}
              </div>
              {/* 구매 버튼을 표시합니다 */}
              <button className={`buy-button ${isOwned ? "owned" : ""} ${!canAfford && !isOwned ? "disabled" : ""}`} onClick={() => handleBuyItem(item.id)} disabled={isOwned || !canAfford}>
                {isOwned ? "보유 중" : canAfford ? "구매" : "코인 부족"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShopPage;
