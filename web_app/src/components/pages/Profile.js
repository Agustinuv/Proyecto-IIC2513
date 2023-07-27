import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";

import styled from "styled-components";
import { MyButton } from "../SessionStyle";
import Cookies from "js-cookie";
import MyBookings from "./MyBookings";


const Profile = () => {
    
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [bookingData, setBookingData] = useState([]);

    const userid = JSON.parse(Cookies.get('user')).userid;

    if (userid === ""){

        alert('No hay ningún usuario logeado')
    };

    
    useEffect(() => {
        // Fetch data from database
        let mounted = true;
        const userid = JSON.parse(Cookies.get('user')).userid;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        };
        
        fetch(`https://grupo32-backend.herokuapp.com/user/profile/${userid}`, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(data => {
            let atributte = 'Usuario';
            if (data.admin ) {atributte = 'Administrador'}
            else if (data.moderator) {atributte = 'Moderador'}
            data.atributte = atributte;
            if (mounted) {
                setUserData(data);
            }
        }).catch(error => {
            // Agregar una vista x de error
            console.log(error);
        }).then(() => {
            fetch(`/booked_table/get-my-bookings/${userid}`, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            }).then(data => {
                if (mounted) {
                    setBookingData(data);
                }
            }).catch(error => {
                // Agregar una vista x de error
                console.log(error);
            });
        });


        return () => {mounted = false};
    }, []);
    

    const deleteUser = (event) => {

        const userid = JSON.parse(Cookies.get('user')).userid;
            const options = {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
            };
        
            fetch(`https://grupo32-backend.herokuapp.com/user/delete/${userid}`, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            }).then(data => {
                alert('Cuenta eliminada');
                navigate('/');
                window.location.reload();
        
            }).catch(error => {
                // Agregar una vista x de error
                console.log(error);
            });

    };
    
    return (
        <MainDiv>         
            <ProfileDetails>
                <ProfileDetailsLeft>
                    <ProfileImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV0R-WauiH6CaT4LXi9s8joCb2X5ZuwaDguw&usqp=CAU" />
                </ProfileDetailsLeft>
                <ProfileDetailsRight>
                    <ProfileItem>Name: {userData.fullname}</ProfileItem>
                    <ProfileItem>Username: {userData.username}</ProfileItem>
                    <ProfileItem>Email: {userData.mail}</ProfileItem>
                    <ProfileItem>Tipo: {userData.atributte}</ProfileItem>
                    <MyButtonEdited onClick={() => {navigate('/edit_profile/')}}>Editar Perfil</MyButtonEdited>
                    <MyButtonEdited onClick={() => {deleteUser()}}>Delete user</MyButtonEdited>
                </ProfileDetailsRight>
            </ProfileDetails>
            {/* <MyBookings  /> */}
            {bookingData.length > 0 ? <MyBookings bookingData={bookingData} /> : <div>No hay reservas</div>}
        </MainDiv>
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
    margin: 1rem;
    border-radius: 10px;
`;

const ProfileDetailsLeft = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

export default Profile;