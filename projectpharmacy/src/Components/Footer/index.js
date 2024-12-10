import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 20);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>Medimart a one step solution to all your lab and hospital equipments</p>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@medimart.com</p>
          <p>Phone: +9189564321</p>
          <p>Address: 123 new city</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">about us</a></li>
            <li><a href="#">products</a></li>
            <li><a href="#">contact us</a></li>
            
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Twitter</li>
          </div>
          {/* <div className="social-icons">
            <a href="#"><img src="facebook.jpeg" alt="Facebook" /></a>
            <a href="#"><img src="https://example.com/twitter-icon.png" alt="Twitter" /></a>
            <a href="#"><img src="https://example.com/instagram-icon.png" alt="Instagram" /></a>
            <a href="#"><img src="https://example.com/linkedin-icon.png" alt="LinkedIn" /></a>
          </div> */}
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Medimart. All rights reserved.</p>
        {showScrollTop && (
          <button onClick={scrollToTop} id="topBtn" title="Go to top">
            Top
          </button>
        )}
      </div>
    </footer>
  );
};


export default Footer;