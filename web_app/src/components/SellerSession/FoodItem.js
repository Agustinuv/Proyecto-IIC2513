import React from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

import { ButtonsDiv, MyButton } from "../SessionStyle";
import Cookies from "js-cookie";


const FoodItem = (props) => {

    const navigate = useNavigate();

    const deletePlate = (event) => {

        const options = {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
        };
    
        fetch(`https://grupo32-backend.herokuapp.com/plate/delete/${props.props.id}`, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(data => {
            alert('Plato eliminado');
            navigate('/seller_profile');
            window.location.reload();
    
        }).catch(error => {
            // Agregar una vista x de error
            console.log(error);
        });
    }

    const imTheSeller = () => {
        try {
            const my_sellerid = JSON.parse(Cookies.get('seller')).sellerid;          

            if (my_sellerid) {
                return (
                    <ButtonsDiv>
                        <MyButton onClick={() => {deletePlate()}}>Eliminar</MyButton>
                        <MyButton onClick={() => {navigate(`/edit_food_item/${props.props.id}`)}}>Editar</MyButton>
                    </ButtonsDiv>
                )
            }

        } catch (error) {
            
        }
    }
        
    
    const img_url = () => {
        if (props.props.has_img) {
            return props.props.img_url;
        } else {
            return "https://www.nicepng.com/png/detail/214-2148603_you-eat-ready-to-eat-food-icon.png" 
        }
    }

    return (
        <>
            <DetailsDiv>
                
                <LeftColumn>
                    <Image src={img_url()} alt="product" />
                    <h3>Precio: {props.props.price}</h3>
                </LeftColumn>
                <RightColumn>
                    <h1>{props.props.name}</h1>
                    <StyledDescription>
                        {props.props.details}
                    </StyledDescription>
                    {imTheSeller()}
                </RightColumn>
            </DetailsDiv>
        </>
    )
};


const DetailsDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 3em 3em 0em 3em;
    padding: 1em;
    background-color: #f5f5f5;
    width: 80%;
    border-radius: 1em;
    border: black solid 0.1em;
`

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0.5em;
    // background-color: red;
    width: 20%;
    height: 100%;
    align-items: center;
    justify-content: center;
`

const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0.5em;
    // background-color: blue;
    width: 70%;
    height: 100%;
    align-items: center;
    justify-content: center;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    background-color: gray;
    border-radius: 0.5em;
    margin: 0.5em;
    shadow: 0px 0px 10px #000000;
`

const StyledDescription = styled.p`
    font-size: 1em;
    font-style: italic;
    margin: 0.5em;
    `

    export default FoodItem;