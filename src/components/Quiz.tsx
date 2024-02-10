import React from "react";
import QuizCompleteImg from '../assets/quiz-complete.png'

interface QuizProps {
  questions: { text: string; answers: string[] }[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [userAnswers, setUserAnswers] = React.useState<string[]>([]);
  const activeQuestionIndex: number = userAnswers.length;
  const quizIsCompleted = activeQuestionIndex === questions.length
  
  const handleAnswerClick = (selectedAnswer: string) => {
      setUserAnswers((prevUserAnswers) => {
          return [ ...prevUserAnswers, selectedAnswer]
        });
    };
    
    if(quizIsCompleted) {
        return (
            <div id="summary">
                <img src={QuizCompleteImg} alt='Quiz_trophy_img' />
            <h2>Quiz Completed!</h2>
        </div>
    )
}

  const shuffledAnswers = questions[activeQuestionIndex].answers
  shuffledAnswers.sort(() => Math.random() - 0.5)



  return (
    <div id="quiz">
      <div id="question">
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
