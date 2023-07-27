import './Testimonials.css'

import NewCommentary from './NewCommentary'
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';



const Testimonials = () => {

    const [comments, setComments] = useState([]);
    const seller_id = useParams().sellerid;

    const getComments = () => {
        let mounted = true;
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        fetch(`https://grupo32-backend.herokuapp.com/comment/get-comments/${seller_id}`, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            }).then(data => {
                if (mounted) {
                    if (data.comments.length > 0) {
                        setComments(data.comments);
                    } else {
                        setComments([]);
                    }
                }
            }).catch(error => {
                // Agregar una vista x de error
                console.log(error);
            });
        return () => { mounted = false };
    }

    useEffect(() => {
        getComments();
    }, []);

    const addComment = () => {

        try {
            const user_id = JSON.parse(Cookies.get('user')).userid;
            if (user_id) {
                return (
                    <NewCommentary update={getComments} />
                )
            }
        } catch (error) {
        }
    };

    return (
        <section className="content-container">

            <div className="textArea">
                <h2>Comentarios ({comments.length})</h2>
            </div>
            {addComment()}
        </section>
    )
};






export default Testimonials;