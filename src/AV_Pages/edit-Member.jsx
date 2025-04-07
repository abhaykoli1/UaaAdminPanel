import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";

export default function AvEditMember() {
  const { _id } = useParams();
  const navigate = useNavigate();

  const [memberData, setMemberData] = useState({
    image: "",
    name: "",
    designation: "",
  });

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/get-AvMember/${_id}`
        );
        if (response.data && response.data.data) {
          setMemberData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching member:", error);
        alert("Failed to fetch member data");
      }
    };
    fetchMember();
  }, [_id]);

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
      await axios.put(`${config.API_URL}/update-AvMember/${_id}`, memberData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Member updated successfully!");
      navigate("/Av-all-Members");
    } catch (error) {
      console.error("Error updating member:", error);
      alert("Failed to update member");
    }
  };

  return (
    <div className="edit-member-container">
      <h2>Edit Member</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={memberData.name}
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="designation"
          value={memberData.designation}
          placeholder="Designation"
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        {memberData.image && (
          <img src={memberData.image} alt="Preview" className="preview-img" />
        )}
        <button type="submit">Update Member</button>
      </form>
    </div>
  );
}
