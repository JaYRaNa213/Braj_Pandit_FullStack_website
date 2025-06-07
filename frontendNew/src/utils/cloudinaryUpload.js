// // cloudinaryUpload.js
// export const cloudinaryUpload = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "your_upload_preset"); // ✅ Update this to match your Cloudinary preset

//   const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

//   const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
//     method: "POST",
//     body: formData,
//   });

//   const data = await res.json();
//   return data.secure_url;
// };


// src/utils/cloudinaryUpload.js
export async function cloudinaryUpload(file) {
  const url = `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/upload`;
  const preset = "YOUR_UPLOAD_PRESET";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Upload failed");

  const data = await response.json();
  return data.secure_url;
}
