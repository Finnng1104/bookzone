import React from "react";

interface Props {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const SuccessModal: React.FC<Props> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center space-y-4">
        <h2 className="text-2xl font-semibold text-green-600">🎉 Thành công</h2>
        <p>{message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;