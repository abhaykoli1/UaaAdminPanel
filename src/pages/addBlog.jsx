import { useState } from "react";
import axios from "axios";
import config from "../config";
import { Editor } from "@tinymce/tinymce-react";

export default function AddBlog() {
  const [blogData, setBlogData] = useState({
    seo_title: "",
    seo_description: "",
    title: "",
    shortDec: "",
    description: "",
    service_category: "",
    // cr_date: new Date().toISOString(),
    bannerImg: "",
  });

  console.log("blog Data", blogData);
  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "bannerImg" && files.length > 0) {
      const fileUrl = await uploadImage(files[0]);
      if (fileUrl) {
        setBlogData((prevData) => ({ ...prevData, [name]: fileUrl }));
      }
    } else {
      setBlogData((prevData) => ({ ...prevData, [name]: value }));
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
        `${config.API_URL}/add-blog`,
        blogData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201 || response.status === 200) {
        setBlogData({
          seo_title: "",
          seo_description: "",
          title: "",
          shortDec: "",
          description: "",
          service_category: "",
          bannerImg: "", // Single image URL
        });
      }

      alert("Blog added successfully!");
      console.log("Blog added:", response);
    } catch (error) {
      console.log("Error adding blog:", error);
      alert("Failed to add blog");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeDescription = (value) => {
    setBlogData((prevFormData) => ({
      ...prevFormData,
      description: value,
    }));
  };

  return (
    <div className="add-blog-container p-5">
      <form onSubmit={handleSubmit} className="add-blog-form space-y-4">
        <div>
          <label>SEO Title :</label>
          <input
            className="add-blog-input"
            name="seo_title"
            value={blogData.seo_title}
            placeholder="SEO Title"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>SEO Description :</label>
          <input
            className="add-blog-input"
            value={blogData.seo_description}
            name="seo_description"
            placeholder="SEO Description"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Blog Title :</label>
          <input
            className="add-blog-input"
            value={blogData.title}
            name="title"
            placeholder="Blog Title"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Short Description :</label>
          <input
            className="add-blog-input"
            value={blogData.shortDec}
            name="shortDec"
            placeholder="Short Description"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="mb-1">Service Category :</label>
          <input
            className="add-service-input"
            name="service_category"
            value={blogData.service_category}
            placeholder="Service Category"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description :</label>
          <Editor
            apiKey={config.Editor_API}
            value={blogData.description}
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
                "undo redo | formatselect | fontsizeselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | removeformat | help",
              fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt",
            }}
          />
        </div>
        <div>
          <label>Banner Image :</label>
          <input
            className="add-blog-input"
            type="file"
            name="bannerImg"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <div className="image-preview">
          {blogData.bannerImg && (
            <img
              src={blogData.bannerImg}
              alt="Banner Preview"
              className="preview-img"
            />
          )}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
