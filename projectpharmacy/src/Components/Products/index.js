import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddToCartButton from '../AddToCartButton';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import './Products.css';

const ProductPage = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [expandedProduct, setExpandedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products', {
                    params: {
                        category: categoryId || undefined,
                        q: searchTerm
                    }
                });

                setProducts(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Unable to fetch products. Please try again later.');
                toast.error('Unable to fetch products. Please try again later.'); // Show error toast
            }
        };

        fetchProducts();
    }, [categoryId, searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5000/api/products?q=${searchTerm}`);
            if (response.data && Array.isArray(response.data)) {
                navigate('/search-results', { state: { products: response.data } });
                toast.success('Search successful!'); 
            } else {
                setError('No products found.');
                toast.warning('No products found.'); 
            }
        } catch (error) {
            console.error('Error searching products:', error);
            setError('Error fetching search results.');
            toast.error('Error fetching search results.'); 
        }
    };

    const openProduct = (product) => {
        setExpandedProduct(product);
    };

    const closeProduct = () => {
        setExpandedProduct(null);
    };

    return (
        <div className="products-page">
            <h2 className="products-heading">Our Products</h2>
            <form onSubmit={handleSearchSubmit} className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search for products"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit">Search</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <div className="product-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product._id} className="product-item">
                            <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="product-img"
                                onClick={() => openProduct(product)}
                            />
                            <div className="product-info">
                                <p className="product-title">{product.name}</p>
                                <p className="product-price">₹{product.price.toFixed(2)}</p>
                            </div>
                            <div className="button-container">
                                <AddToCartButton item={product} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-products">No products found in this category.</p>
                )}
            </div>

            {expandedProduct && (
                <div className="product-modal">
                    <div className="product-modal-content">
                        <button className="close-modal" onClick={closeProduct}>×</button>
                        <img src={expandedProduct.imageUrl} alt={expandedProduct.name} className="expanded-img" />
                        <h3>{expandedProduct.name}</h3>
                        <p>Price: ₹{expandedProduct.price}</p>
                        <p>{expandedProduct.description}</p>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default ProductPage;
