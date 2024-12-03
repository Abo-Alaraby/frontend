import  { useEffect, useState } from 'react';
import Navbar from '../components/ui/Navbar';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);

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

  const handleAddToCart = (productId) => {
    // Handle add to cart logic here
    console.log(`Product ${productId} added to cart`);
  };

  return (
    <>
      <Navbar />
      <div className="w-2/3 mx-auto px-4 flex-col justify-center">
        <h1 className="text-3xl font-bold my-4">Products</h1>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow-md">
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
    </>
  );
};

export default Home;