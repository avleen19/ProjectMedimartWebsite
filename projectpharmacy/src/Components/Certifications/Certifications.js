
import React, { useState } from 'react';
import './Certifications.css';


const Certifications = () => {
  const [email, setEmail] = useState('');
  const [isNotified, setIsNotified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNotifyClick = () => {
    setIsModalOpen(true);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsNotified(true);
    setEmail('');
    setIsModalOpen(false);
  };

  return (
    <div className="certifications-section">
      <h3>Certifications</h3>
      <div className="cert-placeholder">
        <span className="cert-icon">📜</span>
        <p>Our certificates are coming soon! Stay tuned for updates.</p>
        <button className="notify-btn" onClick={handleNotifyClick}>
          Notify Me
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Enter Your Email</h4>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <button type="submit">Submit</button>
            </form>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              ×
            </button>
          </div>
        </div>
      )}

      {isNotified && (
        <div className="notification-message">
          <p>Thank you! We will notify you when the certificates are available.</p>
        </div>
      )}
    </div>
  );
};

export default Certifications;
