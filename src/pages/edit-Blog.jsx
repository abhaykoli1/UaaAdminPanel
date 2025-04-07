import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";
import { Editor } from "@tinymce/tinymce-react";

export default function EditBlog() {
  const { seo_title } = useParams();
  console.log("seo_title", seo_title.replace(/-/g, " "));
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({
    title: "",
    shortDec: "",
    bannerImg: "",
    seo_title: "",
    seo_description: "",
    service_category: "",
    cr_date: new Date().toISOString(),
    description: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/get-blog/${seo_title}`
        );
        if (response.data && response.data.data) {
          setBlogData({
            ...response.data.data,
          });
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        alert("Failed to fetch blog data");
      }
    };

    fetchBlog();
  }, [seo_title]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "bannerImg" && files.length > 0) {
      const fileUrl = await uploadImage(files[0]);
      if (fileUrl) {
        setBlogData((prevData) => ({ ...prevData, bannerImg: fileUrl }));
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

  const handleChangeDescription = (value) => {
    setBlogData((prevFormData) => ({
      ...prevFormData,
      description: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${config.API_URL}/update-blog/${seo_title}`, blogData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Blog updated successfully!");
      navigate("/all-Blog");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog");
    }
  };

  return (
    <div className="add-service-container">
      <h2 className="add-service-title">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="add-service-fo space-y-4">
        <div>
          <label className="mb-1">Title :</label>{" "}
          <input
            className="add-service-input"
            name="title"
            value={blogData.title}
            placeholder="Title"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="mb-1">Short Description :</label>
          <input
            className="add-service-input"
            name="shortDec"
            value={blogData.shortDec}
            placeholder="Short Description"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="mb-1">SEO Title :</label>
          <input
            className="add-service-input"
            name="seo_title"
            value={blogData.seo_title}
            placeholder="SEO Title"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="mb-1">SEO Description :</label>
          <input
            className="add-service-input"
            name="seo_description"
            value={blogData.seo_description}
            placeholder="SEO Description"
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
          <label className="mb-1">Description :</label>
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
            className="add-service-input"
            type="file"
            name="bannerImg"
            accept="image/*"
            onChange={handleChange}
          />
          {blogData.bannerImg && (
            <img
              src={blogData.bannerImg}
              alt="Banner Preview"
              className="preview-img"
            />
          )}
        </div>
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
}
