import React, { ReactNode } from 'react';

interface ButtonProps {
  type?: 'confirm' | 'cancel' | 'secondary' | 'default';
  onClick?: () => void;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type = 'default', onClick, children }) => {
  const baseStyle = "px-4 py-2 rounded focus:outline-none transition duration-200 ease-in-out";
  let typeStyle;

  switch (type) {
    case 'confirm':
      typeStyle = "bg-green-500 text-white hover:bg-green-600";
      break;
    case 'cancel':
      typeStyle = "bg-red-500 text-white hover:bg-red-600";
      break;
    case 'secondary':
      typeStyle = "bg-gray-500 text-white hover:bg-gray-600";
      break;
    default:
      typeStyle = "bg-blue-500 text-white hover:bg-blue-600";
  }

  return (
    <button
      className={`${baseStyle} ${typeStyle}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;