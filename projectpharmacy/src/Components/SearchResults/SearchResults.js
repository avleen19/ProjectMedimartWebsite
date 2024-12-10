import React from 'react';
import { useLocation } from 'react-router-dom';
import "./SearchResults.css";  

const SearchResults = () => {
    const location = useLocation();
    const products = location.state?.products || [];

    return (
        <div className="search-results-container">
            <h2 className="search-results-heading">Search Results</h2>
            <div className="search-results-grid">
                {products.length === 0 ? (
                    <p className="search-results-empty">No products found.</p>
                ) : (
                    products.map(product => (
                        <div key={product.id} className="search-result-card">
                            <img src={product.imageUrl} alt={product.name} className="search-result-image" />
                            <h3 className="search-result-name">{product.name}</h3>
                            <p className="search-result-price">
                                ₹{(product.price && typeof product.price === 'number' ? product.price.toFixed(2) : 0)}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchResults;
