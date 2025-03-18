import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
