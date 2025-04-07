import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminSection = ({ title, endpoint, path }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoint);
        setData(response.data.data || []);
      } catch (error) {
        console.error(`Error fetching ${title}:`, error);
      }
    };

    fetchData();
  }, [endpoint]);

  return (
    <a
      href={path}
      className="!text-black w-full rounded shadow-lg border border-gray-300 bg-gray-100 p-7 flex items-center justify-between"
    >
      <p className="text-xl font-bold">{title}</p>
      <span className="text-red-500">({data.length})</span>
    </a>
  );
};

export default AdminSection;
