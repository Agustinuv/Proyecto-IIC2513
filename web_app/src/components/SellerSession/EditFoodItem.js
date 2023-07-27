import React, {useState, useEffect} from "react";
import {MainDiv, FlexedDiv, LoginImg, LoginForm, Label, MyButton, Input, ButtonsDiv, ErrorMsg} from '../SessionStyle'
import {useNavigate, useParams} from "react-router-dom";


const EditFoodItem = (props) => {

    const navigate = useNavigate();
    const [plateData, setPlateData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const { plateid } = useParams();

    useEffect(() => {
        // Fetch data from database
        let mounted = true;
        const options = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
        };
    
        fetch(`https://grupo32-backend.herokuapp.com/plate/details/${plateid}`, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(data => {
            if (mounted) {
                setPlateData(data);
            }
            console.log(data);
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
        const {name, price, details, img_url} = document.forms[0];

        if (img_url.value){
            plateData.has_img = true;
        } else {
            plateData.has_img = false;
        }

        const updateData = {
            name: name.value,
            price: price.value,
            details: details.value,
            has_img: plateData.has_img,
            img_url: img_url.value
        };

        const options = {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify(updateData),
        };
    
        fetch(`https://grupo32-backend.herokuapp.com/plate/update/${plateid}`, options)
        .then(response => {
            if (response.ok || response.status === 400) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(data => {
            if (data.error) {
                return setErrorMessage(data.error);
            }
            alert('Plato actualizado');
            navigate('/seller_profile');
            window.location.reload();
    
        }).catch(error => {
            // Agregar una vista x de error
            console.log(error);
        });
        
    };


    return (
        <MainDiv>
            <FlexedDiv>
                <LoginImg src= {plateData.img_url} alt="plate image"/>
                <h2>Editar Plato</h2>
                <ErrorMsg>{errorMessage}</ErrorMsg>
                <LoginForm onSubmit={HandleSubmit}>
                    <Label>
                        <Input type='text' name='name' placeholder='Nuevo nombre del plato' defaultValue={plateData.name} />
                    </Label>
                    <Label>
                        <Input type='text' name='price' placeholder='Nuevo precio' defaultValue={plateData.price} />
                    </Label>
                    <Label>
                        <Input type='text' name='details' placeholder='Nuevos detalles' defaultValue={plateData.details} />
                    </Label>
                    <Label>
                        <Input type='url' name='img_url' placeholder='URL nueva imagen' />
                    </Label>
                    
                    <ButtonsDiv>
                        <MyButton type='submit' >Edit Profile</MyButton>
                        <MyButton onClick={() => {navigate('/seller_profile')}}>Cancel</MyButton>
                    </ButtonsDiv>
                </LoginForm>
            </FlexedDiv>
        </MainDiv>
    )
};



export default EditFoodItem;