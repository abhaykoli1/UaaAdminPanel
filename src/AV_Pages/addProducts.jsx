import { useState } from "react";
import axios from "axios";
import config from "../config";

export default function AddAvProduct() {
  const [productData, setProductData] = useState({
    image: "", // Single image URL
    title: "",
    type: "",
  });

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const fileUrl = await uploadImage(files[0]);
      if (fileUrl) {
        setProductData((prevData) => ({ ...prevData, image: fileUrl }));
      }
    } else {
      setProductData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${config.API_URL}/upload-image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data.file_url || "";
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed");
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.API_URL}/AvAddProduct`,
        productData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Product added successfully!");
      console.log("Product added:", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="add-service-container">
      <form onSubmit={handleSubmit} className="add-service-form">
        <input
          className="add-service-input"
          name="title"
          placeholder="Product Title"
          onChange={handleChange}
          required
        />
        <input
          className="add-service-input"
          name="type"
          placeholder="Product Type"
          onChange={handleChange}
          required
        />
        <input
          className="add-service-input"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />

        {productData.image && (
          <img
            src={productData.image}
            alt="Product Preview"
            className="preview-img"
          />
        )}

        <button type="submit" className="add-service-button">
          Add Product
        </button>
      </form>
    </div>
  );
}
