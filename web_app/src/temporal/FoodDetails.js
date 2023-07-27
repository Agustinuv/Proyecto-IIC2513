import React from 'react';
import ProductDetails from '../components/ProductDetails';
import ProductOpinios from '../components/ProductOpinios';
import styled from 'styled-components';

const FoodDetails = (props) => {
    return (
        <>
        <ProductDetails />
        <DetailsDiv>
            <H2_Opinion>Reseñas de usuarios</H2_Opinion>
            <ProductOpinios />
            <ProductOpinios />
        </DetailsDiv>
        </>
    )
}

const DetailsDiv = styled.div`
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
    margin: 1em;
    padding: 1em;
    background-color: #f5f5f5;
    width: 80%;
    border-radius: 1em;
}`

const H2_Opinion = styled.h2`
  padding-left: 1em;
  `


export default FoodDetails;