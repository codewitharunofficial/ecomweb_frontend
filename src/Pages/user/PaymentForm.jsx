import React, { useState } from 'react';
import Razorpay from 'razorpay';

const API_KEY = 'IbOK4abV8hdG4oULLE7MMzcP';

const rzp = new Razorpay({
  key: API_KEY,
});

const PaymentForm = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    amount: 1000, // Amount in paisa (e.g., 1000 = ₹10.00)
    currency: 'INR', // Use the appropriate currency code
    name: 'Your Company Name',
    description: 'Product Purchase',
  });

  const openRazorpay = () => {
    rzp.open({
      amount: paymentDetails.amount,
      currency: paymentDetails.currency,
      name: paymentDetails.name,
      description: paymentDetails.description,
      handler: (response) => {
        // Handle the Razorpay response here
        console.log(response);
      },
    });
  };

  return (
    <div>
      <button onClick={openRazorpay}>Pay with Razorpay</button>
    </div>
  );
};

export default PaymentForm;
