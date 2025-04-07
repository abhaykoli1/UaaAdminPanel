import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";

export default function AvEditProduct() {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    image: "",
    title: "",
    type: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/get-AvProduct/${_id}`
        );
        if (response.data && response.data.data) {
          setProductData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Failed to fetch product");
      }
    };

    fetchProduct();
  }, [_id]);

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
      await axios.put(
        `${config.API_URL}/update-AvProduct/${_id}`,
        productData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      navigate("/Av-all-Products");
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  return (
    <div className="add-service-container">
      <h2 className="add-service-title">Edit Product</h2>
      <form onSubmit={handleSubmit} className="add-service-form">
        <input
          className="add-service-input"
          name="title"
          value={productData.title}
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <input
          className="add-service-input"
          name="type"
          value={productData.type}
          placeholder="Type"
          onChange={handleChange}
          required
        />
        <input
          className="add-service-input"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        {productData.image && (
          <img src={productData.image} alt="Product" className="preview-img" />
        )}
        <button type="submit" className="add-service-button">
          Update Product
        </button>
      </form>
    </div>
  );
}
