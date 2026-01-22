import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: File): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "product-uas-framework" },
        (error, result) => {
          if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(error);
        }
        resolve(result?.secure_url || '');
        },
      );

      uploadStream.end(buffer);
    } catch (err) {
      reject(err);
    }
  });
};

export const deleteImage = async (imageUrl?: string) => {
  if (!imageUrl) return;

  try {
    const urlWithoutPrefix = imageUrl.replace(/^https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/v\d+\//, '');

    const publicIdWithExt = urlWithoutPrefix.split('?')[0];
    const publicId = publicIdWithExt.replace(/\.[^/.]+$/, "");

    if (!publicId) {
      console.warn("Tidak bisa ekstrak public_id dari URL:", imageUrl);
      return;
    }

    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });
  } catch (err) {
    console.error("Gagal hapus gambar Cloudinary:", err);
  }
};
