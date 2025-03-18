import { useEffect, useState } from 'react';
import { createAxiosInstanceWithToken } from '../../config/axiosInstance';
import Layout from './components/Layout';

function MyProducts() {
  const [myProducts, setMyProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'create', 'update', 'delete'
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const axiosInstance = createAxiosInstanceWithToken(
          import.meta.env.VITE_APP_PRODUCT_SERVICE_URL,
          token
        );
        const response = await axiosInstance.get('/me');
        setMyProducts(response.data.products);
      } catch (err) {
        setError('Failed to fetch your products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, []);

  const handleCreate = () => {
    setModalType('create');
    setShowModal(true);
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setModalType('update');
    setShowModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setModalType('delete');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setModalType('');
  };

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
      <h1 className="text-2xl font-bold text-gray-800 mb-4">My Products</h1>
      <button
        onClick={handleCreate}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Create Product
      </button>
      {myProducts.length === 0 ? (
        <p className="text-center text-gray-500">You have no products listed</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myProducts?.map((product) => (
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
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleUpdate(product)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {modalType === 'create' && 'Create Product'}
              {modalType === 'update' && 'Update Product'}
              {modalType === 'delete' && 'Delete Product'}
            </h2>
            {modalType === 'create' && (
              <form>
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                />
                <textarea
                  placeholder="Product Description"
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                ></textarea>
                <input
                  type="number"
                  placeholder="Price"
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </form>
            )}
            {modalType === 'update' && selectedProduct && (
              <form>
                <input
                  type="text"
                  defaultValue={selectedProduct.name}
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                />
                <textarea
                  defaultValue={selectedProduct.description}
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                ></textarea>
                <input
                  type="number"
                  defaultValue={selectedProduct.price}
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Update
                </button>
              </form>
            )}
            {modalType === 'delete' && selectedProduct && (
              <div>
                <p>Are you sure you want to delete "{selectedProduct.name}"?</p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Add delete logic here
                      closeModal();
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default MyProducts;
