import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";
import { Editor } from "@tinymce/tinymce-react";

export default function EditService() {
  const { serviceTitle } = useParams();

  // const serviceTitle = "Academic Writing Services";

  console.log("serviceTitle", serviceTitle);
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState({
    title: "",
    shortDec: "",
    seo_title: "",
    seo_description: "",
    description: "",
    bannerImg: "",
    icon: "",
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/get-service/${serviceTitle}`
        );
        console.log("response", response.data.data);
        if (response.data && response.data.data) {
          setServiceData(...response.data.data);
        }
      } catch (error) {
        console.error("Error fetching service data:", error);
        alert("Failed to fetch service data");
      }
    };
    fetchService();
  }, [serviceTitle]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if ((name === "bannerImg" || name === "icon") && files.length > 0) {
      const fileUrl = await uploadImage(files[0]);
      if (fileUrl) {
        setServiceData((prevData) => ({ ...prevData, [name]: fileUrl }));
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
        `${config.API_URL}/update-service/${serviceTitle}`,
        serviceData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("Service updated successfully!");
      navigate("/all-services");
    } catch (error) {
      console.error("Error updating service:", error);
      alert("Failed to update service");
    }
  };

  const handleDescriptionChange = (value) => {
    setServiceData((prevData) => ({ ...prevData, description: value }));
  };

  return (
    <div className="add-service-container">
      <h2 className="add-service-title">Edit Service</h2>
      <form onSubmit={handleSubmit} className="add-service-form">
        <div>
          <label className="mb-1">SEO Title :</label>
          <input
            className="add-service-input"
            name="seo_title"
            value={serviceData.seo_title}
            placeholder="SEO Title"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="mb-1">SEO Description :</label>
          <input
            className="add-service-input"
            value={serviceData.seo_description}
            name="seo_description"
            placeholder="SEO Description"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="mb-1">Service Title :</label>
          <input
            className="add-service-input"
            value={serviceData.title}
            name="title"
            placeholder="Service Title"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="mb-1">Short Description :</label>
          <input
            className="add-service-input"
            value={serviceData.shortDec}
            name="shortDec"
            placeholder="Short Description"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="mb-1">Description:</label>
          <Editor
            apiKey={config.Editor_API}
            value={serviceData.description}
            onEditorChange={handleDescriptionChange}
            init={{
              height: 250,
              menubar: true,
              plugins: ["lists", "table", "link", "code", "help"],
              toolbar:
                "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | removeformat | help",
            }}
          />
        </div>
        <div>
          <label className="mb-1">Banner Image :</label>
          <input
            className="add-service-input"
            type="file"
            name="bannerImg"
            accept="image/*"
            onChange={handleChange}
          />
          {serviceData.bannerImg && (
            <img
              src={serviceData.bannerImg}
              alt="Banner Preview"
              className="preview-img"
            />
          )}
        </div>
        <div>
          <label className="mb-1">Icon :</label>
          <input
            className="add-service-input"
            type="file"
            name="icon"
            accept="image/*"
            onChange={handleChange}
          />
          {serviceData.icon && (
            <img
              src={serviceData.icon}
              alt="Icon Preview"
              className="preview-img"
            />
          )}
        </div>
        <button type="submit" className="add-service-button">
          Update Service
        </button>
      </form>
    </div>
  );
}
