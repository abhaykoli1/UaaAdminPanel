import { useState } from "react";
import axios from "axios";
import config from "../config";

export default function AddAvMembers() {
  const [memberData, setMemberData] = useState({
    image: "", // Single image URL
    name: "",
    designation: "",
  });

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const fileUrl = await uploadImage(files[0]);
      if (fileUrl) {
        setMemberData((prevData) => ({ ...prevData, image: fileUrl }));
      }
    } else {
      setMemberData((prevData) => ({ ...prevData, [name]: value }));
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
        `${config.API_URL}/AvAddMembers`,
        memberData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Member added successfully!");
      console.log("Member added:", response.data);
    } catch (error) {
      console.error("Error adding member:", error);
      alert("Failed to add member");
    }
  };

  return (
    <div className="add-service-container">
      <form onSubmit={handleSubmit} className="add-service-form">
        <input
          className="add-service-input"
          name="name"
          placeholder="Member Name"
          onChange={handleChange}
          required
        />
        <input
          className="add-service-input"
          name="designation"
          placeholder="Member Designation"
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

        {memberData.image && (
          <img
            src={memberData.image}
            alt="Member Preview"
            className="preview-img"
          />
        )}

        <button type="submit" className="add-service-button">
          Add Member
        </button>
      </form>
    </div>
  );
}
