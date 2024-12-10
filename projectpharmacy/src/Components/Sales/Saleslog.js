import React from 'react';
import './Saleslog.css';

const SalesLog = ({ sales }) => {
  return (
    <div>
      <h3>Sales Log</h3>
      <table>
        <thead>
          <tr>
            <th>Transaction Date</th>
            <th>Total Amount</th>
            <th>Payment Status</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {sales && sales.length > 0 ? (
            sales.map((sale, index) => (
              <tr key={index}>
                <td>{new Date(sale.transactionDate).toLocaleString()}</td>
                <td>₹{sale.totalAmount}</td>
                <td>{sale.paymentStatus}</td>
                <td>
                  <a href={sale.receiptUrl} target="_blank" rel="noopener noreferrer">View Receipt</a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No sales data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalesLog;
