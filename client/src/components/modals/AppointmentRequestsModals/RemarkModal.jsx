import React from "react";

const RemarkModal = ({ remark, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="modal-content bg-white p-6 rounded-lg w-[32rem] h-[30vh] overflow-auto shadow-lg relative">
        <h3 className="text-xl font-semibold mb-4">Admin's Remark</h3>
        {remark ? <p>{remark}</p> : <p className="text-gray-500">(None)</p>}
        <div className="absolute bottom-4 right-4">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemarkModal;
