import { useState } from "react";
import axios from "axios";
import config from "../config";

export default function AddAvService() {
  const [serviceData, setServiceData] = useState({
    image: "", // Single image URL
    title: "",
    description: "",
  });

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const fileUrl = await uploadImage(files[0]);
      if (fileUrl) {
        setServiceData((prevData) => ({ ...prevData, image: fileUrl }));
      }
    } else {
      setServiceData((prevData) => ({ ...prevData, [name]: value }));
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
        `${config.API_URL}/AvAddService`,
        serviceData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Service added successfully!");
      console.log("Service added:", response.data);
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service");
    }
  };

  return (
    <div className="add-service-container">
      <form onSubmit={handleSubmit} className="add-service-form">
        <input
          className="add-service-input"
          name="title"
          placeholder="Service Title"
          onChange={handleChange}
          required
        />
        <textarea
          className="add-service-input"
          name="description"
          placeholder="Service Description"
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

        {serviceData.image && (
          <img
            src={serviceData.image}
            alt="Service Preview"
            className="preview-img"
          />
        )}

        <button type="submit" className="add-service-button">
          Add Service
        </button>
      </form>
    </div>
  );
}
