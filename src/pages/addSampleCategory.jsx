import { useState } from "react";
import axios from "axios";
import config from "../config";

export default function AddSampleCategory() {
  const [sampleData, setSampleData] = useState({
    category:""
  });

  console.log(sampleData);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
      setSampleData((prevData) => ({ ...prevData, [name]: value }));

  };


  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${config.API_URL}/add-category`,
        sampleData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 201 || response.status === 200) {
        setSampleData({
            category:""
        });
      }

      alert("Sample Category Added successfully!");
      console.log("Sample Category Added:", response.data);
    } catch (error) {
      console.error("Error adding Sample Category :", error);
      alert("Failed to add Sample Category ");
    } finally {
      setLoading(false);
    }
  };
 

  return (
    <div className="">
      <div className="p-5">
        <form onSubmit={handleSubmit} className=" space-y-4">
          <div>
            <label>Sample Category :</label>
            <input
              className="add-service-input"
              name="category"
              value={sampleData.category}
              placeholder="Sample Category"
              onChange={handleChange}
              required
            />
          </div>
         
         
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
