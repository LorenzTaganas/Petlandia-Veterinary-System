import React from "react";

const EditStaffModal = ({
  open,
  onClose,
  selectedStaff,
  setSelectedStaff,
  onSave,
}) => {
  return (
    open && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-[32rem]">
          <h2 className="text-xl font-semibold mb-4">Edit User</h2>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                First Name *
              </label>
              <input
                type="text"
                className="w-full mb-4 p-2 border rounded"
                value={selectedStaff?.firstName || ""}
                onChange={(e) =>
                  setSelectedStaff({
                    ...selectedStaff,
                    firstName: e.target.value,
                  })
                }
                placeholder="First Name"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Last Name *
              </label>
              <input
                type="text"
                className="w-full mb-4 p-2 border rounded"
                value={selectedStaff?.lastName || ""}
                onChange={(e) =>
                  setSelectedStaff({
                    ...selectedStaff,
                    lastName: e.target.value,
                  })
                }
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Email *
              </label>
              <input
                type="email"
                className="w-full mb-4 p-2 border rounded"
                value={selectedStaff?.email || ""}
                onChange={(e) =>
                  setSelectedStaff({
                    ...selectedStaff,
                    email: e.target.value,
                  })
                }
                placeholder="Email"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-1">
                Contact Number *
              </label>
              <input
                type="text"
                className="w-full mb-4 p-2 border rounded"
                value={selectedStaff?.contactNo || ""}
                onChange={(e) =>
                  setSelectedStaff({
                    ...selectedStaff,
                    contactNo: e.target.value,
                  })
                }
                placeholder="Contact Number"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditStaffModal;