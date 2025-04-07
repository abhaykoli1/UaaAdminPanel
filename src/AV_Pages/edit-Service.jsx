import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";

export default function AvEditService() {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [serviceData, setServiceData] = useState({
    image: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/get-AvService/${_id}`
        );
        if (response.data && response.data.data) {
          setServiceData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching service:", error);
        alert("Failed to fetch service");
      }
    };

    fetchService();
  }, [_id]);

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
      await axios.put(
        `${config.API_URL}/update-AvService/${_id}`,
        serviceData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      navigate("/Av-all-Services");
      alert("Service updated successfully!");
    } catch (error) {
      console.error("Error updating service:", error);
      alert("Failed to update service");
    }
  };

  return (
    <div className="add-service-container">
      <h2 className="add-service-title">Edit Service</h2>
      <form onSubmit={handleSubmit} className="add-service-form">
        <input
          className="add-service-input"
          name="title"
          value={serviceData.title}
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <textarea
          className="add-service-textarea"
          name="description"
          value={serviceData.description}
          placeholder="Description"
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
        {serviceData.image && (
          <img src={serviceData.image} alt="Service" className="preview-img" />
        )}
        <button type="submit" className="add-service-button">
          Update Service
        </button>
      </form>
    </div>
  );
}
