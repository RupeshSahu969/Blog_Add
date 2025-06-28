// src/components/Modal.jsx
import React from 'react';

const Modal = ({ message, onClose, onConfirm, isError, showConfirmButtons = false }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center">
        <p className={`mb-4 text-lg font-semibold ${isError ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
        <div className="flex justify-center gap-4">
          {showConfirmButtons ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md font-semibold bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (onConfirm) onConfirm();
                }}
                className={`px-4 py-2 rounded-md font-semibold bg-red-600 hover:bg-red-700 text-white`}
              >
                Confirm
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-md font-semibold ${
                isError ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
