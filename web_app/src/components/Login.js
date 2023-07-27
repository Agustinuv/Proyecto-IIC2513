import React, {useState} from "react";
import {MainDiv, FlexedDiv, LoginImg, LoginForm, Label, Input, ButtonsDiv, InputPassword, ErrorMsg} from './SessionStyle';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import API_routes from "../tools/routes";

const Login = (props) => {
    
    const [errorMessages, setErrorMessages] = useState('');
    const navigate = useNavigate();

    // Checks if the user has filled in the required fields
    const HandleSubmit = async (event) => {

        // Prevent page reload
        event.preventDefault();

        const {mail, password} = document.forms[0];
        let token = undefined;

        // Hacemos fetch de la información
        const formData = {mail: mail.value, password: password.value};
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            };

        fetch(API_routes.LOGIN, options)
        .then(response => {
            if (response.ok || response.status === 400) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(data => {
            if (data.error) {
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
        // const userData = userDatabase.find((user) => user.mail === mail.value);
        // if (userData) {
        //     if (userData.password !== password.value) {
        //         setErrorMessages({name: 'password', message: 'Password incorrect'});
        //     } else {
        //         navigate("/", {state: {user: userData.username}});
        //     }
        // } else {
        //     setErrorMessages({name: 'mail', message: 'Mail incorrect'});
        // }
    };
    

    return (
        <MainDiv>
            <FlexedDiv>
                <LoginImg src={'https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg'} alt="Login image"/>
                <h2>Login</h2>
                <ErrorMsg>{errorMessages}</ErrorMsg>
                <LoginForm onSubmit={HandleSubmit}>
                    <Label>
                        <Input type='text' name='mail' placeholder='Mail' />
                    </Label>
                    <Label>
                        <InputPassword type='password' name='password' placeholder='Password' />
                    </Label>
                    <ButtonsDiv>
                        <button type='submit'>Login</button>
                        <button  type='button' onClick={() => {navigate('/register')}}>Register</button>
                    </ButtonsDiv>
                </LoginForm>
            </FlexedDiv>
        </MainDiv>
    )
};




export default Login;