import React, {useState, useEffect} from "react";
import {MainDiv, FlexedDiv, LoginImg, LoginForm, Label, MyButton, Input, ButtonsDiv, ErrorMsg} from '../SessionStyle'
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';


import styled from "styled-components";


const EditProfile = (props) => {

    const navigate = useNavigate();
    const [sellerData, setSellerData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

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
        return () => {mounted = false};
    }, []);

    // Checks if the user has filled in the required fields
    const HandleSubmit = (event) => {
        
        // Prevent page reload
        event.preventDefault();
        const {name, mail, location, new_password_1, new_password_2, old_password} = document.forms[0];

        // Revisamos si las contraseñas coinciden
        if (new_password_1.value !== new_password_2.value) {
            setErrorMessage('Contraseñas no coinciden');
        }
        else {
            const updateData = {
                name: name.value,
                mail: mail.value,
                location: location.value,
            };
            // Vemos si el usuario solicito un cambio de contraseña
            if (new_password_1.value !== '' && new_password_2.value !== '' && old_password.value !== '') {
                updateData.password = new_password_1.value;
                updateData.passwordConfirmation = new_password_2.value;
                updateData.oldPassword = old_password.value;
            }

            const sellerid = JSON.parse(Cookies.get('seller')).sellerid;
            const options = {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify(updateData),
            };
        
            fetch(`https://grupo32-backend.herokuapp.com/seller/update/${sellerid}`, options)
            .then(response => {
                if (response.ok || response.status === 400) {
                    return response.json();
                }
                throw new Error(response.statusText);
            }).then(data => {
                if (data.error) {
                    return setErrorMessage(data.error);
                }
                alert('Perfil actualizado');
                window.location.reload(false);
        
            }).catch(error => {
                // Agregar una vista x de error
                console.log(error);
            });
        }
    };


    return (
        <MainDiv>
            <FlexedDiv>
                <LoginImg src={'https://media.istockphoto.com/vectors/shop-icon-vector-id931130630?k=20&m=931130630&s=612x612&w=0&h=Cb9EmFfNH6WBR3wfb1zXr_Z-lm-xkVfxu0Ndxsfk20Y='} alt="Login image"/>
                <h2>Edit Profile</h2>
                <ErrorMsg>{errorMessage}</ErrorMsg>
                <LoginForm onSubmit={HandleSubmit}>
                    <Label>
                        <Input type='text' name='name' placeholder='Nuevo nombre tienda' defaultValue={sellerData.name} />
                    </Label>
                    <Label>
                        <Input type='text' name='mail' placeholder='Nuevo mail' defaultValue={sellerData.mail} />
                    </Label>
                    <Label>
                        <Input type='text' name='location' placeholder='Nueva ubicación' defaultValue={sellerData.location} />
                    </Label>
                    <Label>
                        <Input type='password' name='new_password_1' placeholder='Contraseña Nueva' />
                    </Label>
                    <Label>
                        <Input type='password' name='new_password_2' placeholder='Repetir Contraseña' />
                    </Label>
                    <PasswordLabel>
                        <Instruction>Para cambiar contraseña, ingrese la actual para confirmar</Instruction>
                        <Input type='password' name='old_password' placeholder='Contraseña Actual' />
                    </PasswordLabel>
                    <ButtonsDiv>
                        <MyButton type='submit' >Edit Profile</MyButton>
                        <MyButton onClick={() => {navigate('/seller_profile')}}>Cancel</MyButton>
                    </ButtonsDiv>
                </LoginForm>
            </FlexedDiv>
        </MainDiv>
    )
};


const Instruction = styled.p`
    text-align: center;
    font-size: 0.8em;
    color: #8c8c8c;
`;

const PasswordLabel = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 80%;
`;



export default EditProfile;