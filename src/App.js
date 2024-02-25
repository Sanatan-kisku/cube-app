import React, { useState, useEffect, useRef } from 'react';
import Result from './Result';
import './App.css';

function App() {
  const initialNumber = 1;
  const [number, setNumber] = useState(initialNumber);
  // const [userInput, setUserInput] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const check = (e, multiplier, index) => {
    const nextIndex = index + 1;
    const nextInput = document.getElementById(`input-${nextIndex}`);

    if (nextInput && e.key === 'Enter') {
      e.preventDefault();
      nextInput.focus();

      // // If this is the last input, trigger "Next Number" on Enter press
      // if (nextIndex === data.length) {
      //   next(e);
      // }
    }

    const userAnswer = e.target.value.trim();
    const correctAnswer = Math.pow(number, 3).toString();

    console.log(userAnswer.length === correctAnswer.length)

    if (userAnswer.length === correctAnswer.length) {
      const isCorrect = userAnswer === correctAnswer;

      console.log(isCorrect)
      if (isCorrect) {
        e.target.classList.add("correct");
        e.target.classList.remove("wrong");
        setCorrectCount((prevCount) => {
          const newCount = prevCount + 1;
          console.log("Previous Correct Count:", prevCount);
          console.log("New Correct Count:", newCount);
          return newCount;
        });
        setCorrectAnswers((prevCorrectAnswers) => [
          ...prevCorrectAnswers,
          { number, multiplier, correctAnswer },
        ]);
      } else {
        e.target.classList.add("wrong");
        e.target.classList.remove("correct");
        setWrongCount((prevCount) => {
          const newCount = prevCount + 1;
          console.log("Previous Wrong Count:", prevCount);
          console.log("New Wrong Count:", newCount);
          return newCount;
        });
        setWrongAnswers((prevAnswers) => [
          ...prevAnswers,
          { number, multiplier, userAnswer },
        ]);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.getElementById("nextBtn").click();
      const nextIndex = index + 1;
      const nextInput = document.getElementById(`input-${nextIndex}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
    if (e.key === " ") {
      e.preventDefault();
      document.getElementById("endBtn").click();
    }
  };

  const reset = () => {
    const inputs = document.querySelectorAll('.input-container input');
    inputs.forEach(input => {
      input.value = '';
      input.classList.remove('correct', 'wrong');
    });

    setNumber(initialNumber);
    // setUserInput('');
    setCorrectCount(0);
    setWrongCount(0);
    setCorrectAnswers([]);
    setWrongAnswers([]);
    setShowResults(false);
  };

  const next = (e) => {
    e.preventDefault();

    // Increment multiplicand
    setNumber((prevNumber) => prevNumber + 1);

    // Reset input values and remove classes
    const inputs = document.querySelectorAll('.input-container input');
    inputs.forEach(input => {
      input.value = '';
      input.classList.remove('correct', 'wrong');
    });



    setShowResults(false);
  };

  const endTest = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  const retryTest = () => {
    setShowResults(false);
    setNumber(initialNumber);
    setCorrectCount(0);
    setWrongCount(0);
    setCorrectAnswers([]);
    setWrongAnswers([]);
  };

  const multiplierInputs = (
    <div key={1} className="input-container">
      <label>
        Cube of {number} <span>=</span>
        <input
          ref={firstInputRef}
          id={`input-1`}
          type="number"
          onChange={(e) => check(e, 1)}
          onKeyDown={(e) => handleKeyDown(e, 1)}
        />
      </label>
    </div>
  );


  return (
    <div className='container'>
      <h1>Cube App</h1>
      <p className='desc'>Test and practice cubing numbers</p>
      {!showResults && (
        <>
          <button className="reset-button" onClick={reset}>
            Reset
          </button>
        </>
      )}
      <hr />
      <h2>{showResults ? 'Results' : `Cube of ${number}`}</h2>
      {showResults ? (
        <Result
          correctCount={correctCount}
          wrongCount={wrongCount}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          onRetry={retryTest}
        />
      ) : (
        <form>
          <div className='multiplier'>
            {multiplierInputs}
          </div>
          <div className="button-container">
            <button id='nextBtn' style={{ backgroundColor: 'green', color: 'white' }} onClick={next}>Next Number</button>
            <button id='endBtn' style={{ backgroundColor: 'red', color: 'white' }} onClick={endTest}>End Test</button>
          </div>
        </form>
      )}
      <p><span className='note'>*</span>Shortcuts: [Enter] = Next number, [Space] = Show results</p>
    </div>
  );
}

export default App;
