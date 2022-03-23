import {React, useState} from "react";
import { QuestionLayoutOption, QuestionLayoutInput, QuestionHeading, QuestionDescription, QuestionDescriptionLayout } from "../Styles/QuestionsStyle";
import AppButton from "./AppButton";
import ChoiceCard from "./ChoiceCard";
import InputField from "./InputField";


const Question = (props) => {
    const [chosenOption, setChosenOption] = useState('')
    const [isOptionChosen, setIsOptionChosen] = useState(false)
    const [valuesOfInputFields, setValuesOfInputFields] = useState([])
    const [areInputsFilled, setAreInputsFilled] = useState(false)


    const renderOptionStyle = (event, choiceText) => {
        if (event.target.innerText !== choiceText) { return }
        setChosenOption(choiceText) 
        setIsOptionChosen(true)
    }

    const renderQuestionInputs = () => {
        if (props.questionInputs.length === 0) {
            return ''
        }
        return props.questionInputs.map((descr, i) => <InputField updateInputFieldsValues={updateInputFieldsValues} inputDescription={descr} key={i}/>)
    }

    const renderQuestionOptions = () => {
        return props.questionOptions.map((opt, i) => 
            <ChoiceCard key={i} renderOptionStyle={renderOptionStyle} isOptionChosen={opt === chosenOption} choiceText={opt}/>)
    }

    const isNumeric = (str) => {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
      } 



    const updateInputFieldsValues = (inputFieldValue) => {
        if (!isNumeric(inputFieldValue)) { return }
        if (inputFieldValue.length === 0) { return }
        console.log("called")
        const updatedInputs = [...valuesOfInputFields]
        updatedInputs.push(inputFieldValue)
        setValuesOfInputFields(updatedInputs)
        checkIfInputsAreFilled()
    }

    const checkIfInputsAreFilled = () => {
        if (props.questionInputs.length === 0 || !props.questionInputs) { return setAreInputsFilled(true) }
        if (valuesOfInputFields.length !== props.questionInputs.length) { return setAreInputsFilled(false) }
        return setAreInputsFilled(true)
    }
return (
    <div>
        <QuestionDescriptionLayout>
            <QuestionHeading>{props.questionHeading}</QuestionHeading>
            <QuestionDescription>{props.questionDescrptn}</QuestionDescription>
        </QuestionDescriptionLayout>    
        <QuestionLayoutOption>
            {renderQuestionOptions()}
        </QuestionLayoutOption>
        <QuestionLayoutInput>
            {renderQuestionInputs()}
            {isOptionChosen && areInputsFilled
                ?
                    <AppButton setNextQuestionVisible={props.setNextQuestionVisible} innerText={props.buttonInnerText} questionNum={props.questionNum}/>
                : ""
            }

        </QuestionLayoutInput>
    </div>
    )}

export default Question;