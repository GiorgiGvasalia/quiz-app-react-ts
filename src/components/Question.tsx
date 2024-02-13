import React, { useState } from "react";
import QuestionTimer from "./QuestionTimer.tsx";
import Answers from "./Answers.tsx";
import questions from "../questions.ts";

interface QuestionProps {
  questionIndex: number;
  onSelectAnswer: (selectedAnswer: string | null) => void;
  onSkipAnswer: () => void;
}

const Question: React.FC<QuestionProps> = ({
  questionIndex,
  onSelectAnswer,
  onSkipAnswer,
}) => {
  const [answer, setAnswer] = useState<{
    selectedAnswer: string;
    isCorrect: boolean | null;
  }>({
    selectedAnswer: "",
    isCorrect: null,
  });

  function handleSelectAnswer(answer: string) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: questions[questionIndex].answers[0] === answer,
      });
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  }

  return (
    <div id="question">
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{questions[questionIndex].text}</h2>
      <Answers
        answers={questions[questionIndex].answers}
        onSelect={handleSelectAnswer}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
      />
    </div>
  );
};

export default Question;
