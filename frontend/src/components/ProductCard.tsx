import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleAddToCart = () => {
    dispatch(
      addItem({
        product,
        quantity: 1,
        price: product.discountPrice || product.price
      })
    );
    toast.success('Added to cart!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden h-full flex flex-col">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden group">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        )}
        <img
          src={product.images?.[0] || product.thumbnail}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          className="w-full h-full object-cover group-hover:scale-110 transition"
        />
      </div>

      {/* Product Info */}
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="font-semibold text-sm line-clamp-2 text-gray-800">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex text-yellow-400">
            {'⭐'.repeat(Math.round(product.rating || 0))}
          </div>
          <span className="text-xs text-gray-600">
            ({product.numReviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-amazon-orange">
              ${(product.discountPrice || product.price).toFixed(2)}
            </span>
            {product.discountPrice && (
              <span className="text-sm line-through text-gray-500">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full mt-3 bg-amazon-orange hover:bg-yellow-600 text-white font-bold py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
