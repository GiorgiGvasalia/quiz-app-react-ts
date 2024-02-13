import React, { useCallback, useState } from "react";
import QuizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question";

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

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        onSelectAnswer={handleAnswerClick}
        onSkipAnswer={handleSkipQuestion}
      />
    </div>
  );
};

export default Quiz;
