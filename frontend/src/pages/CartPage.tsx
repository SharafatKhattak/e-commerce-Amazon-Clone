import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '../redux/store';
import { removeItem, updateQuantity, clearCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';

const CartPage: React.FC = () => {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveItem = (productId: string) => {
    dispatch(removeItem(productId));
    toast.success('Item removed from cart');
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to proceed');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg p-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">
              Add some items to your cart to get started!
            </p>
            <Link
              to="/products"
              className="bg-amazon-orange text-white px-6 py-3 rounded-lg hover:bg-yellow-600 inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {items.map((item) => (
                <div
                  key={item.product._id}
                  className="flex gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50"
                >
                  <img
                    src={item.product.images?.[0] || item.product.thumbnail}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      Price: ${item.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.product._id, item.quantity - 1)
                          }
                          className="px-2 py-1 hover:bg-gray-200"
                        >
                          −
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.product._id, item.quantity + 1)
                          }
                          className="px-2 py-1 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.product._id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-amazon-orange text-lg">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${(totalPrice * 0.1).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total:</span>
              <span className="text-amazon-orange">
                ${(totalPrice * 1.1).toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-amazon-orange text-white font-bold py-3 rounded-lg hover:bg-yellow-600 mb-3"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/products"
              className="block text-center text-amazon-orange hover:underline text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
