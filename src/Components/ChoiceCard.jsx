import React, { useState } from "react";
import { ChoiceCardLayout } from "../Styles/ChoiceCardStyle";

const ChoiceCard = (props) => {

return (
    <ChoiceCardLayout isAvailable={props.isAvailable} onClick={(e) => props.renderOptionStyle(e, props.choiceText)} isOptionChosen={props.isOptionChosen} >  
        {props.choiceText}
    </ChoiceCardLayout>
)
}

export default ChoiceCard