import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { productAPI } from '../utils/apiService';
import { addItem } from '../redux/cartSlice';
import toast from 'react-hot-toast';
import LoadingSkeleton from '../components/LoadingSkeleton';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = React.useState(1);

  const { data: productData, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productAPI.getProductById(id || ''),
    enabled: !!id
  });

  const product = productData?.data;

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addItem({
          product,
          quantity,
          price: product.discountPrice || product.price
        })
      );
      toast.success('Added to cart!');
    }
  };

  if (isLoading) return <LoadingSkeleton count={1} />;
  if (!product) return <div className="text-center py-12">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="text-amazon-orange mb-6 hover:underline"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg p-6">
          {/* Product Images */}
          <div>
            <img
              src={product.images?.[0] || product.thumbnail}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="flex gap-2 mt-4">
              {product.images?.slice(0, 4).map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  alt="thumbnail"
                  className="w-20 h-20 object-cover rounded cursor-pointer border border-amazon-orange"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {'⭐'.repeat(Math.round(product.rating || 0))}
              </div>
              <span className="text-gray-600">
                ({product.numReviews || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-amazon-orange">
                  ${(product.discountPrice || product.price).toFixed(2)}
                </span>
                {product.discountPrice && (
                  <span className="text-xl line-through text-gray-500">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-sm text-green-600 mt-2">
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Quantity Selector */}
            <div className="mb-6 flex items-center gap-4">
              <label className="font-semibold">Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border rounded px-3 py-2"
              >
                {Array.from({ length: Math.min(10, product.stock) }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-amazon-orange hover:bg-yellow-600 text-white font-bold py-3 rounded-lg mb-3 disabled:opacity-50"
            >
              Add to Cart
            </button>

            {/* Additional Info */}
            <div className="bg-gray-100 p-4 rounded mt-6">
              <p className="text-sm text-gray-700">
                <strong>Category:</strong> {product.category}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <strong>Stock:</strong> {product.stock} items available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
