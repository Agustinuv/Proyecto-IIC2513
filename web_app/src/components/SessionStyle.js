// El estilo de MyButton fue inspirado en código de https://copy-paste-css.com/

import styled from 'styled-components';

const MainDiv = styled.div`
    display: flex; 
    flex-direction: row;
    // align-items: center;
    justify-content: center;

    margin: 5em 3em 0em 3.5em;
    padding: 0.75em;
    // border-radius: 10px;
    width: 90%;

    background-color: #f5f5f5;
    `;

const FlexedDiv = styled.div` 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 30%;
    margin: 3em;
    padding: 1em;
    border-radius: 10px;

    background-color: white;

    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"
    `;

const LoginImg = styled.img`
    width: 200px;
    `;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;

const Label = styled.label`
    margin: 0.5em;
    `;

const Input = styled.input`
    border-color: #f5f5f5;
    border-radius: 4px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 5px -8px;"
    `

const InputPassword = styled.input`
    border-color: #f5f5f5;
    border-radius: 4px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 5px -8px;"
    width: 100%;
    height: 50px;
    border-radius: 4px;
    background-color: rgba(104, 105, 102, 0.1);
    margin-top: 20px;
    outline: none;
    padding-left: 40px;
    font-size: 22px;
    `;


const ButtonsDiv = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 1em;
    `;  

const MyButton = styled.button`
    display: inline-block;
    outline: none;
    cursor: pointer;
    font-size: 0.8em;
    border-radius: 1em;
    transition-property: background-color,border-color,color,box-shadow,filter;
    transition-duration: .3s;
    border: 1px solid transparent;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    white-space: normal;
    font-weight: 700;
    text-align: center;
    padding: 0.5em;
    margin-left: 0.5em;
    margin-right: 0.5em;
    color: #616467;
    box-shadow: inset 0 0 0 2px #616467;
    background-color: transparent;
    &:hover{
        color: #fff;
        background-color: #616467;
    }
`;

const ErrorMsg = styled.div`
    font-size: 14px;
    font-color: black;
    align-self: center;
    align-items: center;
    `;



export {MainDiv, FlexedDiv, LoginImg, LoginForm, Label, Input, MyButton, ButtonsDiv, InputPassword, ErrorMsg};