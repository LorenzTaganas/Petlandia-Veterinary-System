const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const multerStorage = multer.memoryStorage();

exports.upload = multer({
  storage: multerStorage,
  fileFilter: (req, file, cb) => {
    const filetypes = /mp4|mov|avi|mkv|flv|wmv/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      console.error("Invalid file type:", file.mimetype);
      return cb(new Error("Only video files are allowed!"));
    }
  },
  limits: { fileSize: 100000000 },
});

exports.uploadVideoToCloudinary = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "video",
          folder: "pet_grooming_videos",
        },
        (error, result) => {
          if (error) {
            console.error("Error uploading video to Cloudinary:", error);
            return reject(error);
          }
          resolve(result);
        }
      )
      .end(file.buffer);
  });
};
