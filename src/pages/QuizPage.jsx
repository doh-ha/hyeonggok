// React의 useState와 useEffect를 가져옵니다
// useState: 컴포넌트의 상태(데이터)를 관리하는 함수
// useEffect: 컴포넌트가 화면에 나타날 때 실행되는 함수
import { useState, useEffect } from "react";
import "./QuizPage.css";
// cases.json 파일에서 문제 데이터를 가져옵니다
import casesData from "../data/cases.json";

function QuizPage() {
  // 현재 문제의 번호를 저장하는 상태 (0부터 시작)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 사용자가 선택한 답안의 번호를 저장하는 상태 (null은 아무것도 선택하지 않음)
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // 정답 확인 결과를 보여줄지 여부를 저장하는 상태
  const [showResult, setShowResult] = useState(false);

  // 문제들을 랜덤으로 섞어서 저장하는 상태
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // 컴포넌트가 처음 화면에 나타날 때 실행됩니다
  useEffect(() => {
    // 문제들을 복사해서 랜덤으로 섞습니다
    const shuffled = [...casesData].sort(() => Math.random() - 0.5);
    // 섞인 문제들을 상태에 저장합니다
    setShuffledQuestions(shuffled);
  }, []); // 빈 배열 []은 컴포넌트가 처음 나타날 때만 실행된다는 의미입니다

  // 현재 보여줄 문제를 가져옵니다
  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  // 사용자가 답안을 선택했을 때 실행되는 함수
  const handleSelectAnswer = (answerIndex) => {
    // 이미 정답을 확인한 상태면 더 이상 선택할 수 없습니다
    if (showResult) return;
    // 선택한 답안의 번호를 저장합니다
    setSelectedAnswer(answerIndex);
  };

  // 정답 확인 버튼을 클릭했을 때 실행되는 함수
  const handleCheckAnswer = () => {
    // 답안을 선택하지 않았으면 함수를 종료합니다
    if (selectedAnswer === null) return;
    // 정답 확인 결과를 보여주도록 상태를 변경합니다
    setShowResult(true);

    // 선택한 답안이 정답인지 확인합니다
    if (selectedAnswer === currentQuestion.answer) {
      // localStorage에서 현재 코인을 가져옵니다 (없으면 0)
      const currentCoins = parseInt(localStorage.getItem("coins") || "0", 10);
      // 코인을 100개 추가합니다
      const newCoins = currentCoins + 100;
      // 새로운 코인 수를 localStorage에 저장합니다
      localStorage.setItem("coins", newCoins.toString());
    }
  };

  // 다음 문제 버튼을 클릭했을 때 실행되는 함수
  const handleNextQuestion = () => {
    // 아직 풀지 않은 문제가 있으면
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      // 다음 문제로 이동합니다
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // 선택한 답안을 초기화합니다
      setSelectedAnswer(null);
      // 결과 표시를 숨깁니다
      setShowResult(false);
    } else {
      // 모든 문제를 풀었으면 문제를 다시 섞습니다
      const shuffled = [...casesData].sort(() => Math.random() - 0.5);
      setShuffledQuestions(shuffled);
      // 첫 번째 문제로 돌아갑니다
      setCurrentQuestionIndex(0);
      // 선택한 답안을 초기화합니다
      setSelectedAnswer(null);
      // 결과 표시를 숨깁니다
      setShowResult(false);
    }
  };

  // 문제가 아직 로드되지 않았으면 로딩 메시지를 보여줍니다
  if (shuffledQuestions.length === 0) {
    return (
      <div className="page">
        <h2>퀴즈 풀기</h2>
        <p>문제를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>퀴즈 풀기</h2>
      {/* 현재 문제 번호와 전체 문제 수를 표시합니다 */}
      <p>
        문제 {currentQuestionIndex + 1} / {shuffledQuestions.length}
      </p>

      {/* 현재 문제가 있으면 문제를 표시합니다 */}
      {currentQuestion && (
        <div className="quiz-container">
          {/* 문제를 표시하는 박스 */}
          <div className="question-box">
            <h3 className="question-text">{currentQuestion.question}</h3>
          </div>

          {/* 선택지 버튼들을 표시합니다 */}
          <div className="options-container">
            {/* 각 선택지를 버튼으로 만듭니다 */}
            {currentQuestion.options.map((option, index) => {
              // 버튼의 스타일을 결정하는 변수
              let buttonClass = "option-button";

              // 정답을 확인한 상태면
              if (showResult) {
                // 이 선택지가 정답이면 초록색으로 표시
                if (index === currentQuestion.answer) {
                  buttonClass += " correct";
                }
                // 이 선택지가 내가 선택한 답이고 틀렸으면 빨간색으로 표시
                else if (index === selectedAnswer && index !== currentQuestion.answer) {
                  buttonClass += " incorrect";
                }
              }
              // 정답을 확인하지 않은 상태에서 내가 선택한 답이면
              else if (selectedAnswer === index) {
                buttonClass += " selected";
              }

              return (
                <button key={index} className={buttonClass} onClick={() => handleSelectAnswer(index)} disabled={showResult}>
                  {option}
                </button>
              );
            })}
          </div>

          {/* 정답을 확인하지 않았으면 정답 확인 버튼을 보여줍니다 */}
          {!showResult ? (
            <button className="check-button" onClick={handleCheckAnswer} disabled={selectedAnswer === null}>
              정답 확인
            </button>
          ) : (
            // 정답을 확인했으면 결과를 보여줍니다
            <div className="result-box">
              <div className="result-message">
                {/* 정답이면 성공 메시지, 틀렸으면 실패 메시지를 표시합니다 */}
                {selectedAnswer === currentQuestion.answer ? <p className="correct-message">정답입니다! +100 코인</p> : <p className="incorrect-message">틀렸습니다.</p>}
              </div>
              {/* 다음 문제 버튼을 표시합니다 */}
              <button className="next-button" onClick={handleNextQuestion}>
                {currentQuestionIndex < shuffledQuestions.length - 1 ? "다음 문제" : "다시 시작"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuizPage;
