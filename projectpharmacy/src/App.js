import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Components/Pages/Home";
import Header from "./Components/Header";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Footer from "./Components/Footer";
import ContactUs from "./Components/ContactUs";
import AboutUs from "./Components/Aboutus";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import { CartProvider } from "./Contexts/CartContext";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login";
import SearchResults from "./Components/SearchResults/SearchResults";
import AdminDashboard from "./Components/AdminDashboard"; // Import your Admin Dashboard component
import Checkout from "./Components/Checkout/Checkout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StripeCheckout from "react-stripe-checkout";
import success from "./success";
import Certifications from "./Components/Certifications/Certifications";
import ContactButtons from "./Components/ContactButtons/ContactButtons";

export const MyContext = createContext();

function App() {
    const [countryList, setCountryList] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getCountry("https://countriesnow.space/api/v0.1/countries/");
        checkAuthStatus();
    }, []);

    const getCountry = async (url) => {
        const response = await axios.get(url);
        setCountryList(response.data.data);
    };

    const checkAuthStatus = () => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            if (token === "admin_token") {
                setIsAdmin(true);
            }
        }
    };

    const handleLogin = (adminStatus) => {
        setIsLoggedIn(true);
        setIsAdmin(adminStatus); 
        navigate(adminStatus ? '/admin' : '/'); 
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate('/login'); 
    };

    const values = {
        countryList,
    };

    return (
        <>
            <CartProvider>
                <MyContext.Provider value={values}>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
                    {isLoggedIn ? (
                        <>
                        
                            <Header onLogout={handleLogout} />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/ContactUs" element={<ContactUs />} />
                                <Route path="/AboutUs" element={<AboutUs />} />
                                <Route path="/products" element={<Products />} />
                                <Route path="/Certifications" element={<Certifications/>}/>
                                <Route path="/products/:categoryId" element={<Products />} />
                                <Route path="/Cart" element={<Cart />} />
                                <Route path="./ContactButtons" element={<ContactButtons/>}/>
                                <Route path="/search-results" element={<SearchResults />} />
                                {isAdmin && (
                                    <>
                                        <Route path="/admin" element={<AdminDashboard />} />
                                    </>
                                )}
                            </Routes>
                            <Footer />
                        </>
                    ) : (
                        <Routes>
                            <Route path="/" element={<Login onLogin={handleLogin} />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        </Routes>
                    )}
                </MyContext.Provider>
            </CartProvider>
        </>
    );
}

export default App;
