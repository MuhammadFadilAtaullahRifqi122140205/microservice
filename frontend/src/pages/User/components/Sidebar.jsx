import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="w-full md:w-1/4 bg-blue-500 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold">User Dashboard</h2>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/user/profile"
              className="block px-6 py-2 hover:bg-blue-600 rounded-md"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/user/products"
              className="block px-6 py-2 hover:bg-blue-600 rounded-md"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/user/my-products"
              className="block px-6 py-2 hover:bg-blue-600 rounded-md"
            >
              My Products
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
