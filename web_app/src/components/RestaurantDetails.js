import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";

import API_routes from "../tools/routes";


const RestaurantDetails = () => {

    let params = useParams();

    const [gameData, setGameData] = useState({});
    const [loading, setLoading] = useState(true);

    const showGoals = (goals) => {
        if (!goals) {
            return;
        }
        return goals.map((goal) => {
            return (
                <li key={goal.id}>
                    {goal.name}
                </li>
            );
        });
    }




    useEffect(() => {
        // Fetch data from database
        let mounted = true;
        const gameId = parseInt(params.gameId);
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        };
        console.log(`${API_routes.GAME}/${gameId}`)
        fetch(`${API_routes.GAME}/${gameId}`, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(data => {
            if (mounted) {
                setGameData(data);
            }
        }).then(() => {
            setLoading(false);
        }).catch(error => {
            // Agregar una vista x de error
            console.log(error);
        });
        return () => {mounted = false};
    }, [params.gameId]);
    if (loading) {
        return (<main style={{ padding: "1rem", margin: "10em"}}><p style={{textalign: "center"}}>There's nothing here!</p></main>);
    }
    
    return (
        <MainColumn>
            <DetailsDiv>
                <LeftColumn>
                    <Image src='https://i.pinimg.com/236x/07/84/70/078470b342c853221aac96e54838fd69.jpg' alt="image of a restaurant" />
                </LeftColumn>
                <RightColumn>
                    <h1>{gameData.name}</h1>
                    <h2>
                        {/* Ubicación: {gameData.location} */}
                    </h2>
                    <StyledList>
                        <li>{gameData.rules}</li>
                        {showGoals(gameData.goals)}
                    </StyledList>
                </RightColumn>
            </DetailsDiv>
        </MainColumn>
    );
}


const MainColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 100%;
    padding: 1rem;
    margin: 6em 3em 0em 6em;
    background-color: #f5f5f5;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);

    @media (max-width: 768px) {
        margin: 2em;
        width: 90%;
    }
`;

const DetailsDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: #f5f5f5;
    width: 80%;
    border-radius: 1em;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0.5em;
    width: 20%;
    height: 100%;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0.5em;
    width: 70%;
    height: 100%;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    background-color: gray;
    border-radius: 0.5em;
    margin: 0.5em;
    shadow: 0px 0px 10px #000000;

    @media (max-width: 768px) {
        width: 80%;
    }
`;

const StyledList = styled.ul`
    margin: 10px 0px;
    list-style: none;
`;


export default RestaurantDetails;