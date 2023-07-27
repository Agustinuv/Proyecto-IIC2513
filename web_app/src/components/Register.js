import React, {useState} from "react";
import {MainDiv, FlexedDiv, LoginImg, LoginForm, Label, Input, MyButton, ButtonsDiv, ErrorMsg} from './SessionStyle';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie'
import API_routes from '../tools/routes'


const Register = (props) => {

    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState('');

    // Checks if the user has filled in the required fields
    const HandleSubmit = (event) => {

        // Prevent page reload
        event.preventDefault();

        const {realname, mail, username, password_1, password_2} = document.forms[0];
        let token = undefined;

        // See if user already exists
        // const userData = userDatabase.find((user) => user.mail === mail.value);
        // if(userData) {
        //     setErrorMessages({name: 'mail', message: 'Usuario ya existe'});
        // }

            if (password_1.value !== password_2.value) {
                setErrorMessages('Contraseñas no coinciden');
            } 
            if (realname.value === '' || mail.value === '' || username.value === '' || password_1.value === '') {
                setErrorMessages('Por favor llene todos los campos');
            } else if (password_1.value.length < 6) {
                setErrorMessages('Contraseña demasiado corta');
            } else if (mail.value.indexOf('@') === -1 || mail.value.indexOf('.') === -1 || mail.value.indexOf(' ') !== -1) {
                setErrorMessages('Email inválido');
            } else {
                // Fetch data
                const formData = {
                    fullName: realname.value,
                    userName: username.value,
                    mail: mail.value,
                    password: password_1.value,
                    passwordConfirmation: password_2.value};
                const options = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                    };

                fetch(API_routes.REGISTER, options)
                .then(response => {
                    if (response.ok || response.status === 400) {
                        return response.json();
                    }
                    throw new Error(response.statusText);
                }).then(data => {
                    if (data.error) {
                        console.log(data.error);
                        setErrorMessages(data.error);
                    } else {
                        localStorage.setItem('access_token', data.token);
                        delete data.token
                        Cookies.set('user', JSON.stringify(data));
                        navigate('/');
                        window.location.reload(false);
                    }
                }).catch(error => {
                    // Agregar una vista x de error
                    console.log(error);
                });
                
                // userDatabase.push({mail: mail.value, realname: realname.value, username: username.value, password: password_1.value});
                // navigate("/", {state: {user: username.value}});
            }
    };


    return (
        <MainDiv>
            <FlexedDiv>
                <LoginImg src={'https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg'} alt="Login image"/>
                <h2>Register</h2>
                <ErrorMsg>{errorMessages}</ErrorMsg>
                <LoginForm onSubmit={HandleSubmit}>
                    <Label>
                        <Input type='text' name='realname' placeholder='Nombre completo' />
                    </Label>
                    <Label>
                        <Input type='text' name='mail' placeholder='Mail' />
                    </Label>
                    <Label>
                        <Input type='text' name='username' placeholder='Username' />
                    </Label>
                    <Label>
                        <Input type='password' name='password_1' placeholder='Contraseña' />
                    </Label>
                    <Label>
                        <Input type='password' name='password_2' placeholder='Repetir contraseña' />
                    </Label>
                    <ButtonsDiv>
                        <MyButton type='button' onClick={() => {navigate('/login')}} >Login</MyButton>
                        <MyButton type='submit' >Register</MyButton>
                    </ButtonsDiv>
                </LoginForm>
            </FlexedDiv>
        </MainDiv>
    )
};



export default Register;