import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";
import { Editor } from "@tinymce/tinymce-react";

export default function EditSample() {
  const [categories, setCategories] = useState([]);

  console.log(categories);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/all-category`);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const { seo_title } = useParams(); // Get seo_title from URL params
  console.log("seo_title", seo_title.replace(/-/g, " "));

  const [sampleData, setSampleData] = useState({
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    pageCount: "",
    moduleName: "",
    moduleCode: "",
    wordcount: "",
    description: "",
    sample_category: "",
    price: "",
    sample_file: "",
    file: "",
    fileimages: [],
  });

  console.log("sampleData :", sampleData);

  useEffect(() => {
    const fetchSample = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/get-sample-perticuler/${seo_title}`
        );

        if (response.data && response.data.data) {
          setSampleData({
            ...response.data.data,
            fileimages: response.data.data.fileimages || [],
            sample_category: response.data.data.sample_category?._id,
          });
        }
      } catch (error) {
        console.log("Error fetching sample paper:", error);
        alert("Failed to fetch sample paper");
      }
    };

    fetchSample();
  }, [seo_title]);

  //for pdf
  const handleChange2 = async (e) => {
    const { name, files, value } = e.target;

    if (name === "sample_file" && files.length > 0) {
      const file = files[0];
      const fileUrl = await uploadPdf(file);
      if (fileUrl) {
        setSampleData((prevData) => ({
          ...prevData,
          sample_file: fileUrl,
        }));
      }
    } else {
      setSampleData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const uploadPdf = async (file) => {
    try {
      const formData = new FormData();
      formData.append("sample_file", file); // ✅ must match FastAPI

      const response = await axios.post(
        `${config.API_URL}/upload-pdf`, // ✅ new endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.file_url || "";
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed");
      return "";
    }
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "file" && files.length > 0) {
      const fileUrl = await uploadImage(files[0]);
      if (fileUrl) {
        setSampleData((prevData) => ({ ...prevData, file: fileUrl }));
      }
    } else if (name === "fileimages" && files.length > 0) {
      const fileList = Array.from(files);

      const uploadedUrls = await uploadMultipleImages(fileList);
      if (uploadedUrls.length > 0) {
        setSampleData((prevData) => ({
          ...prevData,
          fileimages: uploadedUrls,
        }));
      }
    } else {
      setSampleData((prevData) => ({ ...prevData, [name]: value }));
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

  const uploadMultipleImages = async (files) => {
    try {
      const uploadedUrls = await Promise.all(files.map(uploadImage));
      return uploadedUrls.filter((url) => url !== "");
    } catch (error) {
      console.error("Error uploading multiple images:", error);
      return [];
    }
  };

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${config.API_URL}/update-sample/${seo_title}`,
        sampleData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      navigate("/all-Samples");
      alert("Sample Paper updated successfully!");
      console.log("Sample Paper updated:", response.data);
    } catch (error) {
      console.log("Error updating sample paper:", error);
      alert("Failed to update sample paper");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeDescription = (value) => {
    setSampleData((prevFormData) => ({
      ...prevFormData,
      description: value, // Update long_description with editor content
    }));
  };
  return (
    <div className="add-service-container">
      <h2 className="add-service-title">Edit Sample Paper</h2>
      <form onSubmit={handleSubmit} className="add-service-fo space-y-4">
        <div>
          <label>SEO Title :</label>
          <input
            className="add-service-input"
            name="seo_title"
            value={sampleData.seo_title}
            placeholder="SEO Title"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>SEO Description :</label>
          <input
            className="add-service-input"
            value={sampleData.seo_description}
            name="seo_description"
            placeholder="SEO Description"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>SEO Keywords :</label>
          <input
            className="add-service-input"
            value={sampleData.seo_keywords}
            name="seo_keywords"
            placeholder="SEO Keywords"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Title :</label>
          <input
            className="add-service-input"
            value={sampleData.moduleName}
            name="moduleName"
            placeholder="Module Name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Module Code :</label>
          <input
            className="add-service-input"
            value={sampleData.moduleCode}
            name="moduleCode"
            placeholder="Module Code"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Page Count :</label>
          <input
            className="add-service-input"
            name="pageCount"
            value={sampleData.pageCount}
            placeholder="Page Count"
            type="number"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Word Count :</label>

          <input
            className="add-service-input"
            name="wordcount"
            value={sampleData.wordcount}
            placeholder="Word Count"
            type="number"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>price :</label>
          <input
            className="add-service-input"
            name="price"
            value={sampleData.price}
            placeholder="Price"
            type="number"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Sample Category :</label>
          <select
            className="add-service-input"
            name="sample_category"
            value={sampleData.sample_category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category._id.$oid} value={category._id.$oid}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mt-4 block">Upload PDF:</label>
          <input
            className="add-service-input mt-2"
            type="file"
            name="sample_file"
            accept="application/pdf"
            onChange={handleChange2}
          />

          {sampleData.sample_file && (
            <div className="mt-2">
              <a
                href={sampleData.sample_file}
                title="Uploaded PDF"
                target="_blank"
                rel="noopener noreferrer"
                className="!text-blue-600 underline"
              >
                View Uploaded PDF
              </a>
            </div>
          )}
        </div>

        <div>
          <label>Description :</label>
          <Editor
            apiKey={config.Editor_API}
            value={sampleData.description}
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

          <input
            className="add-service-input"
            type="file"
            name="file"
            accept="image/*"
            onChange={handleChange}
          />
          {sampleData.file && (
            <img
              src={sampleData.file}
              alt="Current Banner"
              className="preview-img mb-2"
            />
          )}
        </div>
        <div>
          <label>Images :</label>
          <input
            className="add-service-input"
            type="file"
            name="fileimages"
            multiple
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="image-preview">
          {sampleData.fileimages.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Preview ${index}`}
              className="preview-img"
            />
          ))}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
