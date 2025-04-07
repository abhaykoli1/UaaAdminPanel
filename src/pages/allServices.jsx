import React, { useEffect, useState } from "react";
import config from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("services", services);
  useEffect(() => {
    fetchServices();
  }, []);

  const deleteService = async ({ serviceTitle }) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the service: "${serviceTitle.replace(
        /-/g,
        " "
      )}"?`
    );

    if (!isConfirmed) return; // If the user cancels, do nothing

    console.log(serviceTitle);
    try {
      setLoading(true);
      const response = await axios.delete(
        `${config.API_URL}/delete-service/${serviceTitle}`
      );
      window.location.reload();
      console.log("Service deleted successfully:", response.data);
    } catch (error) {
      console.error(
        "Error deleting service:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/get-allService`);
      setServices(response.data.data);
    } catch (error) {
      console.error("Error fetching all services:", error);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  const editService = ({ serviceTitle }) => {
    navigate(`/edit-service/${serviceTitle}`);
  };

  return (
    <div className="container ">
      {/* <h2 className="title">All Services</h2> */}
      {loading ? (
        <div className="grid lg:!grid-cols-3 md:!grid-cols-2 !grid-cols-1">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="skeleton"></div>
          ))}
        </div>
      ) : (
        <div className="grid lg:!grid-cols-3 md:!grid-cols-2 !grid-cols-1">
          {services.map((service, index) => (
            <div key={index} className="card">
              <a
                target="_blank"
                href={`https://uniacademicassistance.in/service/${service.seo_title}`}
              >
                <img
                  src={
                    service.service.bannerImg ||
                    "https://via.placeholder.com/300"
                  }
                  alt={service.service.title}
                  className="card-img"
                />
                <div className="card-header">
                  <h3 className="card-title">{service.service.title}</h3>
                </div>
                <div className="card-content">
                  <p className="card-description line-clamp">
                    {service.service.shortDec}
                  </p>
                </div>
              </a>
              <div className="card-footer">
                <button
                  onClick={() =>
                    editService({ serviceTitle: service.seo_title })
                  }
                  className="btn edit-btn"
                >
                  Edit
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() =>
                    deleteService({ serviceTitle: service.seo_title })
                  }
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

export default AllServices;
