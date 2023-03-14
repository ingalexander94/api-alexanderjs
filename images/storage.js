const cloudinary = require("./cloudinary.config");
const fs = require("fs").promises;

const uploadPhoto = async (path, folder = "apps") => {
  const { secure_url, public_id } = await cloudinary.uploader.upload(path, {
    folder: `${folder}/`,
  });
  folder !== "testimonials" && (await fs.unlink(path));
  return { photo: secure_url, public_id };
};

const deletePhoto = async (public_id) =>
  await cloudinary.uploader.destroy(public_id);

module.exports = {
  uploadPhoto,
  deletePhoto,
};
