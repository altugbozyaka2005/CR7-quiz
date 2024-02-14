import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'


export default function Question(props) {
    // initialize a state that will keep track of which multiple choice is selected
    let answersArray = props.answers;
    const [pickedAnswer, setPickedAnswer] = React.useState(() => {
        let stateObject = {};
        for (let i = 0; i < answersArray.length; i++) {
            stateObject[answersArray[i]] = false;
        }
        return stateObject;
    });

    React.useEffect(() => {
        setPickedAnswer(() => {
            let stateObject = {};
            for (let i = 0; i < answersArray.length; i++) {
                stateObject[answersArray[i]] = false;
            }
            return stateObject;
        })
    }, [props.reset])

    // state for selected multiple choice
    const [currentSelection, setCurrentSelection] = React.useState();

    function handleClick(choice, number, correctAnswer) {
        if (!props.showAnswer) {
            props.saveResponse(choice, number, correctAnswer)
            setPickedAnswer(prevState => {
                const previousTrue = Object.keys(prevState).find((key) => prevState[key] === true);
                return {
                  ...prevState,
                  [previousTrue]: false,
                  [choice]: true,
                };
            });
        }
    }


    const multipleChoice = props.answers.map((choice) => {
        let buttonClass = "choice-button";

        if (props.showAnswer) {
            if (pickedAnswer[choice]) {
                buttonClass += props.correctAnswer === choice ? " correct-answer" : " wrong-answer";
            } else {
                if (Object.values(pickedAnswer).some(value => value === true) && choice === props.correctAnswer) {
                    buttonClass += " correct-answer"
                } else if (Object.values(pickedAnswer).every(value => value === false) && choice === props.correctAnswer) {
                    buttonClass += " wrong-answer"
                } else {
                    buttonClass += " grayed-out";
                }
            }
        } else if (pickedAnswer[choice]) {
            buttonClass += " selected";
        }


        return <button className={buttonClass} onClick={() => handleClick(choice, props.number, props.correctAnswer)}>
            {choice}
            {props.showAnswer && (choice === props.correctAnswer ? <FontAwesomeIcon icon={faCircleCheck} className='checkmark' /> : pickedAnswer[choice] && <FontAwesomeIcon icon={faCircleXmark} className='crossmark'/>)}
        </button>
    })

    return (
        <div className='question-box'>
            <h4 className='prompt'>{`${props.number}) ${props.prompt}`}</h4>
            <div className='multiple-choice-container'>
                {multipleChoice}
            </div>
            {props.showAnswer && <h3 className='explanation'>{props.explanation}</h3>}
        </div>
    )
}