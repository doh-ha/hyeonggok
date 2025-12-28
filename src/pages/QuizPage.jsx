import "./QuizPage.css";

function QuizPage() {
  // 코인 컨텍스트에서 코인 관련 함수들을 가져옵니다
  const { addCoins } = useCoins();

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
      // 코인을 100개 추가합니다
      addCoins(100);
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
