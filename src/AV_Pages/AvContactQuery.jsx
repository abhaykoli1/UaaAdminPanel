import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

const AvContactQueries = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/get-all-AvContact`)
      .then((response) => {
        setContacts(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching contact queries:", error);
      });
  }, []);

  return (
    <div className="queries-container">
      {/* <h2>All Contact Queries</h2> */}
      <div className="table-wrapper">
        <div className="table-responsive">
          <table className="queries-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Country Code</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{contact.name}</td>
                    <td>{contact.country_code || "N/A"}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.email}</td>
                    <td>{contact.message}</td>
                    <td>
                      {contact.createdAt
                        ? new Date(contact.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No contact queries found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AvContactQueries;
