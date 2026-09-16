import React from 'react';

const GlobalHeader: React.FC = () => {
  return (
    <div className="bg-stanford-cardinal text-white text-[13px] font-sans font-semibold py-2 px-4 md:px-12 lg:px-24 hidden md:flex justify-between items-center">
      <div className="flex space-x-6">
        <a href="#" className="hover:underline">Students</a>
        <a href="#" className="hover:underline">Faculty/Staff</a>
        <a href="#" className="hover:underline">Parents</a>
        <a href="#" className="hover:underline">Alumni</a>
      </div>
      <div className="flex space-x-6">
        <a href="#" className="hover:underline">Stanford Home</a>
        <a href="#" className="hover:underline">Search</a>
      </div>
    </div>
  );
};

export default GlobalHeader;
