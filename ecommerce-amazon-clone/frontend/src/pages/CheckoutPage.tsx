import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { orderAPI } from '../utils/apiService';
import { clearCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const CheckoutPage: React.FC = () => {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: orderData } = await orderAPI.createOrder({
        shippingAddress,
        paymentMethod: 'stripe'
      });

      // Create payment intent
      const { data: paymentData } = await orderAPI.createPaymentIntent({
        orderId: orderData.order._id,
        amount: totalPrice * 1.1 // Including tax
      });

      // In a real app, you would handle Stripe payment here
      // For demo, we'll just confirm the payment
      await orderAPI.confirmPayment({
        orderId: orderData.order._id,
        paymentIntentId: paymentData.paymentIntentId
      });

      dispatch(clearCart());
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Checkout failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg p-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Cart is Empty</h1>
            <p className="text-gray-600">Please add items before checkout</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Address Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={shippingAddress.name}
                      onChange={handleChange}
                      required
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={shippingAddress.email}
                      onChange={handleChange}
                      required
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Street Address</label>
                  <input
                    type="text"
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleChange}
                    required
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleChange}
                      required
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingAddress.zipCode}
                      onChange={handleChange}
                      required
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleChange}
                      required
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amazon-orange text-white font-bold py-3 rounded-lg hover:bg-yellow-600 disabled:opacity-50 mt-6"
                >
                  {isLoading ? 'Processing...' : 'Complete Purchase'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {/* Items */}
            <div className="space-y-3 mb-4 pb-4 border-b max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.product._id} className="flex justify-between text-sm">
                  <span>
                    {item.product.name} x {item.quantity}
                  </span>
                  <span>${(item.quantity * item.price).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>${(totalPrice * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                <span>Total:</span>
                <span className="text-amazon-orange">
                  ${(totalPrice * 1.1).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
