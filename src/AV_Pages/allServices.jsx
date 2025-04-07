import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";

export const AvAllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  console.log(services);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/AvServiceList`);
      setServices(response.data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${config.API_URL}/AvDeleteAService/${id}`);
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    } finally {
      setLoading(false);
    }
  };

  const editService = ({ id }) => {
    console.log(id);
    navigate(`/edit-AvService/${id}`);
  };

  return (
    <div className="container">
      {loading ? (
        <div className="grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="skeleton"></div>
          ))}
        </div>
      ) : (
        <div className="grid">
          {services.map((service) => (
            <div key={service._id} className="card">
              <img
                src={service.image}
                alt={service.title}
                className="card-img"
              />
              <div className="card-header">
                <h3 className="card-title">{service.title}</h3>
              </div>
              <div className="card-content">
                <p className="card-description">{service.description}</p>
              </div>
              <div className="card-footer">
                <button
                  onClick={() => editService({ id: service._id.$oid })}
                  className="btn edit-btn"
                >
                  Edit
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => deleteService(service._id.$oid)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
