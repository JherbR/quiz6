import React, { useEffect, useRef } from 'react'; // Added useRef
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, updateOrder } from '../actions/orderActions';

const PayPalButton = ({ service, onSuccess, onError }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.userLogin);
  const paypalClientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
  
  const internalOrderIdRef = useRef(null);

  useEffect(() => {
    if (!paypalClientId) {
      console.error('PayPal Client ID not configured');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.sandbox.paypal.com/sdk/js?client-id=${paypalClientId}`;
    script.async = true;
    script.onload = () => {
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: async (data, actions) => {
  try {
    
    const result = await dispatch(createOrder({
      service: service.id,
      paypal_transaction_id: 'pending',
      price_paid: service.price,
    }));

    if (!result || !result.success) {
      throw new Error(result?.error || 'Backend order creation failed');
    }

    internalOrderIdRef.current = result.data.id;


    return actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: result.data.id.toString(),
        amount: {
          currency_code: 'USD',
          value: parseFloat(service.price).toFixed(2), 
        },
      }],
    });
  } catch (error) {
    console.error('Detailed Order Error:', error);
    throw error;
  }
},
          onApprove: async (data, actions) => {
            try {
              await actions.order.capture();
              
              const updateResult = await dispatch(updateOrder(internalOrderIdRef.current, {
                paypal_transaction_id: data.orderID,
              }));

              if (updateResult.success) {
                onSuccess?.(data);
                alert('Payment successful! Thank you for your purchase.');
              } else {
                throw new Error(updateResult.error);
              }
            } catch (error) {
              console.error('Error capturing order:', error);
              onError?.(error);
            }
          },
          onError: (err) => {
            console.error('PayPal error:', err);
            onError?.(err);
            alert('Payment failed. Please try again.');
          },
        }).render('#paypal-button-container');
      }
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      const element = document.getElementById('paypal-button-container');
      if (element) {
        element.innerHTML = '';
      }
    };
  }, [dispatch, service, paypalClientId, onSuccess, onError]);

  if (!userInfo) {
    return <p className="text-warning">Please log in to make a purchase.</p>;
  }

  if (!paypalClientId) {
    return <p className="text-danger">Payment system is not configured.</p>;
  }

  return <div id="paypal-button-container"></div>;
};

export default PayPalButton;