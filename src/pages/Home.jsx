import  { useEffect, useState } from 'react';
import Navbar from '../components/ui/Navbar';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import Search from '../components/ui/Search';
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/product');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  const handleAddToCart = async (productId) => {
    const url = `/cart/${productId}`;  // Product ID is used directly in the URL for patch request
  
    console.log(`Making API call to: ${url}`);
  
    try {
      const response = await axios.patch(url, {});  // Assuming no body is needed if just adding the product directly
      console.log('Server Response:', response);
      toast.success('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error.response ? error.response.data : error);
      toast.error(`Error adding product to cart: ${error.response ? error.response.data.message : "Check console for details."}`);
    }
  };
  


  const handleSearch = async (query) => {
    if (!query){
      fetchProducts();
      return;
    }
    try {
      const response = await axios.get(`products/search?name=${query}`);
      setProducts(response.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("no products found")
      setProducts(()=>[])
    }
  };
  return (
    <>
      <Navbar />
      <div className="w-2/3 mx-auto px-4 flex-col justify-center">
        <h1 className="text-3xl font-bold my-4">Products</h1>
        <Search onSearch={handleSearch} />
        <div className="w-full my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 w-full rounded-lg shadow-md">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-md" />
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-gray-900 font-bold">${product.price}</p>
              <div className="mt-4 flex justify-between items-center">
                <Link to={`/product/${product._id}`} className="text-indigo-600 hover:text-indigo-800">
                  View Product
                </Link>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
