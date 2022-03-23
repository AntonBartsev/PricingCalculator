import React, { useState } from "react";
import { ChoiceCardLayout } from "../Styles/ChoiceCardStyle";

const ChoiceCard = (props) => {

return (
    <ChoiceCardLayout onClick={(e) => props.renderOptionStyle(e, props.choiceText)} isOptionChosen={props.isOptionChosen} >  
        {props.choiceText}
    </ChoiceCardLayout>
)
}

export default ChoiceCard