import {  useState } from 'react';
import './App.css';
import * as utils from './Utils/utils'
import Question from './Components/Question';
import ResultField from './Components/ResultField';
import { QuestionHeading } from './Styles/QuestionsStyle';

  const stockProjectInfo = {
    areaType: "",
    wholeAreaSize: 0,
    areaSizeToProtect: 0,
    serviceType: "",
    equipmentSet: [],
    equipmentObjcts: [{}],
    equipmentCustomInfo: {
      camCustomInfo: {},
      fireAlarmsCustomInfo: {},
      doorLocksCustomInfo: {}
    },
    chosenCustomSpecs: [],
    finalCustomSpecs: []
  }

  class Cameras {
    name = "Cameras"
    constructor (resolution, type, storageTime, numOfCameras){
      this.resolution = resolution
      this.type = type
      this.storageTime = storageTime
      this.numOfCameras = numOfCameras
    }

    renderInfo = () => {
      return `${this.name}:
                Resolution: ${this.resolution};
                Cameras type: ${this.type};
                Storage time: ${this.storageTime};
                Number of cameras: ${this.numOfCameras};
              `
    }
  }

  class FireAlarms {
    name = "Fire Alarms"
    constructor (reactionType, reactionTime, warningType, numOfAlarms){
      this.reactionType = reactionType
      this.reactionTime = reactionTime
      this.warningType = warningType
      this.numOfAlarms = numOfAlarms
    }

    renderInfo = () => {
      return `${this.name}:
                Reaction Type: ${this.reactionType};
                Reaction Time: ${this.reactionTime};
                Warning Type: ${this.warningType};
                Number of alarm units: ${this.numOfAlarms};
              `
    }
  }

  class DoorLocks {
    name = "Door Locks"
    constructor (lockType, signalization, unlockingType){
      this.lockType = lockType
      this.signalization = signalization
      this.unlockingType = unlockingType
    }

    renderInfo = () => {
      return `${this.name}:
                Lock Type: ${this.lockType};
                Signilization: ${this.signalization};
                Unlocking Type: ${this.unlockingType};
              `
    }
  }

