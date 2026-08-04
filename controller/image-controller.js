const Image = require("../models/image");
const { uploadToCloudinary } = require("../HELPERS/helper");

const uploadImageController = async (req, res) => {
  try {
    // check if file is missing in req object

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required, please upload an image",
      });
    }

    // upload to cloudinary

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    // store the image to url and public id along with the uploaded user id in database
    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });
    await newlyUploadedImage.save();

    res.status(201).json({
      success: true,
      message: " Imaged uploaded successfully ",
      image: newlyUploadedImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "something went wrong! please try again later",
    });
  }
};

module.exports = {
  uploadImageController,
};
