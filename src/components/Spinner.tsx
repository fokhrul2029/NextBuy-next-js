"use client";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center bg-white bg-opacity-80 z-50 py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );
};

export default Spinner;
