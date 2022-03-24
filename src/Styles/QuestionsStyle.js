import styled from "styled-components";

export const QuestionLayoutOption = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: start;
`

export const QuestionLayoutInput = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
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
`

//   opacity: ${props => props.isAvailable ? "1" : "0.3"}

