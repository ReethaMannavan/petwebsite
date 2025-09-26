// src/pages/OrderConfirmationPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${orderId}/`);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!order) return null;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="border rounded p-6 bg-[#98FB98] shadow ">
        <h2 className="text-2xl font-bold mb-4 text-center">Thank you for your purchase!</h2>
        <p className="mb-8 text-center px-7">
          Your order will be processed within 24 hours during working days. 
          We will notify you by email once your order has been shipped.
        </p>

        <h3 className="text-xl font-semibold mb-2">Billing Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          <div><strong>Name:</strong> {order.first_name} {order.last_name}</div>
          
          <div className="md:col-span-2">
            <strong>Address:</strong> {order.address} {order.apartment && `, ${order.apartment}`}, {order.city}, {order.state} - {order.pincode}
          </div>
          <div><strong>Phone:</strong> {order.phone}</div>
          <div className="md:col-span-2"><strong>Email:</strong> {order.email}</div>
        </div>

        <h3 className="text-xl font-semibold mb-2">Order Items</h3>
        <div className="space-y-2 mb-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-2">
              <span>{item.product.name} x {item.quantity}</span>
              <span>₹{Number(item.subtotal).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-2">Summary</h3>
        <div className="space-y-1">
          <div className="flex justify-between"><span>Subtotal:</span><span>₹{Number(order.subtotal).toFixed(2)}</span></div>
          {order.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount:</span><span>-₹{Number(order.discount).toFixed(2)}</span></div>}
          <div className="flex justify-between"><span>Shipping:</span><span>{Number(order.shipping_cost) === 0 ? "Free" : `₹${Number(order.shipping_cost).toFixed(2)}`}</span></div>
          <div className="flex justify-between font-semibold text-lg"><span>Total:</span><span>₹{Number(order.total).toFixed(2)}</span></div>
        </div>

        <div className="mt-4">
          <Link to="/" className="text-blue-600 hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
