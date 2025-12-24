import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
        <h1 className="text-9xl font-bold text-pink-400">404</h1>
        <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-lg mt-2 text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 px-6 py-3 bg-pink-400 text-white rounded-lg shadow hover:bg-[#FBCFE8] hover:text-pink-400 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    );
};

export default Error404;