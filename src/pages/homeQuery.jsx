import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

const HomeQueries = () => {
  const [queries, setQueries] = useState([]);
  console.log(queries);
  useEffect(() => {
    axios
      .get(`${config.API_URL}/get-all-queries`)
      .then((response) => {
        setQueries(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching queries:", error);
      });
  }, []);

  return (
    <div className="queries-container">
      {/* <h2>All Queries</h2> */}
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
                <th>Service Type</th>
                <th>Course Name</th>
                <th>Deadline</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {queries.length > 0 ? (
                queries.map((query, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{query.name}</td>
                    <td>{query.email}</td>
                    <td>{query.phone}</td>
                    <td>{query.country_code}</td>
                    <td>{query.service_type}</td>
                    <td>{query.course_name}</td>
                    <td>{query.deadline}</td>
                    <td>
                      {query.createdAt
                        ? new Date(query.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No queries found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomeQueries;
