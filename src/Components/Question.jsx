import {React, useState} from "react";
import { QuestionLayoutOption, QuestionLayoutInput, QuestionHeading, QuestionDescription, QuestionDescriptionLayout, QuestionAvailabilityView } from "../Styles/QuestionsStyle";
import AppButton from "./AppButton";
import ChoiceCard from "./ChoiceCard";
import InputField from "./InputField";
import {Disable} from "react-disable"


const Question = (props) => {
    const [chosenOption, setChosenOption] = useState('')
    const [isOptionChosen, setIsOptionChosen] = useState(false)
    const [valuesOfInputFields, setValuesOfInputFields] = useState([])
    const [areInputsFilled, setAreInputsFilled] = useState(false)
    
    


    const renderOptionStyle = (event, choiceText) => {
        if (event.target.innerText !== choiceText) { return }
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
                key={i} renderOptionStyle={renderOptionStyle}
                isOptionChosen={opt === chosenOption}
                choiceText={opt} />)
    }

    const isNumeric = (str) => {
        if (typeof str != "string") return false // we only process strings!  
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
    
    
    const updateProjectInfo = (inputs, currentChosenOption) => {
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
            updatedProjectInfo.serviceType = currentChosenOption
        }
        props.setProjectInfo(updatedProjectInfo)
        
    }

    const checkIfInputsAreFilled = (inputs, isInputCleared) => {
        if (props.questionInputs.length === 0 || !props.questionInputs) { return setAreInputsFilled(true) }
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
        <Disable disabled={!props.isQuestionAvailable}>
            <QuestionAvailabilityView>
                <QuestionDescriptionLayout>
                    <QuestionHeading>{props.questionHeading}</QuestionHeading>
                    <QuestionDescription>{props.questionDescrptn}</QuestionDescription>
                </QuestionDescriptionLayout>    
                <QuestionLayoutOption>
                    {renderQuestionOptions()}
                </QuestionLayoutOption>
                <QuestionLayoutInput>
                    {renderQuestionInputs()}
                    {isOptionChosen && (areInputsFilled || props.questionInputs.length === 0 || !props.questionInputs)
                        ?
                    <AppButton
                        onClickFunct={props.setNextQuestionVisible}
                        innerText={props.buttonInnerText}
                        questionNum={props.questionNum}/>
                        : ""
                    }

                </QuestionLayoutInput>
            </QuestionAvailabilityView>

        </Disable>

    )}

export default Question;