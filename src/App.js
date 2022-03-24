import {  useState } from 'react';
import './App.css';
import * as utils from './Utils/utils'
import Question from './Components/Question';
import AppButton from './Components/AppButton';

  const stockProjectInfo = {
    areaType: "",
    wholeAreaSize: 0,
    areaSizeToProtect: 0,
    serviceType: "",
    equipmentSet: []
  }

function App() {
  const [visibleQuestions, setVisibleQuestions] = useState([0])
  const [projectInfo, setProjectInfo] = useState(stockProjectInfo)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const updateVisibleQuestions = (newVisibleQuestion) => {
    const updatedVisibleQuestions = [...visibleQuestions]
    if (visibleQuestions.findIndex(questionNum => newVisibleQuestion === questionNum) !== -1) {
      updatedVisibleQuestions.splice(updatedVisibleQuestions.length - 1, 1)
      
    } else {
      updatedVisibleQuestions.push(newVisibleQuestion)
    }
    setVisibleQuestions(updatedVisibleQuestions)
    setCurrentQuestion(newVisibleQuestion)
  }

  const renderSecondQ = () => {
    if (visibleQuestions.findIndex(q => q === 1) === -1) { return }
   return  <Question 
      setNextQuestionVisible={updateVisibleQuestions}
      questionNum={1}
      questionHeading={"Service Type"}
      questionDescrptn={utils.secondQuestionDescrptn}
      questionOptions={["Standard", "Custom"]}
      questionInputs={[]}
      buttonInnerText={"NEXT"}
      setProjectInfo={setProjectInfo}
      projectInfo={projectInfo}
      isQuestionAvailable={visibleQuestions[visibleQuestions.length - 1] === 1}
    />
  }
 

  return (
    <div className="App">
      <AppButton
        onClickFunct={updateVisibleQuestions}
        innerText={"BACK"}
        currentQuestion={currentQuestion}
      />
      <Question 
        setNextQuestionVisible={updateVisibleQuestions}
        questionNum={0}
        questionHeading={"Property Type"}
        questionDescrptn={utils.firstQuestionDescrptn}
        questionOptions={["Country Side", "Flat", "Industrial"]}
        questionInputs={["Whole Area (Cubic Meters)", "Area that needs surveillance (Cubic Meters)"]}
        inputPriority={true}
        isInputNumeric={true}
        buttonInnerText={"NEXT"}
        setProjectInfo={setProjectInfo}
        projectInfo={projectInfo}
        isQuestionAvailable={visibleQuestions[visibleQuestions.length - 1] === 0}
      />
      {renderSecondQ()}


    </div>
  );
}

export default App;
