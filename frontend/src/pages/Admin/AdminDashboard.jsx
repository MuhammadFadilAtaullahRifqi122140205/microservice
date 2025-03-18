import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li>
            <Link to="/admin/users">Users</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
        </ul>
      </nav>
      <div>{/* Add routes for Users and Products here */}</div>
    </div>
  );
}

export default AdminDashboard;
