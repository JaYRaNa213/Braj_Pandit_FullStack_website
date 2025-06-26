import { BACKEND_URL } from "../utils/config"; // adjust if path is different

export const cloudinaryUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BACKEND_URL}/user/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Upload failed");
  }

  return data.data.url;
};
