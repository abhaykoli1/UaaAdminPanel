import { useState } from "react";
import axios from "axios";
import config from "../config";
import { Editor } from "@tinymce/tinymce-react";

export default function AddSample() {
  const [sampleData, setSampleData] = useState({
    seo_title: "",
    seo_description: "",
    pageCount: "",
    moduleName: "",
    moduleCode: "",
    wordcount: "",
    description: "",
    sample_category: "",
    price: "",
    file: "", // Single image URL
    fileimages: [], // Multiple image URLs
  });

  console.log(sampleData);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "file" && files.length > 0) {
      // Upload a single file
      const fileUrl = await uploadImage(files[0]);
      if (fileUrl) {
        setSampleData((prevData) => ({ ...prevData, file: fileUrl }));
      }
    } else if (name === "fileimages" && files.length > 0) {
      // Upload multiple files
      const fileList = Array.from(files);
      const uploadedUrls = await uploadMultipleImages(fileList);
      if (uploadedUrls.length > 0) {
        setSampleData((prevData) => ({
          ...prevData,
          fileimages: uploadedUrls,
        }));
      }
    } else {
      // Handle other input fields
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

      return response.data.file_url || ""; // Return uploaded image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Image upload failed");
      return "";
    }
  };

  const uploadMultipleImages = async (files) => {
    try {
      const uploadedUrls = await Promise.all(files.map(uploadImage));
      return uploadedUrls.filter((url) => url !== ""); // Remove any failed uploads
    } catch (error) {
      console.error("Error uploading multiple images:", error);
      return [];
    }
  };
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${config.API_URL}/upload-sample`,
        sampleData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 201 || response.status === 200) {
        setSampleData({
          seo_title: "",
          seo_description: "",
          pageCount: "",
          moduleName: "",
          moduleCode: "",
          wordcount: "",
          description: "",
          sample_category: "",
          price: "",
          file: "", // Single image URL
          fileimages: [], // Multiple image URLs
        });
      }

      alert("Sample Paper added successfully!");
      console.log("Sample Paper added:", response.data);
    } catch (error) {
      console.error("Error adding sample paper:", error);
      alert("Failed to add sample paper");
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
    <div className="">
      {/* <h2 className="add-service-title">Add Sample Paper</h2> */}
      <div className="p-5">
        <form onSubmit={handleSubmit} className=" space-y-4">
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
            <label>Module Name :</label>
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
            <label>Module code :</label>
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

            <input
              className="add-service-input"
              name="sample_category"
              value={sampleData.sample_category}
              placeholder="Sample Category"
              type="text"
              onChange={handleChange}
              required
            />
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
          </div>
          <input
            className="add-service-input"
            type="file"
            name="file"
            // value={sampleData.file}
            accept="image/*"
            onChange={handleChange}
            required
          />{" "}
          <div>
            <label>Images :</label>
            <input
              className="add-service-input"
              type="file"
              // value={sampleData.fileimages}
              name="fileimages"
              multiple
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <div className="image-preview">
            {sampleData.file && (
              <img
                src={sampleData.file}
                alt="File Preview"
                className="preview-img"
              />
            )}
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
    </div>
  );
}
