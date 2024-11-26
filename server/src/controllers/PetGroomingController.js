const { PrismaClient } = require("@prisma/client");
const cloudinary = require("cloudinary").v2;
const {
  upload,
  uploadVideoToCloudinary,
} = require("../config/cloudinaryConfig");
const prisma = new PrismaClient();

exports.fetchVideos = async (req, res) => {
  try {
    const videos = await prisma.petGroomingVideo.findMany();
    return res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return res.status(500).json({ message: "Error fetching videos" });
  }
};

exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file || !req.body.title || !req.body.description) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const { title, description } = req.body;
    const uploadedBy = req.user.fullName;

    const cloudinaryResult = await uploadVideoToCloudinary(req.file);

    const newVideo = await prisma.petGroomingVideo.create({
      data: {
        videoUrl: cloudinaryResult.secure_url,
        title: title,
        description: description,
        uploadedBy: uploadedBy,
      },
    });

    return res.status(200).json(newVideo);
  } catch (error) {
    console.error("Error uploading video:", error);
    return res.status(500).json({ message: "Error uploading video" });
  }
};

exports.deleteVideo = async (req, res) => {
  try {
    const videoId = req.params.id;

    const video = await prisma.petGroomingVideo.findUnique({
      where: { id: parseInt(videoId) },
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const publicId = video.videoUrl.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId);

    await prisma.petGroomingVideo.delete({
      where: { id: parseInt(videoId) },
    });

    return res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    return res.status(500).json({ message: "Error deleting video" });
  }
};