function App() {
  const [visibleQuestions, setVisibleQuestions] = useState([0])
  const [projectInfo, setProjectInfo] = useState(stockProjectInfo)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const updateVisibleQuestions = (newVisibleQuestion, chosenEqLevel) => {
    const updatedVisibleQuestions = [...visibleQuestions]
    
    if ((chosenEqLevel && currentQuestion >= 3 && currentQuestion < 6) || (currentQuestion >= 8 && currentQuestion < 11)) {
      setFinalProjectEquipment(chosenEqLevel)
    } 

    if ((currentQuestion === 2 || currentQuestion === 7) && projectInfo.equipmentObjcts.length > 0) {
      updatedVisibleQuestions.splice(3, 3)
    }
    if (updatedVisibleQuestions.findIndex(q => q === newVisibleQuestion) !== -1){
      setCurrentQuestion(visibleQuestions[visibleQuestions.length - 1])
      return 
    }
    updatedVisibleQuestions.push(newVisibleQuestion)
    setCurrentQuestion(newVisibleQuestion)
    setVisibleQuestions(updatedVisibleQuestions)
  }

  const countAreaPrice = () => {
    const areaPercentage = (projectInfo.areaSizeToProtect / projectInfo.areaSizeToProtect) * 100
    let areaPriceCoeff  = 1.5
    let areaTypePrice = projectInfo.areaType === "Flat" ? 300 : (projectInfo.areaType === "Country Side" ? 500 : 1000)
    if (areaPercentage >= 90) {
      areaPriceCoeff = 2.3
    } else if (areaPercentage >= 70 && areaPercentage < 90) {
      areaPriceCoeff = 2
    } else if (areaPercentage >= 50 && areaPercentage < 70) {
      areaPriceCoeff = 1.7
    }
    return (areaTypePrice * areaPriceCoeff)
  } 

  const countEquipmentPrice = (eqName) => {
    // if (currentQuestion !== projectInfo.equipmentObjcts.length + 7) {return}
    const equipment = projectInfo.equipmentObjcts
    const eqPrices = utils.equipmentPrices
    const currentEquipment = equipment.find(eq => eq.name === eqName)
    const equipmentInfo = utils.getEqSpecsChoice(eqName, projectInfo.areaSizeToProtect).specs
    const basicEqPrice = eqName === "Cameras" ? eqPrices.camerasBasicPrice : (eqName === "Fire Alarms" ? eqPrices.fireAlarmsBasicPrice : eqPrices.doorLocksBasicPrice) 
    let eqPriceCoeff = 1.0
    if (eqName === "Cameras") {
      const indexOfResolution = equipmentInfo[0].findIndex(info => info.includes(currentEquipment.resolution))
      const indexOfType = equipmentInfo[1].findIndex(info => info.includes(currentEquipment.type))
      const indexOfStorageTime = equipmentInfo[2].findIndex(info => info.includes(currentEquipment.storageTime))
      if (indexOfResolution === 1) {
        eqPriceCoeff += 0.5
      } else if (indexOfResolution === 2) {
        eqPriceCoeff += 1.0
      }
      if (indexOfType === 1) {
        eqPriceCoeff += 0.5
      }
      if (indexOfStorageTime === 1) {
        eqPriceCoeff += 0.5
      } else if (indexOfStorageTime === 2) {
        eqPriceCoeff += 1.0
      }
      const numOfEq = projectInfo.serviceType === "Custom" ? parseInt(currentEquipment.numOfCameras.match(/\d+/)[0]) : parseInt(currentEquipment.numOfCameras)
      return (basicEqPrice * eqPriceCoeff) * numOfEq
    }

    if (eqName === "Fire Alarms") {
      const indexOfReaction = equipmentInfo[0].findIndex(info => info.includes(currentEquipment.reactionType))
      const indexOfReactionTime = equipmentInfo[1].findIndex(info => info.includes(currentEquipment.reactionTime))
      const indexOfWarningType = equipmentInfo[2].findIndex(info => info.includes(currentEquipment.warningType))
      if (indexOfReaction === 1) {
        eqPriceCoeff += 1.0
      } 
      if (indexOfReactionTime === 1) {
        eqPriceCoeff += 0.5
      } else if (indexOfReactionTime === 2) {
        eqPriceCoeff += 1.0
      }
      if (indexOfWarningType === 1) {
        eqPriceCoeff += 0.5
      } else if (indexOfWarningType === 2) {
        eqPriceCoeff += 1.0
      }
      const numOfEq = projectInfo.serviceType === "Custom" ? parseInt(currentEquipment.numOfAlarms.match(/\d+/)[0]) : parseInt(currentEquipment.numOfAlarms)
      console.log(eqPriceCoeff, basicEqPrice, numOfEq)
      return (basicEqPrice * eqPriceCoeff) * numOfEq
    }

    if (eqName === "Door Locks") {
      const indexOfLockType = equipmentInfo[0].findIndex(info => info.includes(currentEquipment.lockType))
      const indexOfSignalization = equipmentInfo[1].findIndex(info => info.includes(currentEquipment.signalization))
      const indexOfUnlocking = equipmentInfo[2].findIndex(info => info.includes(currentEquipment.unlockingType))
      if (indexOfLockType === 1) {
        eqPriceCoeff += 1.0
      } 
      if (indexOfSignalization === 1) {
        eqPriceCoeff += 0.5
      } else if (indexOfSignalization === 2) {
        eqPriceCoeff += 1.0
      }
      if (indexOfUnlocking === 1) {
        eqPriceCoeff += 1.0
      }
      return (basicEqPrice * eqPriceCoeff)
    }
  }

  const countServicePrice = (eqNames) => {
    const equipmentPrices = []
    eqNames.map(name => equipmentPrices.push(countEquipmentPrice(name)))
    const areaPrice = countAreaPrice()
    let eqPrice = 0
    for (let price of equipmentPrices) {
      eqPrice += price
    }
    return `Total Price: $${areaPrice + eqPrice}`
  }

  const renderSecondQ = () => {
    if (visibleQuestions.findIndex(q => q === 1) === -1) { return }

   return <Question 
      currentQuestion={currentQuestion}
      setCurrentQuestion={setCurrentQuestion}
      setNextQuestionVisible={updateVisibleQuestions}
      questionNum={1}
      questionHeading={"Service Type"}
      questionDescrptn={utils.secondQuestionDescription}
      questionOptions={["Standard", "Custom"]}
      questionInputs={[]}
      buttonInnerText={"NEXT"}
      setProjectInfo={setProjectInfo}
      projectInfo={projectInfo}
      isQuestionAvailable={currentQuestion === 1}
    />
  }


  const renderThirdQ = () => {
    if (visibleQuestions.findIndex(q => q === 2 || q === 7) === -1) { return }
   return <Question 
      currentQuestion={currentQuestion}
      setCurrentQuestion={setCurrentQuestion}
      setNextQuestionVisible={updateVisibleQuestions}
      updateEquipmentCustomInfo={updateEquipmentCustomInfo}
      questionNum={projectInfo.serviceType === "Standard" ? 2 : 7}
      questionHeading={"Equipment"}
      questionDescrptn={utils.thirdQuestionDescription}
      questionOptions={["Cameras", "Fire Alarms", "Door Locks"]}
      isMultipleChoice={true}
      questionInputs={[]}
      buttonInnerText={"NEXT"}
      setProjectInfo={setProjectInfo}
      projectInfo={projectInfo}
      isQuestionAvailable={currentQuestion === 2 || currentQuestion === 7}
    />
  }

  const renderEquipmentQs = () => {
      if (projectInfo.equipmentSet.length === 0 || projectInfo.serviceType === "Custom") { return }
    return projectInfo.equipmentSet.map((eq, i) => {
      if (visibleQuestions.findIndex(q => q === 3 + i) === -1) { return }
      return <Question 
      key={i}
      currentQuestion={currentQuestion}
      setCurrentQuestion={setCurrentQuestion}
      setNextQuestionVisible={updateVisibleQuestions}
      questionNum={3 + i}
      questionHeading={eq + " tier"}
      questionDescrptn={''}
      questionOptions={["Low", "Medium", "High"]}
      questionInputs={[]}
      buttonInnerText={"NEXT"}
      setProjectInfo={setProjectInfo}
      projectInfo={projectInfo}
      isQuestionAvailable={currentQuestion === 3 + i}
    />
    })
  }

  const renderEqSpecs = (eqSpecNames, specs, qNum, eqName) => {
    if (visibleQuestions.findIndex(q => q === qNum ) === -1) { return }
    const areAllSpecsChosen =  projectInfo.finalCustomSpecs.findIndex(eq => eq.eqName === eqName) !== -1
    return eqSpecNames.map((name, i) =>     
    {
      return <Question 
        key={name}
        currentQuestion={currentQuestion}
        visibleQuestions={visibleQuestions}
        eqName={eqName}
        setCurrentQuestion={setCurrentQuestion}
        setNextQuestionVisible={updateVisibleQuestions}
        customSpecsNum={eqSpecNames.length}
        questionNum={qNum}
        questionHeading={`${name}`}
        questionDescrptn={''}
        questionOptions={specs[i]}
        questionInputs={[]}
        buttonInnerText={"NEXT"}
        isButtonVisible={eqSpecNames.length - 1 === i ? areAllSpecsChosen : false}
        setProjectInfo={setProjectInfo}
        projectInfo={projectInfo}
        isQuestionAvailable={currentQuestion === qNum}/>
    })
  }

  const updateEquipmentCustomInfo = (eqSet) => {
    if (eqSet.length === 0 || projectInfo.serviceType === "Standard"){ return }
    const updatedProjectInfo = {...projectInfo}
    return eqSet.map(eq => {
      if (eq === "Cameras"){
        updatedProjectInfo.equipmentCustomInfo.camCustomInfo = utils.getEqSpecsChoice("Cameras", projectInfo.areaSizeToProtect)
      } else if (eq === "Fire Alarms") {
        updatedProjectInfo.equipmentCustomInfo.fireAlarmsCustomInfo = utils.getEqSpecsChoice("Fire Alarms", projectInfo.areaSizeToProtect)
      } else if (eq === "Door Locks") {
        updatedProjectInfo.equipmentCustomInfo.doorLocksCustomInfo = utils.getEqSpecsChoice("Door Locks", projectInfo.areaSizeToProtect)
      }
      setProjectInfo(updatedProjectInfo)
  })
}

  const setEquipmentInfo = (equipment, levelOfService, indexOfEqInOrder) => {
    const updatedProjectInfo = {...projectInfo} 
    if (checkIfEqPresent(equipment, indexOfEqInOrder)) {updatedProjectInfo.equipmentObjcts.splice(indexOfEqInOrder, 1)}
    if (equipment === "Cameras" && currentQuestion === 3 + indexOfEqInOrder) {
      const cameraSpecs = utils.setCamerasSpecs(levelOfService, projectInfo.areaSizeToProtect)
      const cameras = new Cameras(cameraSpecs.res, cameraSpecs.type, cameraSpecs.storageTime, cameraSpecs.quantity)
      updatedProjectInfo.equipmentObjcts.splice(indexOfEqInOrder, 1)
      updatedProjectInfo.equipmentObjcts.splice(indexOfEqInOrder, 0, cameras)
    }
    else if (equipment === "Fire Alarms" && currentQuestion === 3 + indexOfEqInOrder) {
      const fireAlarmsSpecs = utils.setFireAlarmsSpecs(levelOfService, projectInfo.areaSizeToProtect)
      const fireAlarms = new FireAlarms(fireAlarmsSpecs.reactionType, fireAlarmsSpecs.reactionTime, fireAlarmsSpecs.warningType, fireAlarmsSpecs.quantity)
      updatedProjectInfo.equipmentObjcts.splice(indexOfEqInOrder, 1)
      updatedProjectInfo.equipmentObjcts.splice(indexOfEqInOrder, 0, fireAlarms)
    } 
    else if (equipment === "Door Locks" && currentQuestion === 3 + indexOfEqInOrder) {
      const doorLocksSpecs = utils.setDoorLocksSpecs(levelOfService)
      const doorLocks = new DoorLocks(doorLocksSpecs.lockType, doorLocksSpecs.signalization, doorLocksSpecs.unlockingType)
      updatedProjectInfo.equipmentObjcts.splice(indexOfEqInOrder, 1)
      updatedProjectInfo.equipmentObjcts.splice(indexOfEqInOrder, 0, doorLocks)
    } 
    setProjectInfo(updatedProjectInfo)
    return
  }

  const checkIfEqPresent = (equipmnentName, index) => {
    return projectInfo.equipmentObjcts.findIndex((eq, i) => eq.name === equipmnentName && i !== index) !== -1
  }


  const setFinalProjectEquipment = (levelOfService) => {
    if (projectInfo.equipmentSet.length === 0) { return [{}]}
    projectInfo.equipmentSet.map((equipment, i) => {
      if (projectInfo.serviceType === "Standard") {
        setEquipmentInfo(equipment, levelOfService, i)
      } else if (projectInfo.serviceType === "Custom") {
        if (currentQuestion !== 8 + i) { return }
        setCustomEqSpecs(equipment)
      }
    })
  }

  const setCustomEquipmentInfo = (specs, eqName, indx) => {
    const updatedProjectInfo = {...projectInfo}
    if (checkIfEqPresent(eqName, indx)) {updatedProjectInfo.equipmentObjcts.splice(indx, 1)}
    if (eqName === "Cameras" && currentQuestion === 8 + indx) {
        updatedProjectInfo.equipmentObjcts.splice(indx, 1)
      const cameras = new Cameras(specs[0], specs[1], specs[2], specs[3])  
      updatedProjectInfo.equipmentObjcts.splice(indx, 0, cameras) 
    } else if (eqName === "Fire Alarms" && currentQuestion === 8 + indx) {
        updatedProjectInfo.equipmentObjcts.splice(indx, 1)
        const fireAlarms = new FireAlarms(specs[0], specs[1], specs[2], specs[3])   
        updatedProjectInfo.equipmentObjcts.splice(indx, 0, fireAlarms) 
    } else if (eqName === "Door Locks" && currentQuestion === 8 + indx) {
        updatedProjectInfo.equipmentObjcts.splice(indx, 1)
        const doorLocks = new DoorLocks(specs[0], specs[1], specs[2])   
        updatedProjectInfo.equipmentObjcts.splice(indx, 0, doorLocks) 
    }
    setProjectInfo(updatedProjectInfo)
  }

  const setCustomEqSpecs = (eqName) => {
    let eqSpecsInfo = []
    let indx = projectInfo.equipmentSet.indexOf(eqName)
    if (eqName === "Cameras") {
      eqSpecsInfo = projectInfo.equipmentCustomInfo.camCustomInfo
    } 
    if (eqName === "Fire Alarms") {
        eqSpecsInfo = projectInfo.equipmentCustomInfo.fireAlarmsCustomInfo
    } 
    if (eqName === "Door Locks"){
        eqSpecsInfo = projectInfo.equipmentCustomInfo.doorLocksCustomInfo
    }
    const finalSpecs = projectInfo.finalCustomSpecs.find(eq => eq.eqName === eqName)
    let specsInOrder = [] 
    if (projectInfo.finalCustomSpecs.length === 0) {return}
    eqSpecsInfo.specNames.map((name, i) => {
      for (let spec of finalSpecs.specs) {
        if (spec[0] === name) {
          specsInOrder.splice(i, 0, spec[1])
        }
      }
    })
    setCustomEquipmentInfo(specsInOrder, eqName, indx)
  }

  const renderResultField = () => {
    if (visibleQuestions[visibleQuestions.length - 1] !== projectInfo.equipmentSet.length + 3
      && visibleQuestions[visibleQuestions.length - 1] !== projectInfo.equipmentSet.length + 8) { return } 
    return  <ResultField countServicePrice={countServicePrice} projectInfo={projectInfo}/>
  }

  return (
    <div className="App">
      <Question 
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        setNextQuestionVisible={updateVisibleQuestions}
        questionNum={0}
        questionHeading={"Property Type"}
        questionDescrptn={utils.firstQuestionDescription}
        questionOptions={["Country Side", "Flat", "Industrial"]}
        questionInputs={["Whole Area (Square Meters)", "Area that needs surveillance (Square Meters)"]}
        inputPriority={true}
        isInputNumeric={true}
        buttonInnerText={"NEXT"}
        setProjectInfo={setProjectInfo}
        projectInfo={projectInfo}
        isQuestionAvailable={currentQuestion === 0}
      />
      {renderSecondQ()}
      {renderThirdQ()}
      {renderEquipmentQs()}
      {visibleQuestions[visibleQuestions.length - 1] >= 8 ? projectInfo.equipmentSet.map((eq, i) => {   
        if(eq === "Cameras") {
          const camSpecs = projectInfo.equipmentCustomInfo.camCustomInfo
          return <div><QuestionHeading>{`${eq} specs (Custom)`}</QuestionHeading>{renderEqSpecs(camSpecs.specNames, camSpecs.specs, 8 + i, eq)}</div>
        } else if (eq === "Fire Alarms") {
            const faSpecs = projectInfo.equipmentCustomInfo.fireAlarmsCustomInfo
            return <div><QuestionHeading>{`${eq} specs (Custom)`}</QuestionHeading>{renderEqSpecs(faSpecs.specNames, faSpecs.specs, 8 + i, eq)}</div>
        } else if (eq === "Door Locks") {
            const dlSpecs = projectInfo.equipmentCustomInfo.doorLocksCustomInfo
            return <div><QuestionHeading>{`${eq} specs (Custom)`}</QuestionHeading>{renderEqSpecs(dlSpecs.specNames, dlSpecs.specs, 8 + i, eq)}</div>
        }
        
      }) : ''} 
      {renderResultField()}
    </div>
  );
}

export default App;
