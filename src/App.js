import { useEffect, useState } from 'react';
import './App.css';
import Question from './Components/Question';

function App() {
  const [visibleQuestions, setVisibleQuestions] = useState([0])

  const firstQuestionDescrptn = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, 
    pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. 
    Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, 
    in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent
    per conubia nostra, per inceptos himenaeos.`

  const updateVisibleQuestions = (newVisibleQuestion) => {
    if (visibleQuestions.findIndex(questionNum => newVisibleQuestion === questionNum) !== -1) { return }
    const updatedVisibleQuestions = [...visibleQuestions]
    updatedVisibleQuestions.push(newVisibleQuestion)
    setVisibleQuestions(updatedVisibleQuestions)
  }

  const renderSecondQ = () => {
    if (visibleQuestions.findIndex(q => q === 1) !== -1){
      return  <Question 
      setNextQuestionVisible={updateVisibleQuestions}
      questionNum={1}
      questionHeading={"Property Type"}
      questionDescrptn={firstQuestionDescrptn}
      questionOptions={["Country Side", "Flat", "Industrial"]}
      questionInputs={[]}
      buttonInnerText={"NEXT"}
    />
    }
    else {}
  }
 

  return (
    <div className="App">
      <Question 
        setNextQuestionVisible={updateVisibleQuestions}
        questionNum={0}
        questionHeading={"Property Type"}
        questionDescrptn={firstQuestionDescrptn}
        questionOptions={["Country Side", "Flat", "Industrial"]}
        questionInputs={["Whole Area (Cubic Meters)", "Area that needs surveillance (Cubic Meters)"]}
        buttonInnerText={"NEXT"}
      />
      {renderSecondQ()}


    </div>
  );
}

export default App;
