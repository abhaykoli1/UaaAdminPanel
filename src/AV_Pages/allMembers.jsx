import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config";

export const AllAvMembers = () => {
  const [members, setMembers] = useState([]);
  console.log(members);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/AvMembersList`);
      setMembers(response.data.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (id) => {
    console.log(id);
    try {
      setLoading(true);
      await axios.delete(`${config.API_URL}/AvDeleteAMember/${id}`);
      fetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
    } finally {
      setLoading(false);
    }
  };

  const editMember = ({ id }) => {
    navigate(`/edit-AvMember/${id}`);
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
          {members.length > 0 &&
            members.map((member) => (
              <div key={member._id} className="card">
                <img
                  src={member.image}
                  alt={member.name}
                  className="card-img"
                />
                <div className="card-header">
                  <h3 className="card-title">{member.name}</h3>
                  <p className="card-designation">{member.designation}</p>
                </div>
                <div className="card-footer">
                  <button
                    onClick={() => editMember({ id: member._id.$oid })}
                    className="btn edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => deleteMember(member._id.$oid)}
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
