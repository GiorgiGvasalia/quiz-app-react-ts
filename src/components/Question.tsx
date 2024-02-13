import React from "react";
import QuestionTimer from "./QuestionTimer.tsx";
import Answers from "./Answers.tsx";

interface QuestionProps {
  questionText: string;
  answers: string[];
  onSelectAnswer: (selectedAnswer: string | null) => void;
  selectedAnswer: string | null;
  answerState: string;
  onSkipAnswer: () => void;
}

const Question: React.FC<QuestionProps> = ({
  questionText,
  answers,
  onSelectAnswer,
  selectedAnswer,
  answerState,
  onSkipAnswer,
}) => {
  return (
    <div id="question">
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{questionText}</h2>
      <Answers
        answers={answers}
        onSelect={onSelectAnswer}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
      />
    </div>
  );
};

export default Question;
