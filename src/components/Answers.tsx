import React, { useRef } from "react";

interface AnswerProps {
  answers: string[];
  selectedAnswer: string | null;
  answerState: string;
  onSelect: (answer: string) => void;
}

const Answers: React.FC<AnswerProps> = ({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) => {
  const shuffledAnswersRef: React.MutableRefObject<undefined | string[]> =
    useRef();

  if (!shuffledAnswersRef.current) {
    shuffledAnswersRef.current = [...answers];
    shuffledAnswersRef.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswersRef.current.map((answer: string) => {
        const isSelected: boolean = selectedAnswer === answer;
        let cssClass: string = "";

        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
