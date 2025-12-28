import "./BattlePage.css";

function BattlePage() {
  // 보유한 아이템 목록을 저장하는 상태
  const [ownedItems, setOwnedItems] = useState([]);
  // 전투에 사용할 아이템을 선택한 상태
  const [selectedItem, setSelectedItem] = useState(null);
  // 전투가 시작되었는지 여부를 저장하는 상태
  const [battleStarted, setBattleStarted] = useState(false);
  // 전투 결과(승리/패배)를 저장하는 상태 (null은 아직 결과가 없음)
  const [battleResult, setBattleResult] = useState(null);

  // 컴포넌트가 처음 화면에 나타날 때 실행됩니다
  useEffect(() => {
    // localStorage에서 저장된 아이템을 가져옵니다
    const savedItems = localStorage.getItem("ownedItems");
    if (savedItems) {
      // 저장된 아이템이 있으면 JSON 형식으로 변환해서 상태에 저장합니다
      setOwnedItems(JSON.parse(savedItems));
    }
  }, []);

  // 랜덤으로 몬스터를 선택합니다
  const [currentMonster] = useState(monstersData[Math.floor(Math.random() * monstersData.length)]);

  // 전투 시작 버튼을 클릭했을 때 실행되는 함수
  const handleStartBattle = () => {
    // 아이템이 선택되지 않았으면 함수를 종료합니다
    if (!selectedItem) return;
    // 전투 시작 상태로 변경합니다
    setBattleStarted(true);
    // 전투 결과를 초기화합니다
    setBattleResult(null);

    // 2초 후에 전투 결과를 결정합니다
    setTimeout(() => {
      // 공격력 = 아이템 강화 단계 × 50
      const attackPower = selectedItem.currentLevel * 50;
      // 공격력이 몬스터 HP 이상이면 승리입니다
      const isWin = attackPower >= currentMonster.hp;
      // 전투 결과를 저장합니다
      setBattleResult(isWin);

      // 승리했으면
      if (isWin) {
        // localStorage에서 현재 코인을 가져옵니다 (없으면 0)
        const currentCoins = parseInt(localStorage.getItem("coins") || "0", 10);
        // 보상은 몬스터의 HP와 같습니다
        const reward = currentMonster.hp;
        // 코인을 추가해서 저장합니다
        localStorage.setItem("coins", (currentCoins + reward).toString());
      }
    }, 2000);
  };

  // 다시 전투 버튼을 클릭했을 때 실행되는 함수
  const handleReset = () => {
    // 전투 시작 상태를 초기화합니다
    setBattleStarted(false);
    // 전투 결과를 초기화합니다
    setBattleResult(null);
    // 선택한 아이템을 초기화합니다
    setSelectedItem(null);
    // 페이지를 새로고침해서 새로운 몬스터를 생성합니다
    window.location.reload();
  };

  return (
    <div className="page">
      <h2>전투</h2>

      <div className="battle-container">
        {/* 몬스터 정보를 표시하는 섹션 */}
        <div className="monster-section">
          <h3>몬스터</h3>
          <div className="monster-display">
            <div className="monster-icon">{currentMonster.icon}</div>
            <div className="monster-name">{currentMonster.name}</div>
            <div className="monster-hp">HP: {currentMonster.hp}</div>
          </div>
        </div>

        {/* 아이템 선택 섹션 */}
        <div className="item-selection-section">
          <h3>아이템 선택</h3>
          {/* 보유한 아이템이 없으면 메시지를 표시합니다 */}
          {ownedItems.length === 0 ? (
            <p className="no-items">보유한 아이템이 없습니다.</p>
          ) : (
            // 보유한 아이템들을 표시합니다
            <div className="battle-items-container">
              {ownedItems.map((item) => (
                <div key={item.id} className={`battle-item ${selectedItem?.id === item.id ? "selected" : ""}`} onClick={() => !battleStarted && setSelectedItem(item)}>
                  <div className="battle-item-icon">{item.icon}</div>
                  <div className="battle-item-name">{item.name}</div>
                  <div className="battle-item-level">강화 {item.currentLevel}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 아이템을 선택했고 전투가 시작되지 않았으면 전투 정보를 표시합니다 */}
        {selectedItem && !battleStarted && (
          <div className="battle-info">
            <p>
              선택한 아이템: {selectedItem.name} (강화 {selectedItem.currentLevel})
            </p>
            <p>공격력: {selectedItem.currentLevel * 50}</p>
            <button className="start-battle-button" onClick={handleStartBattle}>
              전투 시작
            </button>
          </div>
        )}

        {/* 전투가 시작되었으면 전투 결과를 표시합니다 */}
        {battleStarted && (
          <div className="battle-result-section">
            {/* 전투 결과가 아직 없으면 전투 진행 중 메시지를 표시합니다 */}
            {battleResult === null ? (
              <div className="battle-progress">
                <p className="battle-text">전투 중...</p>
                <div className="battle-animation">
                  <span className="attack-icon">⚔️</span>
                  <span className="vs-text">VS</span>
                  <span className="monster-icon-small">{currentMonster.icon}</span>
                </div>
              </div>
            ) : (
              // 전투 결과가 있으면 결과를 표시합니다
              <div className="battle-result">
                {battleResult ? (
                  // 승리했으면
                  <>
                    <p className="victory-message">승리!</p>
                    <p className="reward-message">+{currentMonster.hp} 코인 획득!</p>
                  </>
                ) : (
                  // 패배했으면
                  <>
                    <p className="defeat-message">패배...</p>
                    <p className="defeat-text">더 강한 아이템이 필요합니다.</p>
                  </>
                )}
                <button className="reset-battle-button" onClick={handleReset}>
                  다시 전투
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BattlePage;
