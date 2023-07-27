import {useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { MyButton, ButtonsDiv } from "../SessionStyle";
import FoodItem from "./FoodItem";

import Cookies from "js-cookie";

const SellerProfile = () => {

    const navigate = useNavigate();
    // const {seller_name, seller_mail, seller_ubication, seller_id} = JSON.parse(localStorage.getItem('seller'));
   
    // const {food_items} = JSON.parse(localStorage.getItem('seller'));
    
    const sellerid = JSON.parse(Cookies.get('seller')).sellerid;

    const [sellerData, setSellerData] = useState({});
    const [foodItems, setFoodItems] = useState([]);


    if (sellerid===""){
        alert('No hay ningún usuario logeado')
    };

    useEffect(() => {
        // Fetch data from database
        let mounted = true;

        const sellerid = JSON.parse(Cookies.get('seller')).sellerid;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        };

        fetch(`https://grupo32-backend.herokuapp.com/seller/profile/${sellerid}`, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(data => {
            if (mounted) {
                setSellerData(data);
            }
        }).catch(error => {
            // Agregar una vista x de error
            console.log(error);
        });
        
        fetch(`https://grupo32-backend.herokuapp.com/plate/plates/${sellerid}`, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(data => {
            if (mounted) {
                if (data.length>0){
                    setFoodItems(data);
                } else {
                    setFoodItems([]);
                }
                
            }
        }).catch(error => {
            // Agregar una vista x de error
            console.log(error);
        });
        
        return () => {mounted = false};
    }, []);

    const showPlates = () => {
        if (foodItems.length > 0){
            return foodItems.map((foodItem) => {
                return (<FoodItem props={foodItem} />
                );
            }).reverse();
        } else {
            return (<div>No hay platos</div>);
        }
    };

    const deleteSeller = (event) => {

        const sellerid = JSON.parse(Cookies.get('seller')).sellerid;
            const options = {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            };
        
            fetch(`https://grupo32-backend.herokuapp.com/seller/delete/${sellerid}`, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            }).then(data => {
                alert('Tienda eliminada');
                navigate('/');
                window.location.reload();
        
            }).catch(error => {
                // Agregar una vista x de error
                console.log(error);
            });
    }

    return (
        <>
            <MainDiv>         
                <ProfileDetails>
                    <ProfileDetailsLeft>
                        <ProfileImage src="https://png.pngtree.com/png-clipart/20190313/ourlarge/pngtree-planar-cartoon-street-view-shop-restaurant-and-vendor-elements-png-image_848867.jpg" />
                    </ProfileDetailsLeft>
                    <ProfileDetailsRight>
                        <ProfileItem>Restaurant name: {sellerData.name}</ProfileItem>
                        <ProfileItem>Email: {sellerData.mail}</ProfileItem>
                        <ProfileItem>Ubicación: {sellerData.location}</ProfileItem>
                        <ButtonsDiv>
                            <MyButtonEdited onClick={() => {navigate('/edit_seller_profile')}}>Editar Perfil</MyButtonEdited>
                            <MyButtonEdited onClick={() => {navigate('/new_food_item')}}>Nuevo plato</MyButtonEdited>
                            <MyButtonEdited onClick={() => {deleteSeller()}}>Borrar tienda</MyButtonEdited>
                        </ButtonsDiv>
                    </ProfileDetailsRight>
                </ProfileDetails>
                <FoodItems>
                    {showPlates()}
                </FoodItems>
            </MainDiv>
        </>
    );
}


const MyButtonEdited = styled(MyButton)`
    max-width: 200px;
    `;

const MainDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-top: 10%;
    margin-bottom: 10%;
`;

const ProfileDetails = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 70%;
    height: 100%;
    background-color: #f5f5f5;
    padding: 1rem;

    border-radius: 10px;
`;

const FoodItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70%;
    `;

const ProfileDetailsLeft = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-width: 30%;
    height: 100%;
    background-color: #f5f5f5;
    padding: 1rem;
    margin: 1rem;
`;

const ProfileImage = styled.img`
    height: 200px;
    width: 200px;
    border-radius: 50%;
    border: 1px solid #e5e5e5;
`;

const ProfileDetailsRight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    padding: 1rem;
    margin: 1rem;
`;

const ProfileItem = styled.div`
    font-size: 1.2rem;
    margin: 0.5rem;
    `;



export default SellerProfile;