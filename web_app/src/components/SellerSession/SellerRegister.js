import React, {useState} from "react";
import {MainDiv, FlexedDiv, LoginImg, LoginForm, Label, Input, MyButton, ButtonsDiv, ErrorMsg} from '../SessionStyle';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';


const SellerRegister= (props) => {

    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState('');

    // Checks if the user has filled in the required fields
    const HandleSubmit = (event) => {

        // Prevent page reload
        event.preventDefault();
    
        const {name, mail, location, password_1, password_2} = document.forms[0];
        let token = undefined;

        // Validaciones en frontend
        if (password_1.value !== password_2.value) {
            setErrorMessages('Contraseñas no coinciden');
        } 
        if (name.value === '' || mail.value === '' || location.value === '' || password_1.value === '') {
            setErrorMessages('Por favor llene todos los campos');
        } else if (password_1.value.length < 6) {
            setErrorMessages('Contraseña demasiado corta');
        } else if (mail.value.indexOf('@') === -1 || mail.value.indexOf('.') === -1 || mail.value.indexOf(' ') !== -1) {
            setErrorMessages('Email inválido');
        } else {
                // Fetch data
                const formData = {
                    name: name.value,
                    mail: mail.value,
                    location: location.value,
                    password: password_1.value,
                    passwordConfirmation: password_2.value};
                const options = {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                    };
    
                fetch('https://grupo32-backend.herokuapp.com/seller/sign-in', options)
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
                        Cookies.set('seller', JSON.stringify(data));
                        navigate('/');
                        window.location.reload(false);
                    }
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
                <h2>Register as Shop</h2>
                <ErrorMsg>{errorMessages}</ErrorMsg>
                <LoginForm onSubmit={HandleSubmit}>
                    <Label>
                        <Input type='text' name='name' placeholder='Nombre de la tienda' />
                    </Label>
                    <Label>
                        <Input type='text' name='mail' placeholder='Mail' />
                    </Label>
                    <Label>
                        <Input type='text' name='location' placeholder='Ubicación' />
                    </Label>
                    <Label>
                        <Input type='password' name='password_1' placeholder='Contraseña' />
                    </Label>
                    <Label>
                        <Input type='password' name='password_2' placeholder='Repetir contraseña' />
                    </Label>
                    <ButtonsDiv>
                        <MyButton type='button' onClick={() => {navigate('/seller')}} >Login</MyButton>
                        <MyButton type='submit' >Register</MyButton>
                    </ButtonsDiv>
                </LoginForm>
            </FlexedDiv>
        </MainDiv>
    )
};



export default SellerRegister;