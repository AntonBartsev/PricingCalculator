import styled from 'styled-components'

export const ChoiceCardLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 18%;
    border: solid 1px #333;
    border-radius: 2%;
    margin-right: 10px;
    margin-top: 10px;
    margin-bottom: 30px;
    cursor: pointer;
    background-color: ${props => props.isOptionChosen ? "black" : "white"};
    color: ${props => props.isOptionChosen ? "white" : "black"}
`