import api from './api';

export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  refreshToken: (refreshToken: string) =>
    api.post('/auth/refresh-token', { refreshToken })
};

export const productAPI = {
  getProducts: (params: any) => api.get('/products', { params }),
  getProductById: (id: string) => api.get(`/products/${id}`),
  createProduct: (data: any) => api.post('/products', data),
  updateProduct: (id: string, data: any) => api.put(`/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
  addReview: (id: string, data: any) => api.post(`/products/${id}/reviews`, data)
};

export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (data: any) => api.post('/cart/add', data),
  updateCartItem: (data: any) => api.put('/cart/update', data),
  removeFromCart: (productId: string) => api.delete(`/cart/${productId}`),
  clearCart: () => api.delete('/cart')
};

export const orderAPI = {
  createOrder: (data: any) => api.post('/orders', data),
  getOrders: () => api.get('/orders'),
  getOrderById: (id: string) => api.get(`/orders/${id}`),
  createPaymentIntent: (data: any) =>
    api.post('/orders/payment-intent', data),
  confirmPayment: (data: any) => api.post('/orders/confirm-payment', data),
  cancelOrder: (id: string) => api.put(`/orders/${id}/cancel`)
};

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
  addToWishlist: (data: any) => api.post('/users/wishlist/add', data),
  removeFromWishlist: (productId: string) =>
    api.delete(`/users/wishlist/${productId}`),
  getWishlist: () => api.get('/users/wishlist'),
  getAllUsers: () => api.get('/users'),
  deleteUser: (id: string) => api.delete(`/users/${id}`)
};
