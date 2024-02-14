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

  let timer: number = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

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
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : () => {}}
        mode={answerState}
      />
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
