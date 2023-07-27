import React, {useState} from "react";
import {MainDiv, FlexedDiv, LoginImg, LoginForm, Label, Input, MyButton, ButtonsDiv, ErrorMsg} from '../SessionStyle';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';


const CreateFoodItem= (props) => {

    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState('');

    // Checks if the user has filled in the required fields
    const HandleSubmit = (event) => {

        // Prevent page reload
        event.preventDefault();
    
        const {name, price, details, img_url} = document.forms[0];
        const sellerid = JSON.parse(Cookies.get('seller')).sellerid;

        // Validaciones en frontend  
        if (name.value === '' || price.value === '' || details.value === '') {
            setErrorMessages('Por favor llene los campos de nombre, precio y descripción');
        } else {
            // Fetch data
            const formData = {
                name: name.value,
                price: price.value,
                details: details.value,
                sellerid: sellerid,
                has_img: img_url.value.length > 0 ? true : false,
                img_url: img_url.value};
            const options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                body: JSON.stringify(formData),
                };

            fetch('https://grupo32-backend.herokuapp.com/plate/create', options)
            .then(response => {
                if (response.ok || response.status === 400) {
                    return response.json();
                }
                throw new Error(response.statusText);
            }).then(data => {
                if (data.error) {
                    console.log(data.error);
                    setErrorMessages(data.error);
                } 
                alert('Plato creado con éxito');
                navigate('/seller_profile');
                window.location.reload();
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
                <h2>Nuevo Plato</h2>
                <ErrorMsg>{errorMessages}</ErrorMsg>
                <LoginForm onSubmit={HandleSubmit}>
                    <Label>
                        <Input type='text' name='name' placeholder='Nombre del Plato' />
                    </Label>
                    <Label>
                        <Input type='text' name='price' placeholder='Precio' />
                    </Label>
                    <Label>
                        <Input type='text' name='details' placeholder='Detalles' />
                    </Label>
                    <Label>
                        <Input type='url' name='img_url' placeholder='URL imagen' />
                    </Label>
                    <ButtonsDiv>
                        <MyButton type='button' onClick={() => {navigate('/seller_profile')}} >Cancelar</MyButton>
                        <MyButton type='submit' >Crear</MyButton>
                    </ButtonsDiv>
                </LoginForm>
            </FlexedDiv>
        </MainDiv>
    )
};



export default CreateFoodItem;