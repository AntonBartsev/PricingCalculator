import {useState} from "react";
import { QuestionLayoutOption, QuestionLayoutInput, QuestionHeading, QuestionDescription, QuestionDescriptionLayout, QuestionAvailabilityView } from "../Styles/QuestionsStyle";
import AppButton from "./AppButton";
import ChoiceCard from "./ChoiceCard";
import InputField from "./InputField";


const Question = (props) => {
    const [chosenOption, setChosenOption] = useState('')
    const [multipleChoice, setMultipleChoice] = useState([])
    const [isOptionChosen, setIsOptionChosen] = useState(false)
    const [valuesOfInputFields, setValuesOfInputFields] = useState([])
    const [areInputsFilled, setAreInputsFilled] = useState(false)
    const [areCustomSpecsChosen, setAreCustomSpecsChosen] = useState(false)
    
    
    const noInputsInQuestion = () => {
        return props.questionInputs.length === 0 || !props.questionInputs
    }

    const isCustomEqQuestion = props.questionNum >= 8 && props.questionNum < 11


    const updateCustomChoiceStatus = (opt) => {
                const updatedProjectInfo = {...props.projectInfo}
                const indexOfDublicate = updatedProjectInfo.chosenCustomSpecs.findIndex(spec => spec[0] === props.questionHeading)
                if (indexOfDublicate !== - 1){
                    updatedProjectInfo.chosenCustomSpecs.splice(indexOfDublicate, 1) 
                }   
                updatedProjectInfo.chosenCustomSpecs.push([props.questionHeading, opt])
                if (updatedProjectInfo.chosenCustomSpecs.length === props.customSpecsNum) {
                    let chosenSpecs = []
                    updatedProjectInfo.chosenCustomSpecs.map(spec => chosenSpecs.push(spec))
                    updatedProjectInfo.finalCustomSpecs.push({eqName: props.eqName, specs: chosenSpecs})
                    updatedProjectInfo.chosenCustomSpecs.length = 0
                    setAreCustomSpecsChosen(true)
                }
                props.setProjectInfo(updatedProjectInfo)
    }


    const setOptionStyle = (event, choiceText) => {
        if (event.target.innerText !== choiceText && !props.isMultipleChoice) { return }
        if (props.isMultipleChoice) {
            const updatedMultipleChoice = [...multipleChoice]
            const index = multipleChoice.findIndex(opt => choiceText === opt)
            if (index !== -1) { 
                updatedMultipleChoice.splice(index, 1) 
            } else { 
                updatedMultipleChoice.push(choiceText) 
            }
            if (updatedMultipleChoice.length === 0) {
                setIsOptionChosen(false)
                setMultipleChoice(updatedMultipleChoice)
                updateProjectInfo([], '', updatedMultipleChoice)
                return
            }
            setIsOptionChosen(true)
            setMultipleChoice(updatedMultipleChoice)
            updateProjectInfo([], '', updatedMultipleChoice)
            return
        }
        if (props.questionNum >= 8 && props.questionNum < 11) {
            updateCustomChoiceStatus(choiceText)
        }
        setChosenOption(choiceText)
        setIsOptionChosen(true)
        updateProjectInfo([], choiceText)
    }

    const renderQuestionInputs = () => {
        if (props.questionInputs.length === 0) {
            return ''
        }
        return props.questionInputs.map((descr, i) =>
            <InputField
                updateInputFieldsValues={updateInputFieldsValues}
                inputNum={i}
                inputDescription={descr}
                key={i} />)
    }

    const renderQuestionOptions = () => {
        return props.questionOptions.map((opt, i) =>
            <ChoiceCard
                key={i} 
                setOptionStyle={setOptionStyle}
                isOptionChosen={props.isMultipleChoice ? multipleChoice.findIndex(option => option === opt) !== -1 : opt === chosenOption}
                choiceText={opt} />
        )    
    }

    const isNumeric = (str) => {
        if (typeof str !== "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    const setExpectedInput = (event, inputFieldValue) => {
        const eventValue = event.target.value
        if ((event.keyCode !== 8 && (event.keyCode < 48 || event.keyCode > 58)) || (eventValue.length === 1 && eventValue === '0')) {
            let input = event.target.value
            event.target.value = input.slice(0, -1)
            return inputFieldValue = ''
        }
        return inputFieldValue
    }
    
    const updateInputFieldsValues = (inputFieldValue, inputNum, event) => {
        if (props.isInputNumeric) { inputFieldValue = setExpectedInput(event, inputFieldValue) }
        if (!isNumeric(inputFieldValue) && event.keyCode !== 8) { return }
        let isInputCleared = false
        if (event.keyCode === 8) {
            isInputCleared = event.target.value.length === 0
        }
        if (inputFieldValue.length > 1 || (inputFieldValue.length === 1 && valuesOfInputFields.length === 2)) {
            valuesOfInputFields.splice(inputNum, 1)
        }
        if (event.keyCode === 8 && inputFieldValue === '') {
            valuesOfInputFields.splice(inputNum, 1)
        }
        const updatedInputs = [...valuesOfInputFields]
        updatedInputs.splice(inputNum, 0, inputFieldValue)
        setValuesOfInputFields(updatedInputs)
        checkIfInputsAreFilled(updatedInputs, isInputCleared)
        updateProjectInfo(updatedInputs, '')
    }
    
    
    const updateProjectInfo = (inputs, currentChosenOption, multipleChoices) => {
        const updatedProjectInfo = { ...props.projectInfo }
        if (props.questionNum === 0) {
            if (currentChosenOption.length > 0 && inputs.length === 2) {
                updatedProjectInfo.areaType = currentChosenOption
                updatedProjectInfo.wholeAreaSize = parseFloat(inputs[0])
                updatedProjectInfo.areaSizeToProtect = parseFloat(inputs[1])
            } else if (currentChosenOption.length > 0) {
                updatedProjectInfo.areaType = currentChosenOption
            } else if (inputs.length === 2) {
                updatedProjectInfo.wholeAreaSize = parseFloat(inputs[0])
                updatedProjectInfo.areaSizeToProtect = parseFloat(inputs[1])
            }
        } else if (props.questionNum === 1) {
            if (updatedProjectInfo.serviceType.length > 0){
                updatedProjectInfo.equipmentSet.length = 0
            }
            updatedProjectInfo.serviceType = currentChosenOption
        } else if (props.questionNum === 2 || props.questionNum === 7) {
            updatedProjectInfo.equipmentSet = multipleChoices
            if (props.questionNum === 7){
                props.updateEquipmentCustomInfo(updatedProjectInfo.equipmentSet)
            }
        } 
        props.setProjectInfo(updatedProjectInfo)
        
    }

    const checkIfInputsAreFilled = (inputs, isInputCleared) => {
        if (noInputsInQuestion()) { return setAreInputsFilled(true) }
        if (isInputCleared) {
            return setAreInputsFilled(false)
        }
        if (inputs.length !== props.questionInputs.length) {
            return setAreInputsFilled(false)
        }
        if (props.inputPriority && inputs.length === props.questionInputs.length) {
            return parseFloat(inputs[0]) >= parseFloat(inputs[1]) ? setAreInputsFilled(true) : setAreInputsFilled(false)
        }

        return setAreInputsFilled(true)
    }
    
    return (
        <QuestionAvailabilityView>
                <QuestionDescriptionLayout>
                    <QuestionHeading>{props.questionHeading}</QuestionHeading>
                    <QuestionDescription>{props.questionDescrptn}</QuestionDescription>
                </QuestionDescriptionLayout>  
                <QuestionLayoutOption isAvailable={props.isQuestionAvailable}>
                    {renderQuestionOptions()}
                </QuestionLayoutOption>
                <QuestionLayoutInput isAvailable={props.isQuestionAvailable}>
                    {renderQuestionInputs()}
                    {(isCustomEqQuestion ? (props.questionNum >= 8 && props.questionNum < 11 && props.isButtonVisible) : isOptionChosen && (areInputsFilled || noInputsInQuestion()))
                        ?
                    <AppButton
                        currentQuestion={props.currentQuestion}
                        onClickFunct={props.setNextQuestionVisible}
                        innerText={props.buttonInnerText}
                        chosenOption={chosenOption}
                        projectInfo={props.projectInfo}
                        areCustomSpecsChosen={areCustomSpecsChosen}
                        questionNum={props.questionNum}
                        isButtonVisible={props.isButtonVisible}
                        />
                        : ""
                    }
                </QuestionLayoutInput>
                    <AppButton
                        currentQuestion={props.currentQuestion}
                        questionNum={props.questionNum}
                        onClickFunct={props.setCurrentQuestion}
                        innerText={"EDIT"}/>
                </QuestionAvailabilityView>
    )}

export default Question;