import React, { useState, useEffect } from 'react';

const FileProcessing = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { message: "Started Processing...", color: "text-blue-600" },
    { message: "Wait here, don't go anywhere...", color: "text-purple-600" },
    { message: "Almost done...", color: "text-yellow-600" },
    { message: "Be prepared, here it comes!", color: "text-green-600" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prevStep => (prevStep + 1) % steps.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Processing Your File</h2>
          <p className={`mt-2 text-lg ${steps[step].color}`}>
            {steps[step].message}
          </p>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-indigo-500 h-4 rounded-full"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        <div className="relative">
          {/* Spinner or Custom Loader */}
          <svg
            className="animate-spin h-8 w-8 text-indigo-600 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <p className="mt-4 text-gray-500">Please wait while we process your file.</p>
        </div>
      </div>
    </div>
  );
};

export default FileProcessing;
