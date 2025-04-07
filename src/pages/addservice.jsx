import { useState } from "react";
import axios from "axios";
import config from "../config";
import { Editor } from "@tinymce/tinymce-react";

export default function AddService() {
  const [serviceData, setServiceData] = useState({
    seo_title: "",
    seo_description: "",
    title: "",
    shortDec: "",
    description: "",
    bannerImg: "", // Single image URL
    icon: "", // Single image URL
  });

  console.log(serviceData);

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${config.API_URL}/add-service`,
        serviceData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 201 || response.status === 200) {
        setServiceData({
          seo_title: "",
          seo_description: "",
          title: "",
          shortDec: "",
          description: "",
          bannerImg: "", // Single image URL
          icon: "", // Single image URL
        });
      }

      alert("Service added successfully!");
      console.log("Service added:", response.data);
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service");
    } finally {
      setLoading(false);
    }
  };
  const handleChangeDescription = (value) => {
    setServiceData((prevFormData) => ({
      ...prevFormData,
      description: value,
    }));
  };

  return (
    <div className="add-service-containe">
      <div className="p-5">
        <form onSubmit={handleSubmit} className="add-service-fo space-y-4">
          <div>
            <label>SEO Title :</label>
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
            <label>SEO Description :</label>
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
            <label>Service Title :</label>
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
            <label>Short Description :</label>
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
            <label>Description :</label>
            <Editor
              apiKey={config.Editor_API}
              value={serviceData.description}
              onEditorChange={handleChangeDescription}
              init={{
                height: 250,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                  "lists",
                  "table",
                ],
                toolbar:
                  "undo redo | formatselect | fontsizeselect | bold italic underline | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | table | removeformat | help",
                fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt",
              }}
            />
          </div>
          <div>
            <label>Banner Image :</label>
          </div>
          <input
            className="add-service-input"
            type="file"
            name="bannerImg"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <div>
            <label>Icon :</label>
            <input
              className="add-service-input"
              type="file"
              name="icon"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <div className="image-preview">
            {serviceData.bannerImg && (
              <img
                src={serviceData.bannerImg}
                alt="Banner Preview"
                className="preview-img"
              />
            )}
            {serviceData.icon && (
              <img
                src={serviceData.icon}
                alt="Icon Preview"
                className="preview-img"
              />
            )}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
