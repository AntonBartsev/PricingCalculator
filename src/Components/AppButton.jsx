import {React, useState} from "react";
import { Disable } from "react-disable";
import { AppButtonStyle } from "../Styles/AppButtonStyle";

const AppButton = (props) => {
    const [disableForm, setDisableForm] = useState(true)

    const setBtnOnClickArg = () => {
        if (props.innerText === "NEXT") {
            return props.questionNum + 1
        } else if (props.innerText === "BACK") {
            if (props.currentQuestion - 1 === 0) {
                setDisableForm(true)
            } else {setDisableForm(false)}
             return props.currentQuestion - 1
        }
            
     }
    
    
    return (
        <Disable disabled={props.innerText === "BACK" ? disableForm : false}>
            <AppButtonStyle
                onClick={() => props.onClickFunct(setBtnOnClickArg())}>
                {props.innerText}
            </AppButtonStyle>
        </Disable>

)
}

export default AppButton