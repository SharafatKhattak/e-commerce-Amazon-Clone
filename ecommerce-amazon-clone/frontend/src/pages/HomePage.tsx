import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../components/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { productAPI } from '../utils/apiService';
import { setProducts, setPagination } from '../redux/productsSlice';
import { RootState } from '../redux/store';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { products, pagination } = useSelector(
    (state: RootState) => state.products
  );

  const { data, isLoading } = useQuery({
    queryKey: ['products', { limit: 12 }],
    queryFn: () => productAPI.getProducts({ limit: 12 })
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setProducts(data.data.products));
      dispatch(setPagination(data.data));
    }
  }, [data, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amazon-blue to-amazon-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Amazon Clone</h1>
          <p className="text-xl opacity-90">
            Find everything you need at unbeatable prices
          </p>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>

        {isLoading ? (
          <LoadingSkeleton count={12} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No products found</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
