import React from "react";
import { useState, useEffect } from "react";
import AdminSection from "../components/adminSection";
import config from "../config";
import axios from "axios";
import SampleCategoryManager from "../pages/sampleCategory";
import HeroManager from "./HeroImages";

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.API_URL}/get-all-users`)
      .then((response) => {
        setUsers(response.data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(blogs);
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/get-allblogs`);
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching all Blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-14 p-5">
      <div className="grid lg:!grid-cols-3 md:!grid-cols-2 !grid-cols-1">
        <AdminSection
          title="Blogs"
          endpoint={`${config.API_URL}/get-allblogs`}
          path={"/all-Blog"}
        />
        <AdminSection
          title="Services"
          endpoint={`${config.API_URL}/get-allService`}
          path={"/all-Services"}
        />
        <AdminSection
          title="Sample Papers"
          endpoint={`${config.API_URL}/all-sample`}
          path={"/all-Samples"}
        />
      </div>
      {/* <div className="grid lg:!grid-cols-2 md:!grid-cols-2 !grid-cols-1  w-full"> */}
      <HeroManager />
      {/* <SampleCategoryManager /> */}
      {/* </div> */}
    </section>
  );
};
