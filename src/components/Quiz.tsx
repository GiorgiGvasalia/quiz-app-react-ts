import React, { useCallback, useState } from "react";
import QuizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

interface QuizProps {
  questions: { text: string; answers: string[] }[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const activeQuestionIndex: number = userAnswers.length;
  const quizIsCompleted = activeQuestionIndex === questions.length;

  const handleAnswerClick = useCallback(function handleAnswerClick(
    selectedAnswer: string | null
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  const handleSkipQuestion = useCallback(
    () => handleAnswerClick(null),
    [handleAnswerClick]
  );

  if (quizIsCompleted) {
    return (
      <div id="summary">
        <img src={QuizCompleteImg} alt="Quiz_trophy_img" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const shuffledAnswers = questions[activeQuestionIndex].answers;
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <QuestionTimer
          timeout={10000}
          onTimeout={handleSkipQuestion}
          key={activeQuestionIndex}
        />
        <h2>{questions[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer: string) => (
            <li key={answer} className="answer">
              <button onClick={() => handleAnswerClick(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
