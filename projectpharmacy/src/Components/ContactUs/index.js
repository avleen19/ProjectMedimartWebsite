import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.message) {
      axios.post('https://formspree.io/f/mbljznaa', formData)
        .then(response => {
          console.log('Form submitted successfully:', response.data);
          setFormData({ name: '', email: '', message: '' });
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 3000);
        })
        .catch(error => {
          console.error('There was an error submitting the form:', error.response ? error.response.data : error.message);
          alert("There was an error submitting the form. Please try again.");
        });
    } else {
      alert("All fields are required!");
    }
  };

  const typingStyle = {
    display: 'inline-block',
    fontSize: '3rem',
    fontWeight: '10px',
    color: 'navy blue',
    marginBottom: '20px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    borderRight: '3px solid black',
    width: '0',
    animation: 'typing 3s steps(20) 1s forwards, blink-caret 0.75s step-end infinite',
  };

  const animationKeyframes = `
    @keyframes typing {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }

    @keyframes blink-caret {
      50% {
        border-color: transparent;
      }
    }
  `;

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '40px' }}>
      <style>{animationKeyframes}</style>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', marginTop: '50px', maxWidth: '1200px', width: '100%' }}>
        <div style={{ flex: '1', maxWidth: '600px', marginRight: '20px' }}>
          <h2 style={typingStyle}>How Can We Help You?</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ padding: '10px', marginBottom: '10px' }}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ padding: '10px', marginBottom: '10px' }}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              style={{ padding: '10px', marginBottom: '10px' }}
            />
            <button 
              type="submit" 
              style={{ 
                padding: '10px 20px', 
                cursor: 'pointer', 
                backgroundColor: 'green', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px' 
              }}
            >
              Send Message
            </button>
          </form>
        </div>

        <div style={{ flex: '1', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '10px', height: '400px' }}>
          <div style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBSnnvqpFwfByeUg8QAEIRadiR_Vq_nvDXXg&s')`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '20%' ,height:"200px",width:"300px"}}></div>
          <div style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT17CFQ3A84ww0t6_ge-2k9B-pOxPnVO4a1SlWZ7k5m1o908KKG5rJv-x-d2yxnD-qRadA&usqp=CAU')`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '20%' ,height:"200px",width:"300px"}}></div>
          <div style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT17CFQ3A84ww0t6_ge-2k9B-pOxPnVO4a1SlWZ7k5m1o908KKG5rJv-x-d2yxnD-qRadA&usqp=CAU')`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '20%',height:"200px",width:"300px" }}></div>
          <div style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBSnnvqpFwfByeUg8QAEIRadiR_Vq_nvDXXg&s')`, backgroundSize: 'cover', backgroundPosition: 'center' , borderRadius: '20%',height:"200px",width:"300px"}}></div>
        </div>
      </div>

      {showPopup && (
        <div className="popup" style={{ 
          position: 'fixed', 
          top: '30%', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          background: 'lightgreen', 
          padding: '5px 10px', 
          borderRadius: '4px', 
          fontSize: '12px',
          width: 'auto',
          maxWidth: '200px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)', 
          zIndex: 1000,
          textAlign: 'center',
          height: '40px'
        }}>
          <p style={{ margin: 0 }}>Message Sent!</p>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
