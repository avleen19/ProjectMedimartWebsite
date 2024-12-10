
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './ContactButtons.css'; // Ensure this CSS file is linked

const ContactButtons = () => {
    return (
        <div className="contact-buttons">
            <div className="contact-button phone">
                <a href="tel:+919896015550" className="contact-link">
                    <FontAwesomeIcon icon={faPhoneAlt} />
                    <span className="contact-info phone">+919896015550</span> {/* Added class "phone" */}
                </a>
            </div>
            <div className="contact-button email">
                <a href="mailto:scientificsluminid@gmail.com" className="contact-linkk">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span className="contact-info email">scientificsluminid@gmail.com</span> {/* Added class "email" */}
                </a>
            </div>
        </div>
    );
};

export default ContactButtons;