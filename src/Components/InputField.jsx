import {InputFieldStyled, InputFieldDescription, InputLayout} from "../Styles/InputFieldStyle"
// Input field of the application
const InputField = (props) => {
    
    return(
        <InputLayout>
            <InputFieldDescription>{props.inputDescription}</InputFieldDescription>
            <InputFieldStyled onKeyUp={(e) => props.updateInputFieldsValues(e.target.value, props.inputNum, e)} />
        </InputLayout>
    )}

export default InputField;
