import React from 'react';
import { useCart } from '../../Contexts/CartContext';
import { toast } from 'react-toastify';

const AddToCartButton = ({ item }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(item);
        toast.success(`${item.name} added to cart!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    return (
        <button className="add-to-cart-button" onClick={handleAddToCart}>
            ADD TO CART
        </button>
    );
};

export default AddToCartButton;
