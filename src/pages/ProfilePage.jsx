import Navbar from '../components/ui/Navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import  { useEffect, useState } from 'react';
import axios from '../api/axios';
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user/me');
        console.log(response)
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error, e.g., redirect to login if not authenticated
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);
  const handleLogout = () => {
    // Remove the jwt cookie
    Cookies.remove('jwt');
    // Redirect to login page
    navigate('/login')
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">User Profile</h2>
          {user ? (
            <div className="space-y-2">
              <p className="text-lg"><span className="font-semibold">Name:</span> {user.firstName} {user.lastName}</p>
              <p className="text-lg"><span className="font-semibold">Email:</span> {user.email}</p>
              <p className="text-lg"><span className="font-semibold">Phone:</span> {user.phone}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <button
            onClick={handleLogout}
            className="mt-4 bg-indigo-700 text-white px-4 py-2 rounded hover:bg-indigo-800"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;