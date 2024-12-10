import React, { useState } from 'react';
import { useCart } from '../../Contexts/CartContext';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'; 

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

    const totalPrice = cartItems.reduce((total, item) => {
        const price = typeof item.price === 'string'
            ? parseFloat(item.price.replace('₹', '').replace(',', ''))
            : item.price;
        return total + (isNaN(price) ? 0 : price * item.quantity);
    }, 0);

    const [receiptUrl, setReceiptUrl] = useState(null);
    const handleToken = async (token) => {
        try {
            const products = cartItems.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                totalPrice: item.price * item.quantity
            }));
            const response = await axios.post('http://localhost:5000/api/checkout', {
                token: token.id,
                amount: totalPrice * 100,  
                products: products,       
            });
    
            if (response.status === 200 && response.data.success) {
                setReceiptUrl(response.data.receiptUrl); 
                clearCart();
                toast.success('Payment Successful! Cart has been cleared.');
            } else {
                throw new Error('Payment failed');
            }
        } catch (error) {
            console.error('Payment Error:', error);
            toast.error('Payment failed! Please try again.');
        }
    };
    

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            {cartItems.length > 0 ? (
                <>
                    <ul className="cart-items">
                        {cartItems.map((item) => (
                            <li key={item.id} className="cart-item">
                                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <span className="cart-item-name">{item.name}</span>
                                    <span className="cart-item-price">₹{item.price.toFixed(2)}</span>
                                    <div className="quantity-controls">
                                        <Button
                                            variant="secondary"
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </Button>
                                        <span>{item.quantity}</span>
                                        <Button
                                            variant="secondary"
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                        >
                                            +
                                        </Button>
                                    </div>
                                    <Button
                                        variant="danger"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
                    <StripeCheckout
                        stripeKey="pk_test_51QNXL0Ezjpdl2chbYYS7x4hoxPRdB37KcXzCA5PRuLMsFDZoqfKTtv72HZXKbEr2TOWYaHf2CunTgSlrNGOgkBmd00wsg7jZba"
                        token={handleToken}
                        amount={totalPrice * 100} 
                        currency="INR"
                        name="MEDIMART"
                        billingAddress
                        shippingAddress
                    >
                        <Button variant="primary" className="buy-now-button">
                            Buy Now
                        </Button>
                    </StripeCheckout>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}

            {receiptUrl && (
                <div className="payment-receipt">
                    <h3>Payment Receipt</h3>
                    <p>Your payment was successful! You can view your receipt by clicking the link below:</p>
                    <a href={receiptUrl} target="_blank" rel="noopener noreferrer" className="receipt-link">
                        View Receipt
                    </a>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default Cart;
