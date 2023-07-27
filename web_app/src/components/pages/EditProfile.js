import React, {useState, useEffect} from "react";
import {MainDiv, FlexedDiv, LoginImg, LoginForm, Label, MyButton, Input, ButtonsDiv, ErrorMsg} from '../SessionStyle'
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';


import styled from "styled-components";


const EditProfile = (props) => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

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
            if (mounted) {
                setUserData(data);
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
        const {realname, mail, username, new_password_1, new_password_2, old_password} = document.forms[0];

        // Revisamos si las contraseñas coinciden
        if (new_password_1.value !== new_password_2.value) {
            setErrorMessage('Contraseñas no coinciden');
        }
        else {
            const updateData = {
                fullName: realname.value,
                userName: username.value,
                mail: mail.value,
            };
            // Vemos si el usuario solicito un cambio de contraseña
            if (new_password_1.value !== '' && new_password_2.value !== '' && old_password.value !== '') {
                updateData.password = new_password_1.value;
                updateData.passwordConfirmation = new_password_2.value;
                updateData.oldPassword = old_password.value;
            }

            const userid = JSON.parse(Cookies.get('user')).userid;
            const options = {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify(updateData),
            };
        
            fetch(`https://grupo32-backend.herokuapp.com/user/update/${userid}`, options)
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
                <LoginImg src={'https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg'} alt="Login image"/>
                <h2>Edit Profile</h2>
                <ErrorMsg>{errorMessage}</ErrorMsg>
                <LoginForm onSubmit={HandleSubmit}>
                    <Label>
                        <Input type='text' name='realname' placeholder='Nuevo nombre completo' defaultValue={userData.fullname} />
                    </Label>
                    <Label>
                        <Input type='text' name='mail' placeholder='Nuevo mail' defaultValue={userData.mail} />
                    </Label>
                    <Label>
                        <Input type='text' name='username' placeholder='Nuevo username' defaultValue={userData.username} />
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
                        <MyButton onClick={() => {navigate('/profile/')}}>Cancel</MyButton>
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