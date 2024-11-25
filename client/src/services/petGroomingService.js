import axiosInstance from "./axiosInstance";

export const uploadVideo = async (file, title, description) => {
  const formData = new FormData();
  formData.append("video", file);
  formData.append("title", title);
  formData.append("description", description);

  try {
    const response = await axiosInstance.post(
      "/pet-grooming/upload-video",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error uploading video:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Error uploading video");
  }
};

export const deleteVideo = async (videoId) => {
  try {
    const response = await axiosInstance.delete(
      `/pet-grooming/delete-video/${videoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting video:", error);
    throw new Error("Error deleting video");
  }
};
