import React, {useState} from "react";
import {MainDiv, FlexedDiv, LoginImg, LoginForm, Label, Input, MyButton, ButtonsDiv, ErrorMsg} from '../SessionStyle';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';


const SellerLogin = (props) => {

    const navigate = useNavigate();

    const [errorMessages, setErrorMessages] = useState();





    // const SellersTable = () => {
    //     fetch('https://grupo32-backend.herokuapp.com/api/sellers')
    //         .then(response => response.json())
    //         .then(data => console.log(data))
    // };

    // Checks if the user has filled in the required fields
    const HandleSubmit = (event) => {

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

        fetch('https://grupo32-backend.herokuapp.com/seller/login', options)
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
                Cookies.set('seller', JSON.stringify(data));
                navigate('/');
                window.location.reload(false);
            }

        }).catch(error => {
            // Agregar una vista x de error
            console.log(error);
        });

    };


    return (
        <MainDiv>
            <FlexedDiv>
                <LoginImg src={'https://media.istockphoto.com/vectors/shop-icon-vector-id931130630?k=20&m=931130630&s=612x612&w=0&h=Cb9EmFfNH6WBR3wfb1zXr_Z-lm-xkVfxu0Ndxsfk20Y='} alt="Login image"/>
                <h2>Login as Shop</h2>
                <ErrorMsg>{errorMessages}</ErrorMsg>
                <LoginForm onSubmit={HandleSubmit}>
                    <Label>
                        <Input type='text' name='mail' placeholder='Mail' />
                    </Label>
                    <Label>
                        <Input type='password' name='password' placeholder='Contraseña' />
                    </Label>
                    <ButtonsDiv>
                        <MyButton type='button' onClick={() => {navigate('/seller_register')}} >Register</MyButton>
                        <MyButton type='submit' >Login</MyButton>
                    </ButtonsDiv>
                </LoginForm>
            </FlexedDiv>
        </MainDiv>
    )
};



export default SellerLogin;