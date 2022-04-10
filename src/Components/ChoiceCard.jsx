import { ChoiceCardLayout } from "../Styles/ChoiceCardStyle";
// Choice card of the application
const ChoiceCard = (props) => {

return (
    <ChoiceCardLayout 
        onClick={(e) => props.setOptionStyle(e, props.choiceText)} 
        // Style property to decide on option color
        isOptionChosen={props.isOptionChosen}>  
        {props.choiceText}
    </ChoiceCardLayout>
)
}

export default ChoiceCard