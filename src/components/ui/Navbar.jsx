import { Link } from 'react-router-dom'
import { ShoppingCart, User } from 'lucide-react'
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=> {
    const checkForJwtCookiePresent = () => {
      const cookies = document.cookie.split(";");
      let foundJwt = false;
      cookies.forEach((cookie) => {
        const [name, value] = cookie.trim().split('=');
        if (name === 'jwt' && value) {
          foundJwt = true;
        }
      });
      setIsLoggedIn(foundJwt);
    };
    checkForJwtCookiePresent();
  }, []);


  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
            ابو العربي
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/orders" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm">
              Orders
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm">
              <ShoppingCart className="inline-block w-5 h-5 mr-1" />
              Cart
            </Link>
            {isLoggedIn ? <Link to="/profile" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm">
                <User className="inline-block w-5 h-5 mr-1" />
                Profile
              </Link>:
            <Link to="/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm">
              <User className="inline-block w-5 h-5 mr-1" />
              Login
            </Link>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

