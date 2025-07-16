import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import { BsPencilSquare } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
const SampleCategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const API_URL = config.API_URL;

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${API_URL}/all-category`);
      setCategories(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCategory = async () => {
    if (!categoryInput) return;

    try {
      await axios.post(`${API_URL}/add-category`, {
        category: categoryInput,
      });
      setCategoryInput("");
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (cat) => {
    setEditMode(true);
    setEditId(cat._id["$oid"]);
    setCategoryInput(cat.category);
  };

  const handleUpdateCategory = async () => {
    try {
      await axios.put(`${API_URL}/update-category/${editId}`, {
        category: categoryInput,
      });
      setEditMode(false);
      setCategoryInput("");
      setEditId(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the Sample Category?`
    );

    if (!isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/delete-category/${id}`);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className=" mt-10 p-4 bg-white ">
      {/* <h2 className="text-xl font-bold mb-4 text-">Sample Category</h2> */}

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 w-full rounded"
          placeholder="Enter category"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white max-w-24 px-4 py-2 rounded"
          onClick={editMode ? handleUpdateCategory : handleAddCategory}
        >
          {editMode ? "Update" : "Add"}
        </button>
      </div>

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat._id["$oid"]}
            className="flex justify-between items-center bg-gray-100 p-3 rounded"
          >
            <span>{cat.category}</span>
            <div className="space-x-2 flex">
              <div
                onClick={() => handleEdit(cat)}
                className=" px-3 py-1 rounded "
              >
                <BsPencilSquare size={20} />
              </div>
              <div
                onClick={() => handleDelete(cat._id["$oid"])}
                className=" px-3 py-1 rounded "
              >
                <FaTrashAlt size={20} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SampleCategoryManager;
