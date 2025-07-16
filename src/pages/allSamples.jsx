import React, { useEffect, useState } from "react";
import config from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AllSamples = () => {
  const [sample, setSample] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

    if (!isConfirmed) return;

    try {
      setLoading(true);
      await axios.delete(`${config.API_URL}/delete-sample/${sampleTitle}`);
      await fetchSamples(); // refresh instead of reload
      console.log("Sample deleted successfully");
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
    navigate(`/edit-sample/${sampleTitle}`);
  };

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
            sample.map((sampleItem, index) => (
              <div key={index} className="card">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Sample"
                  href={`https://uniacademicassistance.in/sample/${sampleItem.seo_title}`}
                >
                  <img
                    src={sampleItem?.file}
                    alt={sampleItem.moduleName || ""}
                    className="card-img"
                  />

                  <div className="card-header">
                    <h3 className="card-title">{sampleItem.moduleName}</h3>
                  </div>
                  {sampleItem.description && (
                    <div className="card-content">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: sampleItem.description,
                        }}
                        className="card-description line-clamp"
                      />
                    </div>
                  )}
                </a>
                <div className="card-footer">
                  <button
                    className="btn edit-btn"
                    onClick={() =>
                      editSample({ sampleTitle: sampleItem.seo_title })
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() =>
                      deleteSample({ sampleTitle: sampleItem.seo_title })
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
