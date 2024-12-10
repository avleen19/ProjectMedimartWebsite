import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { IoSearch } from "react-icons/io5";
import axios from 'axios';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products?q=${searchTerm}`);
      console.log(response.data);
      navigate('/search-results', { state: { products: response.data } });
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <div className='headerSearch'>
      <input 
        type='text' 
        placeholder="Search for products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch}><IoSearch/></Button>
    </div>
  );
};

export default SearchBox;
