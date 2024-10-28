import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import axios from 'axios';

const ProfilePage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userAPI, setUserAPI] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isActing, setIsActing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    loyaltyPoint: '',
  });

  const fetchUserData = async () => {
    const userId = 1;
    try {
      console.log(`Fetching data for user with id: ${userId}...`);
      const response = await axios.get(
        `https://671bb4d32c842d92c380ff3f.mockapi.io/UserAccount/${userId}`
      );
      console.log("Fetched user data:", response.data);
      setUserInfo(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      toast.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);


  const handleEdit = async () => {
    if (isActing) return;
    setIsActing(true);
    try {
      const response = await axios.put(
        `https://671bb4d32c842d92c380ff3f.mockapi.io/UserAccount/${selectedUser.id}`,
        userInfo
      );
      const updatedUser = userAPI.map((user) =>
        user.id === selectedUser.id ? response.data : user
      );
      toast.success("User edited successfully");
      setUserAPI(updatedUser);
      setSelectedUser(null);
      setIsEditModalOpen(false);
    } catch (error) {
      toast.error("Failed to edit user");
      console.error("Failed to edit user:", error);
    } finally {
      setIsActing(false);
    }
  };


  const handleSave = () => {
    handleEdit();
  };

  const toggleEditModal = (user = null) => {
    setSelectedUser(user);
    setUserInfo(user || userInfo);
    setIsEditModalOpen(!isEditModalOpen);
  };




  return (
    <div className="min-h-screen flex flex-col items-center bg-white py-2">
      <Toaster />

      {/* Avatar Section */}
      <div className="w-32 h-32 bg-gray-300 mb-10 rounded-full flex justify-center items-center">
        <span>AVATAR</span>
      </div>

      {/* Edit Button */}
      <div className="flex justify-end w-full max-w-4xl mb-4">
        <button
          className="text-sm font-semilight text-blue-600"
          onClick={() => toggleEditModal(userInfo)}
        >
          EDIT
        </button>
      </div>

      {/* User Info Section */}
      <div className="grid grid-cols-2 gap-8 w-full max-w-4xl mb-4">
        <div>
          <label className="block text-gray-700 text-xs mb-1 uppercase tracking-wider">NAME</label>
          <div className="w-full border border-gray-300 p-2 text-lg font-light">
            {userInfo.name}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-xs mb-1 uppercase tracking-wider">EMAIL</label>
          <div className="w-full border border-gray-300 p-2 text-lg font-light">
            {userInfo.email}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-xs mb-1 uppercase tracking-wider">LOYALTY POINT</label>
          <div className="w-full border border-gray-300 p-2 text-lg font-light">
            {userInfo.loyaltyPoint}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-xs mb-1 uppercase tracking-wider">PHONE</label>
          <div className="w-full border border-gray-300 p-2 text-lg font-light">
            {userInfo.phone}
          </div>
        </div>
      </div>

      {/* Date of Birth */}
      <div className="w-full max-w-4xl mb-4">
        <label className="block text-gray-700 text-xs mb-1 uppercase tracking-wider">DATE OF BIRTH</label>
        <input
          value={userInfo.birthday}
          className="w-full border border-gray-300 p-2 text-lg font-light"
          readOnly
        />
      </div>

      {/* Upcoming Appointment Section */}
      <div className="w-full max-w-2xl mb-4">
        <h3 className="text-gray-600 font-semibold mb-2 tracking-wide uppercase">Upcoming Appointment</h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold">TODAY</p>
            <p className="text-sm text-gray-500">10:00 - 11:00</p>
          </div>
          <div className="text-right">
            <p className="font-bold">Hoang Thach</p>
            <p className="text-sm text-gray-500">thachstylist@gmail.com</p>
          </div>
          <div className="text-right">
            <p className="font-bold">Bleach Hair</p>
            <p className="font-bold">Hair Styling</p>
          </div>
          <div className="flex items-center">
            <a
              href="#"
              className="text-sm font-semilight text-gray-500 flex items-center"
            >
              DETAIL
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex justify-end w-full max-w-2xl pt-10">
        <button
          className="px-5 py-1 font-montserrat font-bold italic bg-transparent border-2 border-black text-black hover:bg-black hover:text-white border-solid hover:scale-95 transform transition-all duration-300 ease-in-out"
          onClick={logout}
        >
          LOG OUT
        </button>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 w-full max-w-md rounded-md shadow-lg">
            <h3 className="text-lg font-bold mb-4">EDIT INFORMATION</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-gray-700 block mb-1">Name</label>
                <input
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div>
                <label className="text-gray-700 block mb-1">Email</label>
                <input
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-gray-700 block mb-1">Address</label>
                <input
                  value={userInfo.address}
                  onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
              <div>
                <label className="text-gray-700 block mb-1">Phone</label>
                <input
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  className="border border-gray-300 p-2 w-full"
                />
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={toggleEditModal}
                className="px-4 py-2 bg-gray-300 text-black font-semibold rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-black text-white font-semibold rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProfilePage;
