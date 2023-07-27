import React from 'react';

import Place from '../misc/Place';
import Header from '../misc/Header';
import Cookies from 'js-cookie';

const Home = () => {
    let username ='';
    if (Cookies.get('user')) {
        const user = JSON.parse(Cookies.get('user'));
        username = user.username;
    }
    else if (Cookies.get('seller')) {
        const user = JSON.parse(Cookies.get('seller'));
        username = user.name;
    }

    return (
        <>
            <Header name={username}/>
        <div>
            <Place />
        </div>
        </>
    );
}

export default Home;