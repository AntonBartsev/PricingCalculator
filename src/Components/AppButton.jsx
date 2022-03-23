import React from "react";
import { AppButtonStyle } from "../Styles/AppButtonStyle";

const AppButton = (props) => {

return(
    <AppButtonStyle onClick={() => props.setNextQuestionVisible(props.questionNum + 1)}>{props.innerText}</AppButtonStyle>
)
}

export default AppButton