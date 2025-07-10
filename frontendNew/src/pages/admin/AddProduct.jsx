// 🔐 Code developed by Jay Rana © 26/09/2025. Not for reuse or redistribution.

import React, { useState } from "react";
import axiosInstance from "../../services/axios";

function AddProduct() {
  const [imageType, setImageType] = useState("file"); // 'file' or 'url'
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageUrl("");
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    setImage(null);
    setPreview(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !productName ||
      !price ||
      !description ||
      !category ||
      (imageType === "file" && !image) ||
      (imageType === "url" && !imageUrl)
    ) {
      alert("Please fill all fields and provide an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);

    if (imageType === "file") {
      formData.append("image", image);
    } else {
      formData.append("imageUrl", imageUrl); // Backend must handle this
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res?.data?.success) {
        alert("✅ Product added successfully!");
        // Reset form
        setProductName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setImage(null);
        setImageUrl("");
        setPreview(null);
      } else {
        alert("❌ Failed to add product: " + (res?.data?.message || "Unknown error"));
      }
    } catch (err) {
      console.error("❌ Error adding product:", err);
      alert("Something went wrong while adding the product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold text-[#4A1C1C] mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full border p-3 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-3 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-3 rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-3 rounded"
        />

        {/* Image upload method */}
        <div className="flex gap-6 items-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="imageType"
              value="file"
              checked={imageType === "file"}
              onChange={() => setImageType("file")}
            />
            Upload from device
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="imageType"
              value="url"
              checked={imageType === "url"}
              onChange={() => setImageType("url")}
            />
            Use image URL
          </label>
        </div>

        {/* Conditional input field */}
        {imageType === "file" ? (
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-2 rounded"
          />
        ) : (
          <input
            type="text"
            placeholder="Paste image URL"
            value={imageUrl}
            onChange={handleImageUrlChange}
            className="w-full border p-2 rounded"
          />
        )}

        {preview && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Image Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-64 object-contain rounded shadow"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#4A1C1C] text-white py-3 rounded hover:bg-[#3a1515] transition"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
