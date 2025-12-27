import "./QuizPage.css";

function QuizPage() {
  return (
    <div className="page">
      <h2>퀴즈 풀기</h2>
      
      {/* 보유 코인 표시 */}
      <div className="coin-display">
        <span>보유 코인: </span>
        <span className="coin-amount">0</span>
      </div>

      {/* 퀴즈 문제 영역 */}
      <div className="quiz-container">
        <div className="quiz-question">
          <h3>문제</h3>
          <p className="question-text">1 + 1은 얼마일까요?</p>
        </div>

        {/* 선택지 영역 */}
        <div className="quiz-options">
          <button className="option-button">1</button>
          <button className="option-button">2</button>
          <button className="option-button">3</button>
          <button className="option-button">4</button>
        </div>

        {/* 제출 버튼 */}
        <div className="quiz-submit">
          <button className="submit-button">정답 제출</button>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
