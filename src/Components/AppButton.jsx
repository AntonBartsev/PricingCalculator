import { AppButtonStyle } from "../Styles/AppButtonStyle";

// Application Button (Styled for application theme)
const AppButton = (props) => {
    // Set on click arguments for the button depending on the inner text passed
    const setBtnOnClickArg = () => {
        if (props.innerText === "NEXT") {
            // If service type question and "Custom" option is chosen
            if (props.questionNum === 1 && props.chosenOption === "Custom") {
                // Set next question number to 7 (Custom service functionality)
                return [props.questionNum + 6]
            }
            // if "Standard" option is chosen
            if (props.questionNum >= 3 && props.questionNum < 6) { 
                // Set next question number and pass chosen option for on click function
                return [props.questionNum + 1, props.chosenOption]
            } 
            // Otherwise set nex question number
            return [props.questionNum + 1]
        } else if (props.innerText === "EDIT") {
            // Pass current question number to activate question user wants to edit
             return [props.questionNum]
        }
        else if (props.innerText === "DOWNLOAD PDF"){
            // Set PDF text if download button is clicked
            return [props.getPdfText()]
        }

    }
    
    return (
        <AppButtonStyle
        // Style property to decide on button size
        isLargerBtn={props.innerText === "DOWNLOAD PDF"}
        // Style property to decide on button visibility
        isVisible={props.currentQuestion !== props.questionNum}
        // Style property to decide on button color
        isEditButton={props.innerText === "EDIT"}
        onClick={() => props.onClickFunct(setBtnOnClickArg()[0], setBtnOnClickArg()[1])}>
        {props.innerText}
    </AppButtonStyle>
)
}

export default AppButton