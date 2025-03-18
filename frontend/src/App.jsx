import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/Admin/AdminDashboard';
import UserDashboard from './pages/User/UserDashboard';
import './App.css';
import Profile from './pages/User/Profile';
import Products from './pages/User/Products';
import MyProducts from './pages/User/MyProducts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/products" element={<Products />} />
        <Route path="/user/my-products" element={<MyProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
