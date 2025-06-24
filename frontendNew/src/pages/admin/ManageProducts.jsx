import React, { useEffect, useState } from "react";
import {
  getAllAdminProducts,
  deleteProduct,
  updateProduct,
} from "../../services/api";
import { CSVLink } from "react-csv";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await getAllAdminProducts();
      const all = res.data?.data || [];
      setProducts(all);
      setFiltered(all);
    } catch (err) {
      alert("Failed to fetch products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let temp = [...products];
    if (search) {
      temp = temp.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          (p.category || "").toLowerCase().includes(search.toLowerCase())
      );
    }
    if (categoryFilter !== "All") {
      temp = temp.filter((p) => p.category === categoryFilter);
    }
    setFiltered(temp);
    setCurrentPage(1); // reset to page 1 on filter
  }, [search, categoryFilter, products]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch {
        alert("Failed to delete product.");
      }
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      price: product.price,
      category: product.category || "",
      description: product.description || "",
    });
    setImageFile(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("price", editForm.price);
      formData.append("category", editForm.category);
      formData.append("description", editForm.description);
      if (imageFile) formData.append("image", imageFile);
      await updateProduct(editingProduct._id, formData);
      setEditingProduct(null);
      fetchProducts();
    } catch {
      alert("Failed to update product.");
    } finally {
      setUpdating(false);
    }
  };

  // Pagination Logic
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentProducts = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / perPage);

  const allCategories = ["All", ...new Set(products.map((p) => p.category || "Uncategorized"))];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">Manage Products</h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Search by name or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4"
        >
          {allCategories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* CSV Export */}
      <div className="mb-4 text-right">
        <CSVLink
          data={products}
          filename="products_export.csv"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Export CSV
        </CSVLink>
      </div>

      {/* Products Table */}
      <table className="w-full border border-gray-300 rounded-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Category</th>
            <th className="p-3 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-6 text-center text-gray-500">
                No products found.
              </td>
            </tr>
          ) : (
            currentProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="p-3 border">{product.name}</td>
                <td className="p-3 border">₹{product.price}</td>
                <td className="p-3 border">{product.category}</td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => openEditModal(product)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-purple-700">Edit Product</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full border p-2 rounded"
                placeholder="Product Name"
              />
              <input
                type="number"
                value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                className="w-full border p-2 rounded"
                placeholder="Price"
              />
              <input
                type="text"
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                className="w-full border p-2 rounded"
                placeholder="Category"
              />
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="w-full border p-2 rounded"
                placeholder="Description"
              />
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-4 py-2 bg-purple-700 text-white rounded"
                >
                  {updating ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
