import styled from "styled-components";


export const AppButtonStyle = styled.div`
    position: ${props => props.isEditButton ? 'absolute' : ''};
    width: ${props => props.isLargerBtn ? '120px' : '80px'};
    height: 40px;
    background-color: ${props => props.isEditButton ? 'red' : '#3898EC'};
    text-align: center;
    color: white;
    line-height: 40px;
    cursor: pointer;
    z-index: 3;
    display: ${props => props.isEditButton ? (props.isVisible ? '' : 'none') : ''};
`
export const EditButtonWrapper = styled.div`
    position: relative;
`