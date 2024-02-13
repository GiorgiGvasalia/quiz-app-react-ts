import React, { useCallback, useState } from "react";
import QuizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question";

interface QuizProps {
  questions: { text: string; answers: string[] }[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [answerState, setAnswerState] = useState<string>("");
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const activeQuestionIndex: number =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsCompleted = activeQuestionIndex === questions.length;

  const handleAnswerClick = useCallback(
    function handleAnswerClick(selectedAnswer: string | null) {
      setUserAnswers((prevUserAnswers) => {
        setAnswerState("answered");
        return [...prevUserAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (selectedAnswer === questions[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex, questions]
  );

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
        answerState={answerState}
        questionText={questions[activeQuestionIndex].text}
        answers={questions[activeQuestionIndex].answers}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSelectAnswer={handleAnswerClick}
        onSkipAnswer={handleSkipQuestion}
        />
    </div>
  );
};

export default Quiz;
