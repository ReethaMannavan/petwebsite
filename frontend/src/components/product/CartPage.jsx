
import React, { useEffect, useState } from "react";
import api from "../../api/api"; // Axios instance
import { X } from "lucide-react"; // Remove icon
import { Link } from "react-router-dom";
import gpay from '../../assets/images/gpay.PNG'
import phonepe from '../../assets/images/phonepe.PNG'
import mastercard from '../../assets/images/mastercard.PNG'
import paypal from '../../assets/images/paypal.PNG'
import visa from '../../assets/images/visa.PNG'
import icon1 from '../../assets/images/carticon1.PNG'
import icon2 from '../../assets/images/carticon2.PNG'
import icon3 from '../../assets/images/carticon3.PNG'




const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // Sample offers/support
  const offers = [
    { id: 1, title: "Free Products Dog Food combo 5Kg, Turkey" },
    { id: 2, title: "Free Products Dog Food 2Kg, Turkey" },
    { id: 3, title: "Free Products Dog Food 2Kg, Chicken" },
  ];

  const supportInfo = [
    { id: 1, icon: "💬", title: "Have a Question?" },
    { id: 2, icon: "🛡️",title: "Secure Shopping" },
    { id: 3, icon: "🔒", title: "Privacy Protection" },
  ];

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart/");
      const normalized = {
        ...res.data,
        subtotal: parseFloat(res.data.subtotal),
        shipping_cost: parseFloat(res.data.shipping_cost),
        items: res.data.items.map((item) => ({
          ...item,
          product: {
            ...item.product,
            price: parseFloat(item.product.price),
            // ✅ use product.image from backend (absolute URL)
            image:
              item.product.image ||
              item.product?.additional_images?.[0]?.image ||
              "",
          },
          subtotal: parseFloat(item.subtotal),
          quantity: parseInt(item.quantity),
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

  const updateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;
    try {
      await api.put(`/cart/update/${itemId}/`, { quantity: newQty });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await api.delete(`/cart/remove/${itemId}/`);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const applyCoupon = () => {
    if (coupon.trim() !== "" && cart) {
      setDiscount(cart.subtotal * 0.1);
      alert("Coupon applied: 10% off!");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!cart || cart.items.length === 0)
    return <div className="text-center mt-10">Your cart is empty.</div>;

  const freeShippingThreshold = 2000;
  const shippingCost =
    cart.subtotal > freeShippingThreshold ? 0 : cart.shipping_cost;
  const total = cart.subtotal - discount + shippingCost;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Free Shipping Banner */}
      {cart.subtotal >= freeShippingThreshold && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-4 text-center font-semibold">
          Your order qualifies for free shipping!
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT SECTION */}
        <div className="flex-1 space-y-4">
          {/* Cart Table Headers */}
          <div className="hidden md:grid grid-cols-5 gap-4 font-semibold border-b pb-2 mb-4 text-center">
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Subtotal</div>
            <div>Remove</div>
          </div>

          {/* Cart Items */}
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:grid md:grid-cols-5 items-center gap-4 border-b pb-4 text-center md:text-left"
            >
              {/* Product */}
              <div className="flex items-center gap-4 justify-center md:justify-start">
                {item.product.image ? (
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <span className="font-semibold">{item.product.name}</span>
              </div>

              {/* Price */}
              <div className="ml-10">₹{item.product.price.toFixed(2)}</div>

              {/* Quantity */}
              <div className="flex items-center gap-2 justify-center">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div>₹{item.subtotal.toFixed(2)}</div>

              {/* Remove */}
              <div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X />
                </button>
              </div>
            </div>
          ))}

          {/* Coupon Field */}
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              placeholder="Coupon code"
              className="border p-2 flex-1 rounded"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button
              onClick={applyCoupon}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Apply
            </button>
          </div>

          {/* Offers/Support */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-[#98FB98] text-green-800 p-3 rounded font-medium text-sm text-center"
              >
                {offer.title}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {supportInfo.map((info) => (
              <div
                key={info.id}
                className="flex items-center justify-center gap-2"
              >
                <span>{info.icon}</span>
                <p>{info.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full lg:w-1/3 border p-4 rounded space-y-4 h-fit">
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{cart.subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount:</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>
              {shippingCost === 0 ? "Free" : `₹${shippingCost.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

<Link to="/checkout">

          <button className="w-full bg-persianblue font-semibold text-white py-2 rounded-xl mt-10 hover:bg-blue-700">
            Proceed to Checkout
          </button>
          </Link>

          {/* Payment Methods */}
          <div className="mt-4 flex gap-2 justify-center">
            <img src={gpay}alt="GPay" className="h-8" />
            <img src={phonepe} alt="Mastercard" className="h-8" />
            <img src={mastercard} alt="Mastercard" className="h-8" />
             <img src={paypal} alt="Paypal" className="h-8" />
            <img src={visa} alt="Visa" className="h-8" />
           
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Delivery & refund information available. Fast shipping within 3-5
            business days.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            14 Days Money Back Guarantee if not satisfied with your order.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
