import React, { useEffect } from "react";
import {InputFieldStyled, InputFieldDescription, InputLayout} from "../Styles/InputFieldStyle"

const InputField = (props) => {

    return(
        <InputLayout>
            <InputFieldDescription>{props.inputDescription}</InputFieldDescription>
            <InputFieldStyled onChange={(e) => props.updateInputFieldsValues(e.target.value)}/>
        </InputLayout>
    )}

export default InputField;
