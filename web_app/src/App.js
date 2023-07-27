import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
// Importamos las páginas
import Login from './components/Login.js';
import Register from './components/Register.js';
import AboutUs from './components/pages/AboutUs.js';
// Landing page
import MenuBar from './components/navigations/MenuBar'
import Home from './components/pages/Home';
import RestaurantDetails from './components/RestaurantDetails';
import Footer from './components/navigations/Footer';
import Profile from './components/pages/Profile';
import EditProfile from './components/pages/EditProfile';
import SellerLogin from './components/SellerSession/SellerLogin.js';
import SellerRegister from './components/SellerSession/SellerRegister.js';
import ErrorView from './components/ErrorView';
import SellerProfile from './components/SellerSession/SellerProfile';
import BookTable from './components/BookTable/BookTable';
import EditSellerProfile from './components/SellerSession/EditSellerProfile';
import Chat from './components/chat/Chat';
import EditFoodItem from './components/SellerSession/EditFoodItem';
import CreateFoodItem from './components/SellerSession/CreateFoodItem';



function App() {
  return (
      <BrowserRouter>
        <MenuBar />
        <div className="body-wrap">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path="game/:gameId" element={<RestaurantDetails />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path={'/AboutUs'} element={<AboutUs />} />
                <Route path={'/ContactUs'} />
                <Route path={'/profile'} element={<Profile />} />
                <Route path={'/edit_profile'} element={<EditProfile />} />
                <Route path="*" element={<main style={{ padding: "1rem" }}><p>There's nothing here!</p></main>}/>
                <Route path={'/seller'} element={<SellerLogin />} />
                <Route path={'/seller_register'} element={<SellerRegister />} />
                <Route path={'/error'} element={<ErrorView />} />
                <Route path={'/seller_profile'} element={<SellerProfile />} />
                <Route path={'/restaurant/:restaurantId/book'} element={<BookTable />} />
                <Route path={'/edit_seller_profile'} element={<EditSellerProfile />} />
                <Route path={'/chat'} element={<Chat />} />
                <Route path={'/edit_food_item/:plateid'} element={<EditFoodItem />} />
                <Route path={'/new_food_item'} element={<CreateFoodItem />} />
              </Routes>
        </div>
        <Footer />
      </BrowserRouter>
  );
}


export default App;
