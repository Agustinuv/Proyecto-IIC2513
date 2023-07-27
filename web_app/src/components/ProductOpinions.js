import React from "react";
import styled from "styled-components";

const ProductOpinions = (props) => {
    return (
        <OpiniosContainer>
            <OpiniosRows>
                <LeftColumn>
                    <p>Nombre: Nacho Sánchez</p>
                    <li>Grado de satisfacción: 10/10</li>
                    <li>Tiempo de espera: 6 minutos</li>
                    <li>Calidad de la comida: 10/10</li>
                </LeftColumn>
                <RightColumn>
                    <h4>Opiniones</h4>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris euismod, nunc eget consectetur vehicula, nisi nunc
                        interdum nisl, euismod euismod nunc nisl euismod nunc.
                    </p>
                </RightColumn>
            </OpiniosRows>
        </OpiniosContainer>
    );
};

const OpiniosContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1em;
    padding: 1em;
    background-color: #D3D3D3;
    width: 90%;
    border-radius: 1em;
    `

const OpiniosRows = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 0.25em;
    padding: 0.25em;
    `



const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 30%;
    align-items: flex-start;
    justify-content: center;
    `

const RightColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    // margin: 0.5em;
    // background-color: blue;
    width: 60%;
    height: 100%;
    // align-items: center;
    justify-content: flex-start;
    `


export default ProductOpinions;