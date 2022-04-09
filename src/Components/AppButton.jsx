import { AppButtonStyle } from "../Styles/AppButtonStyle";

const AppButton = (props) => {

    const setBtnOnClickArg = () => {
        if (props.innerText === "NEXT") {
            if (props.questionNum === 1 && props.chosenOption === "Custom") {
                return [props.questionNum + 6]
            }
            if (props.questionNum >= 3 && props.questionNum < 6) { 
                return [props.questionNum + 1, props.chosenOption]
            } 
            return [props.questionNum + 1]
        } else if (props.innerText === "EDIT") {
             return [props.questionNum]
        }
        else if (props.innerText === "DOWNLOAD PDF"){
            return [props.getPdfText()]
        }

    }
    
    
    return (
        <AppButtonStyle
        isLargerBtn={props.innerText === "DOWNLOAD PDF"}
        isVisible={props.currentQuestion !== props.questionNum}
        isEditButton={props.innerText === "EDIT"}
        onClick={() => props.onClickFunct(setBtnOnClickArg()[0], setBtnOnClickArg()[1])}>
        {props.innerText}
    </AppButtonStyle>
)
}

export default AppButton