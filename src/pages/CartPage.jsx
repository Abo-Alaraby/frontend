import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Navbar from '../components/ui/Navbar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 


const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`/product/${productId}`);
      return response.data; // Assuming the response data has properties like 'name', 'price', etc.
    } catch (error) {
      console.error(`Failed to fetch product details for product ID ${productId}:`, error);
      return null; // Return null if there's an error
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`/cart`, {
        withCredentials: true,
      });
      const products = response.data.products || [];
      const productsWithDetails = await Promise.all(products.map(async (item) => {
        const productDetails = await fetchProductDetails(item.product);
        return {
          ...item,
          name: productDetails ? productDetails.name : 'Unnamed Product',
          image: productDetails ? productDetails.image : 'placeholder.jpg',
          description: productDetails ? productDetails.description : "no description"
        };
      }));
      setCartItems(productsWithDetails);
      setCartTotal(response.data.total || 0);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
      toast.error('Error fetching cart items.');
    }
  };
  const totalUnits = cartItems.reduce((total, item) => total + item.quantity, 0);
  const pricePerUnit = totalUnits > 0 ? (cartTotal / totalUnits).toFixed(2) : 0;

  const handleRemoveItem = async (productId) => {
    try {
      if (!productId) {
        console.error('Product ID is undefined. Unable to remove item.');
        return;
      }
      await axios.delete(`/cart/product/${productId}`, {
        withCredentials: true
      });
      fetchCartItems();
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Failed to remove item:', error);
      toast.error('Failed to remove item.');
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete(`/cart`);
      setCartItems([]);
      setCartTotal(0);
      toast.success('Cart cleared');
    } catch (error) {
      console.error('Failed to clear cart:', error);
      toast.error('Failed to clear cart.');
    }
  };

  const handlePurchase = async () => {
    try {
      if (cartItems.length === 0) {
        toast.error('Please add products to your cart first');
        return;
      }

      const items = cartItems.map(item => ({ product: item.product, quantity: item.quantity }));
      const response = await axios.post('/order', { items }, { withCredentials: true });
      if (response.status === 201) {
        setCartItems([]);
        setCartTotal(0);
        toast.success('Purchase successful!');
        navigate(`/order/${response.data.orderId}`); // Use navigate instead of push
      }
    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error(error.response?.data || 'Failed to place order.');
    }
  };

 return (
  <>
    <Navbar />
    <div className="container mx-auto mt-10">
      <div className="flex shadow-md my-10">
        <div className="w-3/4 bg-white px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Remove</h3>
          </div>
          {cartItems.map((item) => (
            <div key={item.product} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              <div className="flex w-2/5">
                <div className="w-20">
                  <img src={item.image || 'placeholder.jpg'} alt={item.name || 'Unnamed Product'} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item.name || 'Unnamed Product'}</span>
                  <span className="text-red-500 text-xs">{item.description || 'No description available'}</span>
                </div>
              </div>
              <div className="flex justify-center w-1/5">
                <input className="mx-2 border text-center w-8" type="text" value={item.quantity || 1} readOnly />
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">${cartItems.length > 1 ? pricePerUnit : (cartItems.length * pricePerUnit).toFixed(2)}</span>
              <button onClick={() => handleRemoveItem(item.product)} className="w-1/5 flex justify-center items-center text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded text-sm">
                Remove
              </button>
            </div>
          ))}
          <button onClick={handleClearCart} className="flex font-semibold text-indigo-700 text-sm mt-10">
            Clear Cart
          </button>
        </div>
        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Total Items</span>
            <span className="font-semibold text-sm">{cartItems.length}</span>
          </div>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Total Price</span>
            <span className="font-semibold text-sm">${cartTotal.toFixed(2)}</span>
          </div>
          <div className="bg-indigo-700 text-white py-3 text-xs uppercase font-bold cursor-pointer text-center">
            <button onClick={handlePurchase}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default CartPage;
