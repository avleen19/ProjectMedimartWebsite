import React from 'react';
import Logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import './AboutUs.css';  // Ensure this is imported for styling

const AboutUs = () => {
  return (
    <div className="about-us">
      <h1 className="headingabt fade-in">About Us</h1>
      <div className="boxabt slide-in-up">
        <div className="logoabt fade-in">
          <Link to={'/'}>
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <p className="paraabt fade-in">
          Welcome to Medimart, your trusted partner in providing top-quality lab and hospital equipment. At Medimart, we understand the critical role that reliable and safe equipment plays in the healthcare industry. Our mission is to ensure that every product we offer meets the highest standards of safety, durability, and efficiency.
        </p>
        <p className="paraabt fade-in">
          We focus on empowering healthcare professionals by providing them with the tools they need to deliver exceptional care. Whether it's advanced lab instruments or essential hospital supplies, we are committed to sourcing and delivering only the best products to our clients.
        </p>
        <p className="paraabt fade-in">
          At Medimart, we pride ourselves on our stringent quality control processes. Every item we supply is carefully evaluated to ensure it meets the rigorous demands of modern medical practices. We work closely with leading manufacturers to bring you the latest in medical technology, ensuring that you have access to the most innovative solutions in the industry.
        </p>
        <p className="paraabt fade-in">
          With a commitment to quality and safety, we strive to support the healthcare industry by offering products that healthcare professionals can trust. Our team is dedicated to helping you find the best solutions for your needs.
        </p>
        <p className="paraabt fade-in">
          We manufacture products in a sprawling modern manufacturing facility with the latest techniques backed up by experienced & seasoned engineers. Being adopted the ISO 9001:2015 quality management systems, we can sustain continuous improvement in our products and services.
        </p>
        <p className="paraabt fade-in">
          Thank you for choosing us as your trusted provider of lab and hospital equipment.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
