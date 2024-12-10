// // Checkout.js
// import React, { useState } from 'react';
// import { Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './checkout.css'; // Make sure to import your custom CSS

// const Checkout = () => {
//     const [paymentMethod, setPaymentMethod] = useState(null);
//     const navigate = useNavigate();

//     const handlePaymentSelection = (method) => {
//         setPaymentMethod(method);
//         toast.success(`You selected ${method}`, { position: "top-right", autoClose: 3000 });
//         setTimeout(() => {
//             navigate('/'); 
//         }, 2000);
//     };

//     return (
//         <div className="checkout-container">
//             <h2>Select Payment Method</h2>
//             <div className="payment-methods">
//                 <Button variant="outline-primary" onClick={() => handlePaymentSelection('Card')}>
//                     Pay with Card
//                 </Button>
//                 <Button variant="outline-secondary" onClick={() => handlePaymentSelection('Cash on Delivery')}>
//                     Cash on Delivery
//                 </Button>
//                 <Button variant="outline-success" onClick={() => handlePaymentSelection('UPI')}>
//                     Pay with UPI
//                 </Button>
//                 <Button variant="outline-info" onClick={() => handlePaymentSelection('Net Banking')}>
//                     Net Banking
//                 </Button>
//                 <Button variant="outline-warning" onClick={() => handlePaymentSelection('Wallet')}>
//                     Wallet
//                 </Button>
//             </div>
//             {paymentMethod && (
//                 <p className="payment-confirmation">
//                     {`You selected ${paymentMethod}. Processing...`}
//                 </p>
//             )}
//             <ToastContainer />
//         </div>
//     );
// };

// export default Checkout;
