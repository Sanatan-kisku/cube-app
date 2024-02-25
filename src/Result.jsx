import React, { useState } from 'react';
import './Result.css';

const Result = ({ correctCount, correctAnswers, wrongCount, wrongAnswers, onRetry }) => {
  const [showCorrectList, setShowCorrectList] = useState(false);
  const [showWrongList, setShowWrongList] = useState(false);

  const toggleCorrectList = () => {
    setShowCorrectList(!showCorrectList);
  };

  const toggleWrongList = () => {
    setShowWrongList(!showWrongList);
  };

  return (
    <div className="result-section">
      <p>
        <button className="correct-button" onClick={toggleCorrectList}>Correct Answers ({correctCount})</button>
      </p>
      {showCorrectList && correctAnswers.length > 0 && (
        <div>
          <p>Correct Answers:</p>
          <ul>
            {correctAnswers.map(({ number, multiplier, correctAnswer }, index) => (
              <li key={index}>
                Cube of {number} (Multiplier {multiplier}) is {correctAnswer}
              </li>
            ))}
          </ul>
        </div>
      )}
      <p>
        <button className="incorrect-button" onClick={toggleWrongList}>Incorrect Answers ({wrongCount})</button>
      </p>
      {showWrongList && wrongCount > 0 && (
        <div>
          <p>Incorrect Answers:</p>
          <ul>
            {wrongAnswers.map(({ number, userAnswer }, index) => (
              <li key={index}>
                Cube of {number} is {Math.pow(number, 3)} (Your Answer: {userAnswer})
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={onRetry}>Retry</button>
    </div>
  );
};

export default Result;
