import  { useState } from 'react';

import Navbar from '../components/ui/Navbar';
import axios from '../api/axios';
import Login from '../components/auth/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/login', formData);
      console.log(response);
      toast.success('Login successful!');
      // Handle successful login, e.g., redirect to dashboard
    } catch (error) {
      console.error('Error submitting form data:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <Login formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
      <ToastContainer />
    </>
  );
};

export default LoginPage;