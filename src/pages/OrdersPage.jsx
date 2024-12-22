import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const OrdersPage = () => {
  const [order, setOrder] = useState(null);
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const orderId = id;
  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/order/${orderId}`, { withCredentials: true });
      setOrder(response.data);
      response.data.products.forEach(product => {
        fetchProductDetails(product.product);
      });
    } catch (error) {
      console.error('Failed to fetch order details:', error);
      toast.error('Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetails = async (productId) => {
    if (!productDetails[productId]) { // Prevent refetching if already fetched
      try {
        const response = await axios.get(`http://localhost:3000/product/${productId}`, { withCredentials: true });
        setProductDetails(prevDetails => ({
          ...prevDetails,
          [productId]: response.data
        }));
      } catch (error) {
        console.error('Failed to fetch product details:', error);
        toast.error('Failed to fetch product details');
      }
    }
  };

  const cancelOrder = async () => {
    try {
      await axios.delete(`http://localhost:3000/order/${orderId}`, { withCredentials: true });
      toast.success('Order cancelled successfully');
      navigate('/'); // Redirect to home or another page
    } catch (error) {
      console.error('Failed to cancel order:', error);
      toast.error(error.response?.data || 'Failed to cancel order');
    }
  };


  //add sending api
  const handlePurchaseCompletion = () => {
    toast.success('Thank you for your purchase!');
    navigate('/Thankyou');
  };

  const toggleDetailsVisibility = () => {
    if (!showDetails) {
      fetchOrderDetails(); // Fetch details only when needed
    }
    setShowDetails(!showDetails);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold text-gray-800">Order Management</h1>
        <button onClick={toggleDetailsVisibility} className="bg-indigo-700 text-white py-2 px-4 rounded mt-4">
          {showDetails ? 'Hide Details' : 'View Order'}
        </button>
        {showDetails && order ? (
          <div>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ${order.total}</p>
            <div>
              <h2 className="text-xl font-semibold">Products</h2>
              {order.products.map((item, index) => (
                <div key={index} className="mt-2 p-2 border rounded">
                  <p><strong>Name:</strong> {productDetails[item.product]?.name || 'Loading...'}</p>
                  <p><strong>Description:</strong> {productDetails[item.product]?.description || 'Loading...'}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                </div>
              ))}
            </div>
            <button onClick={cancelOrder} className="bg-red-500 text-white py-2 px-4 rounded ml-2 mt-4">Cancel Order</button>
            <button onClick={handlePurchaseCompletion} className="bg-green-500 text-white py-2 px-4 rounded ml-2 mt-4">Complete Purchase</button>
          </div>
        ) : (
          <p>Click &apos;View Order&apos; to see the order details.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
