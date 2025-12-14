// React의 useState와 useEffect를 가져옵니다
import { useState, useEffect } from "react";
import "./UpgradePage.css";
// 확률 문제 데이터를 가져옵니다
import probabilityData from "../data/probability.json";
// 아이템 데이터를 가져옵니다
import itemsData from "../data/items.json";

function UpgradePage() {
  // 보유한 아이템 목록을 저장하는 상태
  const [ownedItems, setOwnedItems] = useState([]);
  // 강화할 아이템을 선택한 상태
  const [selectedItem, setSelectedItem] = useState(null);
  // 선택된 확률 문제 3개를 저장하는 상태
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  // 모달(팝업 창)을 보여줄지 여부를 저장하는 상태
  const [showModal, setShowModal] = useState(false);
  // 강화가 진행 중인지 여부를 저장하는 상태
  const [upgrading, setUpgrading] = useState(false);
  // 강화 결과(성공/실패)를 저장하는 상태 (null은 아직 결과가 없음)
  const [upgradeResult, setUpgradeResult] = useState(null);
  // 선택한 확률 문제를 저장하는 상태
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // 컴포넌트가 처음 화면에 나타날 때 실행됩니다
  useEffect(() => {
    // localStorage에서 저장된 아이템을 가져옵니다
    const savedItems = localStorage.getItem("ownedItems");
    if (savedItems) {
      // 저장된 아이템이 있으면 JSON 형식으로 변환해서 상태에 저장합니다
      setOwnedItems(JSON.parse(savedItems));
    } else {
      // 저장된 아이템이 없으면 기본 아이템 2개를 가방에 추가합니다
      const defaultItems = [itemsData[0], itemsData[1]];
      setOwnedItems(defaultItems);
      // localStorage에 저장합니다
      localStorage.setItem("ownedItems", JSON.stringify(defaultItems));
    }
  }, []);

  // 아이템을 선택했을 때 실행됩니다
  useEffect(() => {
    if (selectedItem) {
      // 확률 문제들을 랜덤으로 섞습니다
      const shuffled = [...probabilityData].sort(() => Math.random() - 0.5);
      // 앞에서 3개만 선택해서 저장합니다
      setSelectedQuestions(shuffled.slice(0, 3));
    }
  }, [selectedItem]);

  // 아이템을 선택했을 때 실행되는 함수
  const handleSelectItem = (item) => {
    // 선택한 아이템을 상태에 저장합니다
    setSelectedItem(item);
    // 모달을 닫습니다
    setShowModal(false);
    // 강화 진행 상태를 초기화합니다
    setUpgrading(false);
    // 강화 결과를 초기화합니다
    setUpgradeResult(null);
    // 선택한 문제를 초기화합니다
    setSelectedQuestion(null);
  };

  // 확률 문제를 선택했을 때 실행되는 함수
  const handleSelectQuestion = (question) => {
    // 선택한 문제를 저장합니다
    setSelectedQuestion(question);
    // 모달을 보여줍니다
    setShowModal(true);
    // 강화 진행 중 상태로 변경합니다
    setUpgrading(true);
    // 강화 결과를 초기화합니다
    setUpgradeResult(null);

    // 2초 후에 강화 결과를 결정합니다
    setTimeout(() => {
      // answer를 파싱해서 확률을 계산합니다 (예: "1/2" -> 0.5)
      const parseProbability = (answerStr) => {
        const parts = answerStr.split("/");
        if (parts.length === 2) {
          return parseFloat(parts[0]) / parseFloat(parts[1]);
        }
        return 0.5; // 파싱 실패 시 기본값
      };
      const probability = parseProbability(question.answer);
      // 계산된 확률보다 작은 랜덤 숫자가 나오면 성공입니다
      const success = Math.random() < probability;
      // 강화 진행 중 상태를 해제합니다
      setUpgrading(false);
      // 강화 결과를 저장합니다
      setUpgradeResult(success);

      // 강화에 성공했고 아이템이 선택되어 있으면
      if (success && selectedItem) {
        // 아이템 목록을 업데이트합니다
        const updatedItems = ownedItems.map((item) => {
          // 선택한 아이템이고 최대 강화 단계가 아니면 레벨을 1 증가시킵니다
          if (item.id === selectedItem.id && item.currentLevel < item.maxLevel) {
            return { ...item, currentLevel: item.currentLevel + 1 };
          }
          // 그 외의 아이템은 그대로 유지합니다
          return item;
        });
        // 업데이트된 아이템 목록을 상태에 저장합니다
        setOwnedItems(updatedItems);
        // localStorage에도 저장합니다
        localStorage.setItem("ownedItems", JSON.stringify(updatedItems));
        // 선택한 아이템도 업데이트된 정보로 변경합니다
        setSelectedItem(updatedItems.find((item) => item.id === selectedItem.id));
      }
    }, 2000);
  };

  // 모달을 닫을 때 실행되는 함수
  const handleCloseModal = () => {
    // 모달을 숨깁니다
    setShowModal(false);
    // 강화 진행 상태를 초기화합니다
    setUpgrading(false);
    // 강화 결과를 초기화합니다
    setUpgradeResult(null);
    // 선택한 문제를 초기화합니다
    setSelectedQuestion(null);
    // 아이템이 선택되어 있으면 새로운 문제 세트를 생성합니다
    if (selectedItem) {
      const shuffled = [...probabilityData].sort(() => Math.random() - 0.5);
      setSelectedQuestions(shuffled.slice(0, 3));
    }
  };

  return (
    <div className="page">
      <h2>아이템 강화</h2>

      {/* 가방 섹션 */}
      <div className="inventory-section">
        <h3>가방</h3>
        {/* 보유한 아이템이 없으면 메시지를 표시합니다 */}
        {ownedItems.length === 0 ? (
          <p className="empty-inventory">보유한 아이템이 없습니다.</p>
        ) : (
          // 보유한 아이템들을 표시합니다
          <div className="inventory-container">
            {ownedItems.map((item) => (
              <div key={item.id} className={`inventory-item ${selectedItem?.id === item.id ? "selected" : ""}`} onClick={() => handleSelectItem(item)}>
                <div className="inventory-icon">{item.icon}</div>
                <div className="inventory-info">
                  <div className="inventory-name">{item.name}</div>
                  <div className="inventory-level">
                    강화 {item.currentLevel} / {item.maxLevel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 아이템을 선택했으면 강화 섹션을 표시합니다 */}
      {selectedItem && (
        <div className="upgrade-section">
          <h3>{selectedItem.name} 강화</h3>
          <p>아래 문제 중 가장 높은 확률을 가진 문제를 선택하세요!</p>

          {/* 확률 문제들을 표시합니다 */}
          {selectedQuestions.length > 0 && (
            <div className="questions-container">
              {selectedQuestions.map((question, index) => (
                <div key={question.id} className="question-card">
                  <div className="question-number">문제 {index + 1}</div>
                  <div className="question-text">{question.question}</div>
                  <button className="select-button" onClick={() => handleSelectQuestion(question)} disabled={showModal || selectedItem.currentLevel >= selectedItem.maxLevel}>
                    {selectedItem.currentLevel >= selectedItem.maxLevel ? "최대 강화 단계" : "이 문제 선택"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 모달을 표시합니다 */}
      {showModal && selectedQuestion && (
        <div className="modal-overlay" onClick={!upgrading ? handleCloseModal : undefined}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* 강화가 진행 중이면 */}
            {upgrading ? (
              <>
                <h3>강화 진행중</h3>
                <p className="modal-probability">{selectedQuestion.answer} 확률로 강화 진행중...</p>
                <div className="loading-spinner"></div>
              </>
            ) : (
              // 강화 결과가 있으면
              upgradeResult !== null && (
                <>
                  <h3 className={upgradeResult ? "success" : "failure"}>{upgradeResult ? "강화 성공!" : "강화 실패..."}</h3>
                  <p className="modal-probability">확률: {selectedQuestion.answer}</p>
                  <button className="close-button" onClick={handleCloseModal}>
                    확인
                  </button>
                </>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UpgradePage;
