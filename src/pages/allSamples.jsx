import React, { useEffect, useState } from "react";
import config from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AllSamples = () => {
  const [sample, setSample] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSamples();
  }, []);

  const fetchSamples = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/all-sample`);
      setSample(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching all Samples:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSample = async ({ sampleTitle }) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the sample: "${sampleTitle.replace(
        /-/g,
        " "
      )}"?`
    );

    if (!isConfirmed) return; // If the user cancels, do nothing

    console.log(sampleTitle);
    try {
      setLoading(true);
      const response = await axios.delete(
        `${config.API_URL}/delete-sample/${sampleTitle}`
      );
      window.location.reload();
      console.log("Sample deleted successfully:", response.data);
    } catch (error) {
      console.error(
        "Error deleting sample:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const editSample = ({ sampleTitle }) => {
    console.log(sampleTitle);
    navigate(`/edit-sample/${sampleTitle}`);
  };

  const navigate = useNavigate();

  return (
    <div className="container">
      {loading ? (
        <div className="grid lg:!grid-cols-3 md:!grid-cols-2 !grid-cols-1">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="skeleton"></div>
          ))}
        </div>
      ) : (
        <div className="grid lg:!grid-cols-3 md:!grid-cols-2 !grid-cols-1">
          {sample.length > 0 ? (
            sample.map((sample, index) => (
              <div key={index} className="card">
                <a
                  target="_blank"
                  href={`https://uniacademicassistance.in/sample/${sample.seo_title}`}
                >
                  <img
                    src={sample.sample.file}
                    alt={sample.sample.seo_title}
                    className="card-img"
                  />
                  <div className="card-header">
                    <h3 className="card-title">{sample.sample.seo_title}</h3>
                  </div>
                  <div className="card-content">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: sample.sample.description,
                      }}
                      className="card-description line-clamp"
                    />
                  </div>
                </a>
                <div className="card-footer">
                  <button
                    className="btn edit-btn"
                    onClick={() =>
                      editSample({
                        sampleTitle: sample.seo_title,
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() =>
                      deleteSample({ sampleTitle: sample.seo_title })
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="w-full flex justify-center items-center text-xl font-bold">
              No Sample Papers
            </p>
          )}
        </div>
      )}
    </div>
  );
};
