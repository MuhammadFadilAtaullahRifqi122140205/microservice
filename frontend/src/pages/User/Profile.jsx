import { useEffect, useState } from 'react';
import { createAxiosInstanceWithToken } from '../../config/axiosInstance';
import Layout from './components/Layout';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        const axiosInstance = createAxiosInstanceWithToken(
          import.meta.env.VITE_APP_USER_SERVICE_URL,
          token
        );
        const response = await axiosInstance.get('/me');
        setProfile(response.data);
      } catch (err) {
        setError('Failed to fetch profile data');
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return (
      <Layout>
        <p className="text-red-500 text-center mt-4">{error}</p>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <p className="text-center mt-4">Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <img
            src={profile.image || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              {profile.username}
            </h2>
            <p className="text-gray-500 capitalize">{profile.gender}</p>
          </div>
        </div>
        <div>
          <p className="text-gray-600">
            <span className="font-semibold">City:</span> {profile.city}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">IP Address:</span>{' '}
            {profile.ipAddress}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Browser:</span> {profile.browser}
          </p>
        </div>
        <div>
          <p className="text-gray-600">
            <span className="font-semibold">Created At:</span>{' '}
            {new Date(profile.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Updated At:</span>{' '}
            {new Date(profile.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
