import { FieldContainer, HeadingMain, EquipmentInfoCard, EquipmentHeading, EquipmentInfoContainer, EquipmentInfoSubHeading, EquipmentInfoText, EquipmentInfoUnitContainer, PriceField } from "../Styles/ResultFieldStyle"
import jsPDF from "jspdf"
import AppButton from "./AppButton"
// Result field of the project 
const ResultField = (props) => {

const saveProjectInfoAsPDF = (pdfText) => {
    const doc = new jsPDF()
    doc.setFontSize(10)
    doc.text(10, 25, pdfText)
    doc.save('Your_Project_Summary.pdf')
}

// set PDF text from project information
    const getPdfText= () => {
        let updatedPdfText = 
        `                      Project Summary


        ${props.countServicePrice(props.projectInfo.equipmentSet)}

        Area Type: ${props.projectInfo.areaType} 

        Area Size: 

            Whole Area: ${props.projectInfo.wholeAreaSize}

            To Protect: ${props.projectInfo.areaSizeToProtect}
        
        `
        props.projectInfo.equipmentSet.map((eqName, i) => {
            const obj = props.projectInfo.equipmentObjcts[i]
            if (eqName === "Cameras") {
                updatedPdfText = updatedPdfText.concat(
                    `
                    
        ${obj.name}

            Resolution: ${obj.resolution}
            Cameras type: ${obj.type}
            Storage time: ${obj.storageTime}
            Number of cameras: ${obj.numOfCameras}`
                )
            } else if (eqName === "Fire Alarms"){
                updatedPdfText = updatedPdfText.concat(
                    `

        ${obj.name}

            Reaction Type: ${obj.reactionType}
            Reaction Time: ${obj.reactionTime}
            Warning Type: ${obj.warningType}
            Number of alarm units: ${obj.numOfAlarms}`
                )
            } else if (eqName === "Door Locks") {
                updatedPdfText = updatedPdfText.concat(
                    `

        ${obj.name}

            Lock Type: ${obj.lockType}
            Signilization: ${obj.signalization}
            Unlocking Type: ${obj.unlockingType}
                        `
                )
            }
        })

        return updatedPdfText
    }

    // Render equipment information
    const renderEqInfo = (eqName, obj) => {
        if (eqName === "Cameras") {
            return <div>
                <EquipmentHeading>{obj.name}</EquipmentHeading>
                <EquipmentInfoContainer>
                    <EquipmentInfoUnitContainer>
                        <EquipmentInfoSubHeading>Resolution: </EquipmentInfoSubHeading>
                        <EquipmentInfoText>{obj.resolution}</EquipmentInfoText>
                    </EquipmentInfoUnitContainer>
                    <EquipmentInfoUnitContainer>
                        <EquipmentInfoSubHeading>Cameras type: </EquipmentInfoSubHeading>
                        <EquipmentInfoText>{obj.type}</EquipmentInfoText>
                    </EquipmentInfoUnitContainer>
                    <EquipmentInfoUnitContainer>
                        <EquipmentInfoSubHeading>Storage time: </EquipmentInfoSubHeading>
                        <EquipmentInfoText>{obj.storageTime}</EquipmentInfoText>
                    </EquipmentInfoUnitContainer>
                    <EquipmentInfoUnitContainer>
                        <EquipmentInfoSubHeading>Number of cameras: </EquipmentInfoSubHeading>
                        <EquipmentInfoText>{obj.numOfCameras}</EquipmentInfoText>
                    </EquipmentInfoUnitContainer>
                </EquipmentInfoContainer>
            </div>
            
        } else if (eqName === "Fire Alarms") {
            return <div>
                <EquipmentHeading>{obj.name}</EquipmentHeading>
                <EquipmentInfoContainer>
                    <EquipmentInfoUnitContainer>
                        <EquipmentInfoSubHeading>Reaction Type: </EquipmentInfoSubHeading>
                        <EquipmentInfoText>{obj.reactionType}</EquipmentInfoText>
                    </EquipmentInfoUnitContainer>
                    <EquipmentInfoUnitContainer>
                        <EquipmentInfoSubHeading>Reaction Time: </EquipmentInfoSubHeading>
                        <EquipmentInfoText>{obj.reactionTime}</EquipmentInfoText>
                    </EquipmentInfoUnitContainer>
                </EquipmentInfoContainer>
                <EquipmentInfoUnitContainer>
                        <EquipmentInfoSubHeading>Warning Type: </EquipmentInfoSubHeading>
                        <EquipmentInfoText>{obj.warningType}</EquipmentInfoText>
                    </EquipmentInfoUnitContainer>
                    <EquipmentInfoUnitContainer>
                        <EquipmentInfoSubHeading>Number of alarm units: </EquipmentInfoSubHeading>
                        <EquipmentInfoText>{obj.numOfAlarms}</EquipmentInfoText>
                    </EquipmentInfoUnitContainer>
            </div>

        }
        else if (eqName === "Door Locks") {
            return <div>
            <EquipmentHeading>{obj.name}</EquipmentHeading>
                <EquipmentInfoContainer>
                    <EquipmentInfoUnitContainer>
                        <EquipmentInfoSubHeading>Lock Type: </EquipmentInfoSubHeading>
                        <EquipmentInfoText>{obj.lockType}</EquipmentInfoText>
                    </EquipmentInfoUnitContainer>
                    <EquipmentInfoUnitContainer>
                        <EquipmentInfoSubHeading>Signilization: </EquipmentInfoSubHeading>
                        <EquipmentInfoText>{obj.signalization}</EquipmentInfoText>
                    </EquipmentInfoUnitContainer>
                    <EquipmentInfoUnitContainer>
                        <EquipmentInfoSubHeading>Unlocking Type: </EquipmentInfoSubHeading>
                        <EquipmentInfoText>{obj.unlockingType}</EquipmentInfoText>
                    </EquipmentInfoUnitContainer>
                </EquipmentInfoContainer>
                </div>
        }
    }



    return (
        <FieldContainer>
            <HeadingMain>Your Project Summary:</HeadingMain>
            <PriceField>{props.countServicePrice(props.projectInfo.equipmentSet)}</PriceField>
            <EquipmentInfoCard>
                <EquipmentHeading>General Information</EquipmentHeading>
                <EquipmentInfoContainer>
                    <EquipmentInfoSubHeading>Area type:</EquipmentInfoSubHeading>
                    <EquipmentInfoText>{props.projectInfo.areaType}</EquipmentInfoText>
                    <EquipmentInfoSubHeading>Area size:</EquipmentInfoSubHeading>
                    <EquipmentInfoSubHeading>Whole (Square Meters): </EquipmentInfoSubHeading>
                    <EquipmentInfoText>{props.projectInfo.wholeAreaSize}</EquipmentInfoText>
                    <EquipmentInfoSubHeading>To protect (Square Meters): </EquipmentInfoSubHeading>
                <EquipmentInfoText>{props.projectInfo.areaSizeToProtect}</EquipmentInfoText>
            </EquipmentInfoContainer>

            </EquipmentInfoCard>
            {props.projectInfo.equipmentSet.map((eq, i) => <EquipmentInfoCard key={i}>
                {renderEqInfo(eq, props.projectInfo.equipmentObjcts[i])}
                </EquipmentInfoCard>)}
                <AppButton 
                innerText={'DOWNLOAD PDF'} 
                getPdfText={getPdfText}
                onClickFunct={saveProjectInfoAsPDF}/>
        </FieldContainer>
    )
}

export default ResultField