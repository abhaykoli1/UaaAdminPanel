import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";

export const AvAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/AvProductList`);
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${config.API_URL}/AvDeleteAProduct/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setLoading(false);
    }
  };

  const editProduct = ({ id }) => {
    console.log(id);
    navigate(`/edit-AvProduct/${id}`);
  };

  return (
    <div className="container">
      {loading || products.length === 0 ? (
        <div className="grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="skeleton"></div>
          ))}
        </div>
      ) : (
        <div className="grid">
          {products.map((product) => (
            <div key={product._id} className="card">
              <img
                src={product.image}
                alt={product.title}
                className="card-img"
              />
              <div className="card-header">
                <h3 className="card-title">{product.title}</h3>
              </div>
              <div className="card-content">
                <p className="card-description">{product.description}</p>
              </div>
              <div className="card-footer">
                <button
                  onClick={() => editProduct({ id: product._id.$oid })}
                  className="btn edit-btn"
                >
                  Edit
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => deleteProduct(product._id.$oid)}
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
