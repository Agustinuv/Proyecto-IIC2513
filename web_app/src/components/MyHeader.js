import React from "react";
import styled from 'styled-components';

const MyHeader = (props) => {
    return (
        <HeaderDiv>
            <LogoImg src={'https://s3.amazonaws.com/thumbnails.venngage.com/template/9f596769-790d-4b5f-bb80-668016a9c920.png'} alt="Logo"/>
            <NavBar>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
            </NavBar>
        </HeaderDiv>
    )};

const HeaderDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #f5f5f5;
    width: 90%;
    
    margin: 0.5em;
    padding: 0.75em;
    border-radius: 10px;
    `

const LogoImg = styled.img`
    width: 75px;
    margin-left: 0.5em;
    border-radius: 8px;
    `;

const NavBar = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    `

const NavLink = styled.a`
    margin: 0.5em;
    text-decoration: none;
    color: black;
    font-weight: bold;
    font-size: 1em;
    cursor: pointer;
    &:hover {
        color: #787878;
    };`

export default MyHeader; 