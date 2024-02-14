import React, { useCallback, useState } from "react";
import Question from "./Question";
import Summary from "./Summary";

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
    return <Summary userAnswers={userAnswers} />;
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
