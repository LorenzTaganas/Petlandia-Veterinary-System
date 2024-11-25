const express = require("express");
const {
  upload,
  uploadVideoToCloudinary,
} = require("../config/cloudinaryConfig");
const petGroomingController = require("../controllers/PetGroomingController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.get("/videos", authenticate, petGroomingController.fetchVideos);

router.post(
  "/upload-video",
  authenticate,
  upload.single("video"),
  petGroomingController.uploadVideo
);

router.delete(
  "/delete-video/:id",
  authenticate,
  petGroomingController.deleteVideo
);

module.exports = router;
