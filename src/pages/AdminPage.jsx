
import axios from '../api/axios';
import ProductForm from '../components/admin/ProductForm';
import Navbar from '../components/ui/Navbar'
import { ToastContainer, toast } from 'react-toastify';

const AdminPage = () => {
  const handleProductSubmit = async (formData) => {
    try {
      const response = await axios.post('/product/create', formData);
      console.log('Product added:', response.data);
      toast.success("product added successfully")
      
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error("there was a problem creating product")
    }
  };
  return (
    <div>
    <Navbar />
      <div className='w-full flex justify-center'>
      <ProductForm onSubmit={handleProductSubmit} />
      </div>
      <ToastContainer />
    </div>
    
  )
}

export default AdminPage