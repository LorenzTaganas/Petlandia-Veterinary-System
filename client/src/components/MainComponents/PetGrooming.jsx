import React, { useState, useEffect } from "react";
import { uploadVideo, deleteVideo } from "../../services/petGroomingService";
import { getUserProfile } from "../../services/userService";
import axiosInstance from "../../services/axiosInstance";

const PetGrooming = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setUserRole(userProfile.role);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
    fetchVideoList();
  }, []);

  const fetchVideoList = async () => {
    try {
      const response = await axiosInstance.get("/pet-grooming/videos");
      setVideoList(response.data);
    } catch (error) {
      console.error("Error fetching videos", error);
    }
  };

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile || !title || !description) {
      alert("Please select a video file and provide a title and description.");
      return;
    }

    setLoading(true);
    try {
      const uploadedVideo = await uploadVideo(videoFile, title, description);
      alert("Video uploaded successfully!");
      setVideoList([...videoList, uploadedVideo]);
      fetchVideoList();
      setTitle("");
      setDescription("");
      setVideoFile(null);
    } catch (error) {
      console.error("Error uploading video", error);
      alert("Error uploading video");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (videoId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (confirmation) {
      setLoading(true);
      try {
        await deleteVideo(videoId);
        setVideoList(videoList.filter((video) => video.id !== videoId));
        alert("Video deleted successfully!");
      } catch (error) {
        console.error("Error deleting video", error);
        alert("Error deleting video");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Pet Grooming Videos
      </h2>
      {(userRole === "Admin" || userRole === "Staff") && (
        <div className="shadow-md rounded-lg p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Video File <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              disabled={loading}
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg p-2"
            />
          </div>
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-full py-2 px-4 text-white rounded-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Uploading..." : "Upload Video"}
          </button>
        </div>
      )}

      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Uploaded Videos
      </h3>
      <div className="flex gap-5">
        {videoList.length === 0 ? (
          <p className="text-gray-600">No videos uploaded yet.</p>
        ) : (
          videoList.map((video) => (
            <div
              key={video.id}
              className="bg-black shadow-md rounded-lg p-4 flex flex-col relative"
              style={{ width: "400px", height: "350px" }}
            >
              <video
                className="w-full h-52 object-cover rounded-md mb-2"
                controls
              >
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="text-center mb-2">
                <p className="font-bold text-white">{video.title}</p>
                <p className="text-sm text-white">{video.description}</p>
                <p className="text-xs mt-2 text-gray-400">
                  Uploaded by: {video.uploadedBy}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(video.createdAt).toLocaleString()}
                </p>
              </div>
              {userRole !== "Client" && (
                <button
                  onClick={() => handleDelete(video.id)}
                  className="py-2 px-4 text-white bg-red-600 hover:bg-red-700 rounded-lg absolute bottom-4 right-4"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PetGrooming;
