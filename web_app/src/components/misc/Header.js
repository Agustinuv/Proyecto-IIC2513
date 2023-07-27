import React from 'react'
import './Header.css'

const Header = (props) => {
    return (
        <header className="bg-image">
            <div className="bg-container">
                <h1>Bienvenido {props.name}</h1>
                <h2>Acá podrás encontrar todos los juegos del ramo Liderazgo Juego y Recreación!!</h2>
            </div>
        </header>
    )
}

export default Header;