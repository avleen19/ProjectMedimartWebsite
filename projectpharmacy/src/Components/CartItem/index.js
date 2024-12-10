
import React from 'react';
import { useCart } from '../Contexts/CartContext';  

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    const handleIncreaseQuantity = () => {
        updateQuantity(item._id, item.quantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (item.quantity > 1) {
            updateQuantity(item._id, item.quantity - 1);
        } else {
            removeFromCart(item._id);
        }
    };

    return (
        <div className="cart-item">
            <p>{item.name}</p>
            <p>Price per unit: ₹{item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total Price: ₹{(item.price * item.quantity).toFixed(2)}</p>
            <button onClick={handleIncreaseQuantity}>+</button>
            <button onClick={handleDecreaseQuantity}>-</button>
        </div>
    );
};

export default CartItem;
