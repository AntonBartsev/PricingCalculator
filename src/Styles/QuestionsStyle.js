import styled from "styled-components";

export const QuestionLayoutOption = styled.div`
    display: flex;
    justify-content: center;
    width: 50%;
    flex-direction: row;
    pointer-events: ${props => props.isAvailable ? '' : 'none'};
    opacity: ${props => props.isAvailable ? '1' : '0.3'};;

`

export const QuestionLayoutInput = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    pointer-events: ${props => props.isAvailable ? '' : 'none'};
    opacity: ${props => props.isAvailable ? '1' : '0.3'};
`

export const QuestionHeading = styled.p`
    text-align: center;
    margin-bottom: 5px;
    margin-top: 50px;
    font-weight: bold;
    font-size: 20pt;
`

export const QuestionDescription = styled.p`
    text-align: center;
    font-size: 14pt;
`

export const QuestionDescriptionLayout = styled.div`
    width: 60%;
    margin-left: auto;
    margin-right: auto;
`

export const QuestionAvailabilityView = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

// export const QuestionEditLayout = styled.div`
//     position: relative;

// `

//   opacity: ${props => props.isAvailable ? "1" : "0.3"}

