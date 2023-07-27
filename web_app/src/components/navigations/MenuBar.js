import React from 'react'
import './MenuBar.css'
import { useNavigate } from 'react-router-dom'

const MenuBar = (props) => {
    const navigate = useNavigate();
    
    return (
        <nav className="header">
            <div className="nav-wrapper">
                <a className="logo" href='/'>Liderar SPA</a>
                <input className="menu-btn" type="checkbox" id="menu-btn"/>
                <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                <ul className="menu">
                    <li><button onClick={()=> navigate("/")}>Home</button></li>
                </ul>
            </div>
        </nav>
    )
}


export default MenuBar;