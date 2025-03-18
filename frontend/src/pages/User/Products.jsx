import { useEffect, useState } from 'react';
import { createAxiosInstanceWithToken } from '../../config/axiosInstance';
import Layout from './components/Layout';

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const axiosInstance = createAxiosInstanceWithToken(
          import.meta.env.VITE_APP_PRODUCT_SERVICE_URL,
          token
        );
        const response = await axiosInstance.get('/');

        setProducts(response.data.products);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Layout>
        <p className="text-center mt-4">Loading...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <p className="text-red-500 text-center mt-4">{error}</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Products</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products?.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image || 'https://via.placeholder.com/150'}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-700">
                {product.name}
              </h2>
              <p className="text-gray-500">{product.description}</p>
              <p className="text-gray-800 font-bold mt-2">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

export default Products;
