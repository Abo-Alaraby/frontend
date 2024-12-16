import Navbar from '../components/ui/Navbar';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProfilePage = () => {
  const navigate = useNavigate();

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
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
          {/* Add user profile details here */}
          <p>Name: John Doe</p>
          <p>Email: john.doe@example.com</p>
          {/* Add more profile details as needed */}
          <button
            onClick={handleLogout}
            className="mt-4 bg-indigo-700 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;