/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded shadow text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Thank You for Your Purchase!</h1>
        <p className="mt-4 text-gray-600">
          We appreciate your business and hope you enjoy your purchase. If you have any questions, feel free to contact us.
        </p>
        <div className="mt-6">
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-700 text-white py-2 px-4 rounded hover:bg-indigo-800 transition duration-300"
          >
            Go Back to Home
          </button>

        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
