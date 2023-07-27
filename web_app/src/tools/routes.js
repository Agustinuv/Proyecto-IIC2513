
const API = 'http://localhost:8000';
const API_GAMES = 'http://localhost:8001';

const API_routes = {
    REGISTER: `${API}/user/sign-in`, 
    LOGIN: `${API}/user/login`, 
    SELLER_PROFILE: `${API}/seller/profile`,
    SELLER_PLATES: `${API}/plate/plates`,
    ALL_SELLERS: `${API}/seller/sellers`,
    ALL_GAMES: `${API_GAMES}/game/findAll`,
    GAME: `${API_GAMES}/game/findOne`,
}

export default API_routes;