import React from "react";
import {useParams} from "react-router-dom"; // react-router-dom
import {useNavigate} from "react-router-dom"; // react-router-dom
import {MainDiv, FlexedDiv, LoginImg, LoginForm, Label, Input, ButtonsDiv, InputPassword, ErrorMsg} from '../SessionStyle';

const Update = (props) => {
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState({});
    
    const HandleSubmit = (event) => {
        event.preventDefault();

        // Prevent page reload
        

        const {fullName, mail, useName, password, passwordConfirmation} = document.forms[0];

        // See if user already exists
        // const userData = userDatabase.find((user) => user.mail === mail.value);
        // if(userData) {
        //     setErrorMessages({name: 'mail', message: 'Usuario ya existe'});
        // }

            if (password.value !== passwordConfirmation.value) {
                setErrorMessages('Contraseñas no coinciden');
            } 
            if (fullName.value === '' || mail.value === '' || useName.value === '' || password.value === '') {
                setErrorMessages('Por favor llene todos los campos');
            } else if (password.value.length < 6) {
                setErrorMessages('Contraseña demasiado corta');
            } else if (mail.value.indexOf('@') === -1 || mail.value.indexOf('.') === -1 || mail.value.indexOf(' ') !== -1) {
                setErrorMessages('Email inválido');
            } else {
                // Fetch data
                const formData = {
                    fullName: fullName.value,
                    userName: useName.value,
                    mail: mail.value,
                    password: password.value,
                    passwordConfirmation: passwordConfirmation.value};
                const options = {
                    method: 'PATCH',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                    };

                fetch('https://grupo32-backend.herokuapp.com/user/update/:id', options)
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
                        delete data.token;
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
        <>
            <MainDiv>
                <FlexedDiv>
                    <LoginImg src={'https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg'} alt="Login image"/>
                    <h2>Update</h2>
                    <ErrorMsg>{errorMessages}</ErrorMsg>
                    <LoginForm onSubmit={HandleSubmit}>
                        <Label>
                            <Input type='text' name='fullName' placeholder='Nombre completo' />
                        </Label>
                        <Label>
                            <Input type='text' name='mail' placeholder='Mail' />
                        </Label>
                        <Label>
                            <Input type='text' name='username' placeholder='Username' />
                        </Label>
                        <Label>
                            <Input type='text' name='password' placeholder='Contraseña' />
                        </Label>
                        <Label>
                            <Input type='text' name='paswordConfirmation' placeholder='Repita contraseña' />
                        </Label>
                        <ButtonsDiv>
                            <MyButton type='submit' >Update User</MyButton>
                        </ButtonsDiv>
                    </LoginForm>
                </FlexedDiv>
            </MainDiv>
        </>
    )
}   

export default Update;