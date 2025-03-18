import { Link } from 'react-router-dom';

function UserDashboard() {
  return (
    <div>
      <h2>User Dashboard</h2>
      <nav>
        <ul>
          <li>
            <Link to="/user/profile">Profile</Link>
          </li>
          <li>
            <Link to="/user/products">Products</Link>
          </li>
          <li>
            <Link to="/user/my-products">My Products</Link>
          </li>
        </ul>
      </nav>
      <div>{/* Add routes for Profile, Products, and My Products here */}</div>
    </div>
  );
}

export default UserDashboard;
