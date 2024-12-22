import  { useState, useEffect } from 'react';
import axios from '../api/axios';
import ProductForm from '../components/admin/ProductForm';
import Navbar from '../components/ui/Navbar';
import { ToastContainer, toast } from 'react-toastify';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductSubmit = async (formData) => {
    try {
      const response = await axios.post('/product/create', formData);
      setProducts([...products, response.data]);
      toast.success('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('There was a problem creating the product');
    }
  };

  const handleProductUpdate = async (formData) => {
    try {
      const response = await axios.patch(`/product/${editingProduct._id}`, formData);
      setProducts(products.map(product => product._id === editingProduct._id ? response.data : product));
      setEditingProduct(null);
      toast.success('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('There was a problem updating the product');
    }
  };

  const handleProductDelete = async (productId) => {
    try {
      await axios.delete(`/product/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('There was a problem deleting the product');
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div>
      <Navbar />
      <div className="w-full flex justify-center">
        <ProductForm onSubmit={editingProduct ? handleProductUpdate : handleProductSubmit} initialData={editingProduct} />
        {editingProduct && (
          <button
            onClick={handleCancelEdit}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-4 mt-4 hover:bg-gray-600"
          >
            Cancel Edit
          </button>
        )}
      </div>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow-md">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-gray-900 font-bold">${product.price}</p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEditClick(product)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleProductDelete(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
                
              </div>
              <p className="text-gray-900 font-bold">stock : {product.stock}</p>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminPage;