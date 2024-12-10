import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.css'; 
import SalesLog from '../Sales/Saleslog'; // Ensure the path is correct




const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        imageUrl: '',
        category: '',
        quantity: ''
    });
    const [editingProduct, setEditingProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
                console.log('Fetched products:', response.data); 
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products');
            }
        };
        fetchProducts();
    }, []);
    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/sales');
                setSales(response.data);
                console.log('Fetched sales:', response.data); // Log the fetched sales data
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        };
        fetchSales();
    }, []);
    
    const addProduct = async () => {
        if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.imageUrl || !newProduct.category || !newProduct.quantity) {
            setError("All fields are required");
            return;
        }

        const productToAdd = {
            ...newProduct,
            price: parseFloat(newProduct.price),      
            quantity: parseInt(newProduct.quantity, 10) 
        };

        try {
            const response = await axios.post('http://localhost:5000/api/products', productToAdd);
            setProducts([...products, response.data]);
            console.log('Product added:', response.data); 
            setNewProduct({ name: '', price: '', description: '', imageUrl: '', category: '', quantity: '' });
            setError(null);
        } catch (error) {
            console.error('Error adding product:', error);
            setError("Failed to add product");
        }
    };

    const updateProduct = async () => {
        if (!editingProduct.name || !editingProduct.price || !editingProduct.description || !editingProduct.imageUrl || !editingProduct.category || !editingProduct.quantity) {
            setError("All fields are required for updating");
            return;
        }

        const updatedProduct = {
            ...editingProduct,
            price: parseFloat(editingProduct.price),
            quantity: parseInt(editingProduct.quantity, 10)
        };

        try {
            const response = await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, updatedProduct);
            setProducts(products.map((product) => (product._id === editingProduct._id ? response.data : product)));
            console.log('Product updated:', response.data);
            setEditingProduct(null);
            setError(null);
        } catch (error) {
            console.error('Error updating product:', error);
            setError("Failed to update product");
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            setProducts(products.filter((product) => product._id !== id));
            console.log(`Product with ID ${id} deleted`); // Debugging log
        } catch (error) {
            console.error('Error deleting product:', error);
            setError("Failed to delete product");
        }
    };

    return (
        <div className="admin-dashboard p-5">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Admin Dashboard</h2>

            <SalesLog sales={sales} />
            <br></br>
            <br></br>
            <div className="add-product-form mb-6">
                <h3 className="text-xl font-semibold mb-2">Add Product</h3>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="number"
                    placeholder="Product Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Product Category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <textarea
                    placeholder="Product Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    rows="4"
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Product Image URL"
                    value={newProduct.imageUrl}
                    onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                    className="border p-2 mb-2 w-full"
                />
                <button onClick={addProduct} className="custom-btn">Add Product</button>
                {error && <p className="error">{error}</p>}
            </div>

            {/* Product List */}
            <div className="product-list">
                <h3 className="text-xl font-semibold mb-2">Product List</h3>
                {products.map((product) => (
                    <div key={product._id} className="product-item mb-4">
                        <h4 className="text-lg font-bold">{product.name}</h4>
                        <p>Price: ₹{product.price ? product.price.toFixed(2) : "N/A"}</p>
                        <p>Category: {product.category || "Not specified"}</p>
                        <p>Description: {product.description}</p>
                        <p>Quantity: {product.quantity !== undefined ? product.quantity : "N/A"}</p>
                        <img src={product.imageUrl} alt={product.name} style={{ width: '100px', height: '100px' }} />
                        <div className="mt-2">
                            <button onClick={() => setEditingProduct(product)} className="custom-btn mr-2">Edit</button>
                            <button onClick={() => deleteProduct(product._id)} className="delete-btn">Delete</button>
                        </div>
                    </div>
                ))}

                {/* Edit Product Form */}
                {editingProduct && (
                    <div className="edit-product-form mb-4">
                        <h3 className="text-xl font-semibold mb-2">Edit Product</h3>
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="border p-2 mb-2 w-full"
                        />
                        <input
                            type="number"
                            placeholder="Product Price"
                            value={editingProduct.price}
                            onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                            className="border p-2 mb-2 w-full"
                        />
                        <input
                            type="text"
                            placeholder="Product Category"
                            value={editingProduct.category}
                            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                            className="border p-2 mb-2 w-full"
                        />
                        <textarea
                            placeholder="Product Description"
                            value={editingProduct.description}
                            onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                            rows="4"
                            className="border p-2 mb-2 w-full"
                        />
                        <input
                            type="text"
                            placeholder="Product Image URL"
                            value={editingProduct.imageUrl}
                            onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                            className="border p-2 mb-2 w-full"
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={editingProduct.quantity}
                            onChange={(e) => setEditingProduct({ ...editingProduct, quantity: e.target.value })}
                            className="border p-2 mb-2 w-full"
                        />
                        <button onClick={updateProduct} className="custom-btn">Update Product</button>
                        <button
  onClick={() => setEditingProduct(null)}
  className="cancel-btn ml-2"
  style={{
    border:"white",
    color: 'white',
    height: '40px',
    width: '150px',
    backgroundColor: 'red',
    borderRadius: '10px',
  }}
>
  Cancel
</button>


    
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
