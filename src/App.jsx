import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import Thankyoupage from './pages/Thankyoupage';
import AllOrdersPage from './pages/AllOrdersPage'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<AllOrdersPage />} />
          <Route path="/order/:id" element={<OrdersPage />} />
          <Route path="/Thankyou" element={<Thankyoupage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
