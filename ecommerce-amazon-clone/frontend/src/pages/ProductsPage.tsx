import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../components/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { productAPI } from '../utils/apiService';
import { setProducts, setPagination, setFilters } from '../redux/productsSlice';
import { RootState } from '../redux/store';

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { products, filters, pagination } = useSelector(
    (state: RootState) => state.products
  );

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';
  const page = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    dispatch(setFilters({ category, search, sort }));
  }, [category, search, sort, dispatch]);

  const { data, isLoading } = useQuery({
    queryKey: ['products', { category, search, sort, page }],
    queryFn: () =>
      productAPI.getProducts({
        category,
        search,
        sort,
        page,
        limit: 12
      })
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setProducts(data.data.products));
      dispatch(setPagination(data.data));
    }
  }, [data, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-48 bg-white rounded-lg p-6 shadow-md h-fit">
            <h3 className="font-bold text-lg mb-4">Filters</h3>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Category</h4>
              <div className="space-y-2">
                {['Electronics', 'Clothing', 'Books', 'Home'].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={filters.category === cat}
                      onChange={(e) => {
                        const params = new URLSearchParams(searchParams);
                        params.set('category', e.target.value);
                        params.set('page', '1');
                        window.history.pushState({}, '', `?${params}`);
                      }}
                    />
                    <span className="text-sm">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort Filter */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Sort By</h4>
              <select
                value={filters.sort}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams);
                  params.set('sort', e.target.value);
                  params.set('page', '1');
                  window.history.pushState({}, '', `?${params}`);
                }}
                className="w-full border rounded p-2 text-sm"
              >
                <option value="">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-6">
              {filters.search ? `Search Results for "${filters.search}"` : 'All Products'}
            </h2>

            {isLoading ? (
              <LoadingSkeleton count={12} />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {products.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No products found</p>
                  </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: pagination.pages }).map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set('page', String(i + 1));
                          window.history.pushState({}, '', `?${params}`);
                        }}
                        className={`px-4 py-2 rounded ${
                          pagination.page === i + 1
                            ? 'bg-amazon-orange text-white'
                            : 'bg-white border'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
