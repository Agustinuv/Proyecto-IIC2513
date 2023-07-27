
import './chat.css'
import { MyButton } from '../SessionStyle';
import { useLocation, useParams } from "react-router-dom";
import ErrorView from '../ErrorView';
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const Chat = (props) => {

    const seller_img = 'https://i.imgur.com/DY6gND0.png'
    const buyer_img = 'https://i.imgur.com/HYcn9xO.png'
    const socket = io();
    const user_id = JSON.parse(Cookies.get('user')).userid;
    const [messages, setMessages] = useState([]);
    const list_messages = [];

    const handleSubmit = (event) => {
        const {message} = document.forms[0];
        event.preventDefault();
        if (message.value.length > 0) {
            socket.emit('chat message', {message: message.value, user_id: user_id});
            message.value = '';
        }
    };

    const isDuplicate = (data, obj) => {
       return data.some(v => (v.message === obj.message && v.user_id === obj.user_id));
    }

    
    const showMessages = () => {

        if (messages.length > 0) {
            return messages.map((message) => {
                if (message.user_id !== user_id) {
                    return (
                        <li className="other">
                            <div className="avatar"><img src={seller_img} alt="user chat img" /></div>
                            <div className="msg">
                                <p>{message.message}</p>
                                <time>20:17</time>
                            </div>
                        </li>
                    );
                } else {
                    return (
                    <li className="self">
                        <div className="avatar"><img src={buyer_img} alt="user chat img" /></div>
                        <div className="msg">
                            <p>{message.message}</p>
                            <time>20:18</time>
                        </div>
                    </li>
                );
                }
            });
        } else {
            return <p>No hay mensajes todavía :c</p>
        }
    };

    // Manejo del socket 
    socket.on('chat message', (msg) => {
        if (!isDuplicate(messages, msg)) {
            setMessages((messages) => [...messages, msg]);
        };
        console.log(msg.message);
    });

    try {

        return (
            <form onSubmit={handleSubmit} className="main">

                <ol className="chat">
                    {showMessages()}
                    <div className="new_message">
                        <input className="textarea" name="message" type="text" placeholder="Type here!" />
                        <MyButton type='submit'>Send</MyButton>
                    </div>
                </ol>
            </form>
        )

    } catch (e) {
        return (<ErrorView />)
    }
};


export default Chat;