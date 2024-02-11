import React, { useEffect, useState } from "react";

interface TimerProps {
  timeout: number;
  onTimeout: () => void;
}

const QuestionTimer: React.FC<TimerProps> = ({ timeout, onTimeout }) => {
  const [remainingTime, setRemainingTime] = useState<number>(timeout);

  useEffect(() => {
    const timerId = setTimeout(onTimeout, timeout);

    return () => clearTimeout(timerId);
  }, [onTimeout, timeout]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return <progress id="question-time" value={remainingTime} max={timeout} />;
};

export default QuestionTimer;
