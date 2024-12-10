import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { FaAngleDown } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { MyContext } from '../../App';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CountryDropdown = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('India'); // Default to 'India'
  const [countryList, setCountryList] = useState([]);
  const [filteredCountryList, setFilteredCountryList] = useState([]);

  const context = useContext(MyContext);

  const selectCountry = (index) => {
    const country = filteredCountryList[index].country;
    setSelectedCountry(country);
    setIsOpenModal(false);
  };

  useEffect(() => {
    if (context.countryList) {
      setCountryList(context.countryList);
      setFilteredCountryList(context.countryList); // Initialize filtered list with full list
    }
  }, [context.countryList]);

  const filterList = (e) => {
    const keyword = e.target.value.toLowerCase();

    if (keyword !== "") {
      const filteredList = countryList.filter((item) => 
        item.country.toLowerCase().includes(keyword)
      );
      setFilteredCountryList(filteredList); // Update with filtered results
    } else {
      setFilteredCountryList(countryList); // Reset to full list if search is empty
    }
  };

  return (
    <>
      <Button className='countryDrop' onClick={() => setIsOpenModal(true)}>
        <div className='info d-flex flex-column'>
          <span className='label'>Your Location</span>
          <span className='name'>{selectedCountry}</span> {/* Display the selected country */}
        </div>
        <span className='ml-auto'><FaAngleDown /></span>
      </Button>

      <Dialog 
        open={isOpenModal} 
        onClose={() => setIsOpenModal(false)} 
        className='locationModal'  
        TransitionComponent={Transition}
      >
        <h4 className='mb-0'>Choose your delivery Location</h4>
        <p>Enter your address and we will specify the offer for your area.</p>
        <Button className='close_' onClick={() => setIsOpenModal(false)}><IoMdClose /></Button>
        <div className='headerSearch w-100'>
          <input type='text' placeholder="Search your area.." onChange={filterList} />
          <Button><IoSearch /></Button>
        </div>

        <ul className='countryList mt-3'>
          {filteredCountryList.length !== 0 && filteredCountryList.map((item, index) => (
            <li key={index}>
              <Button 
  onClick={() => selectCountry(index)} 
  className={`${selectedCountry === item.country ? 'active' : ''}`}
>
  {item.country}
</Button>
            </li>
          ))}
        </ul>
      </Dialog>
    </>
  );
}

export default CountryDropdown;