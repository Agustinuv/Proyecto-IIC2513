import React from 'react'
import { Link } from "react-router-dom"

import './Footer.css'

const Footer = () => {
    return (
        <div className="footer">
            <ul>
                <li><Link to="/">Home</Link></li>
                {/* <li><Link to="/AboutUs">Nosotros</Link></li> */}
            </ul>

            <ul className="social">
                <li>
                    <a href="https://www.instagram.com/arecrearcl/"><i className="fa fa-instagram"></i></a>
                </li>
            </ul>

            <p>&copy; Liderarazgo Juego y Recreación SPA</p>
        </div>
    );
}

export default Footer;