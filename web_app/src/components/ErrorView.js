import React from 'react';
import {useNavigate} from "react-router-dom";

import styled from 'styled-components';

const ErrorView = () => {

    const navigate = useNavigate();

    let error = '404';
    let error_description = 'Page not found';


    return (
        <>
            <MainDiv>
                <TopMessage>
                    <h1>Oops! Error {error}</h1>
                </TopMessage>
                <Image onClick={() => {navigate('/')}}>
                    <img src="https://image.shutterstock.com/image-vector/metallic-blue-toaster-two-burnt-260nw-1185060958.jpg" alt="error tring to load page"/>
                </Image>
                <BottomMessage>
                    <p>{error_description}</p>
                </BottomMessage>
            </MainDiv>

        </>
    );
}

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #f5f5f5;
`;

const TopMessage = styled.div`
`;

const Image = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    width: 100vw;
    background-color: #f5f5f5;
    cursor: pointer;
`;


const BottomMessage = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: space-between;
`;

export default ErrorView;