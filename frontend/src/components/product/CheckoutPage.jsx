

import React, { useEffect, useState } from "react";
import api from "../../api/api"; // Axios instance with JWT interceptor
import { Link, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    payment_method: "",
    save_info: false,
    subscribe: false,
  });

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Fetch cart
  const fetchCart = async () => {
    try {
      const res = await api.get("/cart/");
      // Normalize numeric fields
      const normalized = {
        ...res.data,
        subtotal: Number(res.data.subtotal),
        shipping_cost: Number(res.data.shipping_cost),
        items: res.data.items.map((item) => ({
          ...item,
          subtotal: Number(item.subtotal),
          quantity: Number(item.quantity),
          product: {
            ...item.product,
            price: Number(item.product.price),
            image: item.product.image || "",
          },
        })),
      };
      setCart(normalized);
    } catch (err) {
      setError("Failed to fetch cart");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Enter a valid email";
    if (!formData.first_name.match(/^[A-Za-z]+$/)) newErrors.first_name = "First name should only contain letters";
    if (!formData.last_name.match(/^[A-Za-z]+$/)) newErrors.last_name = "Last name should only contain letters";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.pincode.match(/^\d+$/)) newErrors.pincode = "Pincode must be numeric";
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Phone must be 10 digits";
    if (!formData.payment_method) newErrors.payment_method = "Select a payment method";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const applyCoupon = () => {
    if (coupon.trim() !== "" && cart) {
      setDiscount(cart.subtotal * 0.1);
      alert("Coupon applied: 10% off!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await api.post("/orders/", {
        ...formData,
        cart_id: cart.id,
      });
      alert("Order placed successfully!");
      navigate(`/order-confirmation/${res.data.id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!cart || cart.items.length === 0)
    return <div className="text-center mt-10">Your cart is empty.</div>;

  const subtotal = Number(cart.subtotal);
  const shippingCost = Number(cart.shipping_cost) || 0;
  const total = subtotal - discount + shippingCost;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-600 mb-4">
        <Link to="/">Home</Link> / <span>Category</span> / <span>Product</span> / <span>Cart</span> / <span className="font-semibold">Checkout</span>
      </nav>

      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        {/* Left Form */}
        <div className="flex-1 space-y-6">
          {/* Contact */}
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            <label className="flex items-center mt-2">
              <input type="checkbox" name="subscribe" checked={formData.subscribe} onChange={handleChange} className="mr-2" />
              Send me updates on Email & WhatsApp
            </label>
          </div>

          {/* Delivery */}
          <div>
            <h3 className="font-semibold mb-2">Delivery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="first_name" placeholder="First name" value={formData.first_name} onChange={handleChange} className="w-full border p-2 rounded" />
              <input type="text" name="last_name" placeholder="Last name" value={formData.last_name} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded mt-4" />
            <input type="text" name="apartment" placeholder="Apartment, suite (optional)" value={formData.apartment} onChange={handleChange} className="w-full border p-2 rounded mt-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full border p-2 rounded" />
              <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="w-full border p-2 rounded" />
              <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded mt-4" />
            <label className="flex items-center mt-2">
              <input type="checkbox" name="save_info" checked={formData.save_info} onChange={handleChange} className="mr-2" />
              Save this information for next time
            </label>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-semibold mb-2">Choose your payment method</h3>
            <div className="space-y-2">
              <label className="flex items-center border p-3 rounded cursor-pointer">
                <input type="radio" name="payment_method" value="online" checked={formData.payment_method === "online"} onChange={handleChange} className="mr-2" />
                Secure transaction (UPI, Cards, Wallets, Net Banking)
              </label>
              <label className="flex items-center border p-3 rounded cursor-pointer">
                <input type="radio" name="payment_method" value="cod" checked={formData.payment_method === "cod"} onChange={handleChange} className="mr-2" />
                Cash on Delivery
              </label>
            </div>
            {errors.payment_method && <p className="text-red-500 text-sm">{errors.payment_method}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700">Order Now</button>
        </div>

        {/* Right Summary */}
        <div className="w-full lg:w-1/3 bg-green-100 p-4 rounded space-y-4 h-fit">
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          {cart.items.map((item) => (
            <div key={item.id} className="flex gap-3 border-b pb-2">
              <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                <p className="text-sm text-gray-600">Price: ₹{item.product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}

          <div className="flex gap-2">
            <input type="text" placeholder="Discount code or gift card" className="border p-2 flex-1 rounded" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
            <button type="button" onClick={applyCoupon} className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">Apply</button>
          </div>

          <div className="flex justify-between"><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
          {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount:</span><span>-₹{discount.toFixed(2)}</span></div>}
          <div className="flex justify-between"><span>Shipping:</span><span>{shippingCost === 0 ? "Free" : `₹${shippingCost.toFixed(2)}`}</span></div>
          <div className="flex justify-between font-semibold text-lg"><span>Total:</span><span>₹{total.toFixed(2)}</span></div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
