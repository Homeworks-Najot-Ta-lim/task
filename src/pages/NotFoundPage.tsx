import React from 'react';
import CustomButton from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/companies");
  };

  return (
    <div
      className="relative min-h-screen min-w-screen flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-no-repeat bg-center"
        style={{ backgroundImage: "url('/login.jpg')", opacity: 0.5 }}
      />
      
      <div className="relative bg-white rounded-4xl p-5 flex flex-col items-center justify-center space-y-1">
        <h1 className="text-6xl font-bold">404</h1>
        <h3 className="text-2xl font-semibold">Page Not Found</h3>
        <p>Sorry, the page you are looking for doesn't exist.</p>
        <CustomButton title="Go back" type="button" onClick={handleGoBack} />
      </div>
    </div>
  );
};

export default NotFound;
