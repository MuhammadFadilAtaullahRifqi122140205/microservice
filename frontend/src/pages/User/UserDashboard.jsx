import Layout from './components/Layout';

function UserDashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome to your Dashboard
      </h1>
      <p className="mt-2 text-gray-600">
        Use the navigation menu to access your profile, products, or manage your
        own products.
      </p>
      <div className="mt-4">
        <p className="text-gray-500">
          Content will appear here based on the selected menu.
        </p>
      </div>
    </Layout>
  );
}

export default UserDashboard;
