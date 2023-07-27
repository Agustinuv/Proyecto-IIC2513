import React from 'react'
import './Place.css'
import { useState, useEffect } from 'react';
import API_routes from '../../tools/routes';
import { Link } from 'react-router-dom';

const Place = () => {

    // fetch data from backend
    const [gamesData, setGamesData] = useState([]);

    useEffect(() => {
        // Fetch data from database
        let mounted = true;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        fetch(API_routes.ALL_GAMES, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(data => {
            if (mounted) {
                setGamesData(data);
            }
        }).catch(error => {
            // Agregar una vista x de error
            console.log(error);
        });
        return () => {mounted = false};
    }, []);

    const showSellers = () => {

        let header = 1;

        if (gamesData.length > 0) {
            return gamesData.map((game, index) => {
                header = (header % 4) + 1;
                return (
                    <div className="columns">
                        <ul className="price">
                            <li className={`col-header${header}`}>{game.name}</li>
                            <li className="grey">
                            <Link to={`/game/${game.id}`}>
                                <button className="button">Ver más</button>
                            </Link>
                            </li>
                        </ul>
                    </div>
                );
            });
        } else {
            return <p>No hay juegos todavía :c</p>
        }
    };

    return (
        <section className="content-container">
            <div className="places-card-container">
                {showSellers()}
            </div>
        </section>
    );
}

export default Place;