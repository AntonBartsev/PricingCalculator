import {useState} from "react";
import { QuestionLayoutOption, QuestionLayoutInput, QuestionHeading, QuestionDescription, QuestionDescriptionLayout, QuestionAvailabilityView } from "../Styles/QuestionsStyle";
import AppButton from "./AppButton";
import ChoiceCard from "./ChoiceCard";
import InputField from "./InputField";

// Question - stage of the application including app button, 
// choice cards and inputs in it according to the passed properties
const Question = (props) => {
    // Option chosen by user
    const [chosenOption, setChosenOption] = useState('')
    // Property that affects functionality of the Question - if true, multiple choice is possible
    const [multipleChoice, setMultipleChoice] = useState([])
    // True if at least one option is chosen
    const [isOptionChosen, setIsOptionChosen] = useState(false)
    // Array, containing input fields values
    const [valuesOfInputFields, setValuesOfInputFields] = useState([])
    // True if all input fields have input
    const [areInputsFilled, setAreInputsFilled] = useState(false)
    // True if all custom specifications of an equipment are chosen 
    const [areCustomSpecsChosen, setAreCustomSpecsChosen] = useState(false)
    
    // True if there are no input fields needed in question - not provided
    const noInputsInQuestion = props.questionInputs.length === 0 || !props.questionInputs
    // True if a question contains custom equipment choice
    const isCustomEqQuestion = props.questionNum >= 8 && props.questionNum < 11

    // Update custom choice status and handle project information update when editing specification choice
    const updateCustomChoiceStatus = (opt) => {
                const updatedProjectInfo = {...props.projectInfo}
                // 1 / 2 / 3 depending on the chosen equipment will comply with this equipment's specifications in the object if was added there before
                let index = props.questionNum - 8
                // If specification is unchosen = -1, if specification is chosen, 
                // will give the index of that specification in the chosenCustomSpecs array
                const indexOfDublicateCurrentSpec = updatedProjectInfo.chosenCustomSpecs.findIndex(spec => spec[0] === props.questionHeading)
                // if specifications of the equipment were added as final information
                if (updatedProjectInfo.finalCustomSpecs[index]){
                    // if those specifications come by name that is not the same in the equipmentSet - chosen equipment array
                    if (updatedProjectInfo.finalCustomSpecs[index].eqName !== updatedProjectInfo.equipmentSet[index]){
                        // Remove specifications of that equipment from projectInfo object
                        updatedProjectInfo.finalCustomSpecs.splice(index, 1)
                    // if name that specifications come by is the same in the ordered equipmentSet array - find the index of dublicate specification
                    } else {
                        const indexOfDublicateSavedSpec = updatedProjectInfo.finalCustomSpecs[index].specs.findIndex(spec => spec[0] === props.questionHeading)
                        // if dublicate specification is present as final specifications information
                        if (indexOfDublicateSavedSpec !== -1) {
                            // Remove specification by index
                            updatedProjectInfo.finalCustomSpecs[index].specs.splice(indexOfDublicateSavedSpec, 1)
                            // Add the most recent specification to that index
                            updatedProjectInfo.finalCustomSpecs[index].specs.splice(indexOfDublicateSavedSpec, 0, [props.questionHeading, opt])
                        }
                    }
                // If there is a dublicate when all specifications are not yet chosen
                } else if (indexOfDublicateCurrentSpec !== -1) {
                    // Switch old specification with a new one on the same index
                    updatedProjectInfo.chosenCustomSpecs.splice(indexOfDublicateCurrentSpec, 1) 
                    updatedProjectInfo.chosenCustomSpecs.splice(indexOfDublicateCurrentSpec, 0, [props.questionHeading, opt]) 
                    // if a completely new specification is chosen
                } else if (indexOfDublicateCurrentSpec === -1 && !updatedProjectInfo.finalCustomSpecs[index]){
                    // Add specification to the currently chosen specifications for this equipment
                    updatedProjectInfo.chosenCustomSpecs.push([props.questionHeading, opt])
                    // if all specification choices are completed
                    if (updatedProjectInfo.chosenCustomSpecs.length === props.customSpecsNum) {
                        // Put all currently chosen specifications into the array 
                        let chosenSpecs = []
                        updatedProjectInfo.chosenCustomSpecs.map(spec => chosenSpecs.push(spec))
                        // Add that array as specifications of the equipment by given name in the object
                        updatedProjectInfo.finalCustomSpecs.push({eqName: props.eqName, specs: chosenSpecs})
                        // Clear currently chosen specifications array
                        updatedProjectInfo.chosenCustomSpecs.length = 0
                        // Set all custom specifications of the equipment are chosen
                        setAreCustomSpecsChosen(true)
                    }

                }
                // Update project information
                props.setProjectInfo(updatedProjectInfo)
    }

    // Set choice card style
    const setOptionStyle = (event, choiceText) => {
        // If not multiple choice and another option is chosen
        if (event.target.innerText !== choiceText && !props.isMultipleChoice) { return }
        if (props.isMultipleChoice) {
            const updatedMultipleChoice = [...multipleChoice]
            // Find index of an option in the multiple choice array
            const index = multipleChoice.findIndex(opt => choiceText === opt)
            // If option present
            if (index !== -1) { 
                // Remove this option from the multiple choice array
                updatedMultipleChoice.splice(index, 1) 
            // If option is not present there, add it
            } else { 
                updatedMultipleChoice.push(choiceText) 
            }
            // If no options chosen
            if (updatedMultipleChoice.length === 0) {
                // Update state of the application 
                setIsOptionChosen(false)
                setMultipleChoice(updatedMultipleChoice)
                updateProjectInfo([], '', updatedMultipleChoice)
                return
            }
            // If at least one option is chosen
            setIsOptionChosen(true)
            setMultipleChoice(updatedMultipleChoice)
            updateProjectInfo([], '', updatedMultipleChoice)
            return
        }
        // If the service type is custom 
        if (isCustomEqQuestion) {
            updateCustomChoiceStatus(choiceText)
        }
        // Update state
        setChosenOption(choiceText)
        setIsOptionChosen(true)
        updateProjectInfo([], choiceText)
    }

    // Render input fields on the page
    const renderQuestionInputs = () => {
        // if unput fields are not required
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

    // Render question option cards
    const renderQuestionOptions = () => {
        return props.questionOptions.map((opt, i) =>
            <ChoiceCard
                key={i} 
                setOptionStyle={setOptionStyle}
                isOptionChosen={props.isMultipleChoice ? multipleChoice.findIndex(option => option === opt) !== -1 : opt === chosenOption}
                choiceText={opt} />
        )    
    }

    // Function checks if string is a number 
    const isNumeric = (str) => {
        if (typeof str !== "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    // Set input of a user to be correct 
    const setExpectedInput = (event, inputFieldValue) => {
        const eventValue = event.target.value
        // if not backspace, and not number is the last pressed key or the first value passed is zero
        if ((event.keyCode !== 8 && (event.keyCode < 48 || event.keyCode > 58)) || (eventValue.length === 1 && eventValue === '0')) {
            // Remove last input
            let input = event.target.value
            event.target.value = input.slice(0, -1)
            return inputFieldValue = ''
        }
        return inputFieldValue
    }
    
    // Update input fields values 
    const updateInputFieldsValues = (inputFieldValue, inputNum, event) => {
        // If input must be numeric, prevent unexpected input
        if (props.isInputNumeric) { inputFieldValue = setExpectedInput(event, inputFieldValue) }
        // If input is not numeric and last key pressed is not a backspace
        if (!isNumeric(inputFieldValue) && event.keyCode !== 8) { return }
        // Check if input field is empty 
        let isInputCleared = false
        if (event.keyCode === 8) {
            isInputCleared = event.target.value.length === 0
        }
        // Update input fields values 
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
    
    // Update project information 
    const updateProjectInfo = (inputs, currentChosenOption, multipleChoices) => {
        const updatedProjectInfo = { ...props.projectInfo }
        if (props.questionNum === 0) {
            // Inputs filled and option is chosen 
            if (currentChosenOption.length > 0 && inputs.length === 2) {
                // update project information 
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
            if (updatedProjectInfo.serviceType.length > 0) {
                updatedProjectInfo.equipmentSet.length = 0
                updatedProjectInfo.equipmentObjcts.length = 0
            }
            updatedProjectInfo.serviceType = currentChosenOption
        // If equipment choice
        } else if (props.questionNum === 2 || props.questionNum === 7) {
            updatedProjectInfo.equipmentSet = multipleChoices
            if (props.questionNum === 7){
                props.updateEquipmentCustomInfo(updatedProjectInfo.equipmentSet)
            }
        } 
        props.setProjectInfo(updatedProjectInfo)
    }

    const checkIfInputsAreFilled = (inputs, isInputCleared) => {
        if (noInputsInQuestion) { return setAreInputsFilled(true) }
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
                    {(isCustomEqQuestion ? (isCustomEqQuestion && props.isButtonVisible) : isOptionChosen && (areInputsFilled || noInputsInQuestion))
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
                        innerText={"EDIT"}
                        />
                </QuestionAvailabilityView>
    )}

export default Question;