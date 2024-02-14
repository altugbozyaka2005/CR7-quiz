import React from 'react';
import img1 from "./assets/ronaldo-photo.png"
import img2 from "./assets/ronaldo-body.png"
import './index.css';
import Question from './Question'
import quizData from './QuizData'
import suiSong from './assets/sui-christmas.mp3'

function App() {

  const [checkResponse, setCheckResponse] = React.useState({});
  const [show, setShow] = React.useState(false);
  const [net, setNet] = React.useState(0);
  const [resetKey, setResetKey] = React.useState(0);

  const audioRef = React.useRef(new Audio(suiSong));

  function saveResponse(selectedChoice, qNum, correctAnswer) {
    setCheckResponse((prevState) => ({
      ...prevState,
      [qNum]: String(selectedChoice) === String(correctAnswer) ? true : false,
    }));
  }
  
  function submitResponse() {
    setShow(prevState => !prevState)
    let count = 0;
    for (let i = 1; i <= quizData.length; i++) {
      if (checkResponse[i]) {
        count ++;
      }
    }
    setNet(count);
    audioRef.current.play();
  }

  function reset() {
    setCheckResponse({});
    setShow(false);
    setNet(0);
    setResetKey(prevKey => prevKey + 1);
  }

  const questionElements = quizData.map((question, index) => {
    return (
    <Question 
      number={index + 1} 
      prompt={question.prompt} 
      answers={question.answers} 
      correctAnswer={question.correctAnswer} 
      saveResponse={saveResponse} 
      showAnswer={show} 
      explanation={question.explanation} 
      reset={resetKey}
    />)
  })

  return (
    <div className='page'>
      <div className='navbar'>
        <div className='title-container'>
          <img className="ronaldo-image" src={img1} alt="Cristiano Ronaldo" />
          <h1 className='title'>CR7 Quiz</h1>
        </div>
      </div>
      <h2 className='hook'>
        "Welcome to the Ultimate Cristiano Ronaldo Fan Challenge! 🌟 
        Buckle up, because this quiz is your ticket to test your knowledge and discover
        fastinating facts about the GOAT himself! Are you ready to prove you're a true Ronaldo aficionado? 
        Let the game begin!
      </h2>
      <div className='questions-container'>
        {questionElements}
        <div className='buttons-container'>
          <button className="submit-button" onClick={submitResponse}>Submit Quiz</button>
          <button className='reset-button' onClick={reset}>Try Again</button>
        </div>
      </div>
      {show && (
        <h2 className='final-message'>
          {`${net > 5 ? "Congratulations! " : "Unfortunately, "}You got `}
          <span style={net > 5 ? {color: "#1ac201"} : {color: "#ff3c3c"}}>{net}</span> 
          {` out of ${quizData.length} questions correct.`} <br /> 
          {`${net > 5 ? " You are a diehard Ronaldo fan ;D" : "You must be a Messi fan, get out of here :("}`}
        </h2>
      )}
      <footer className='footer'>coded by Altuğ Bozyaka</footer>
    </div>
  );
}

export default App;
