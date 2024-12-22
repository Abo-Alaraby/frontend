import React, { useEffect, useState } from 'react';
import Navbar from '../components/ui/Navbar';
import axios from '../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AllOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/order', { withCredentials: true });
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        toast.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">All Orders</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="border p-4 rounded-lg shadow-md mb-4">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Total:</strong> ${order.total}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <button
                  onClick={() => navigate(`/order/${order._id}`)}
                  className="bg-indigo-700 text-white py-2 px-4 rounded mt-4"
                >
                  View Order
                </button>
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllOrdersPage;