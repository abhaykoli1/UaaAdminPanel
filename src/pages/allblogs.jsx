import React, { useEffect, useState } from "react";
import config from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllBlogs = () => {
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

  const deleteBlog = async ({ blogTitle }) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the blog: "${blogTitle.replace(
        /-/g,
        " "
      )}"?`
    );

    if (!isConfirmed) return; // If the user cancels, do nothing

    console.log(blogTitle);
    try {
      setLoading(true);
      const response = await axios.delete(
        `${config.API_URL}/delete-blog/${blogTitle}`
      );
      fetchBlogs();
      console.log("Blog deleted successfully:", response.data);
    } catch (error) {
      console.error(
        "Error deleting blog:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  const editBlog = ({ blogTitle }) => {
    navigate(`/edit-blog/${blogTitle}`);
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
        <div className="grid lg:!grid-cols-3 md:!grid-cols-2 !grid-cols-1 ">
          {blogs.map((blog, index) => (
            <div key={index} className="card">
              <a
                target="_blank"
                title="Blogs"
                href={`https://uniacademicassistance.in/blog/${blog.seo_title}`}
              >
                <img
                  src={blog.blog.bannerImg}
                  alt={blog.bannerImg}
                  className="card-img"
                />
                <div className="card-header">
                  <h3 className="card-title">{blog.blog.title}</h3>
                </div>
                <div className="card-content">
                  <p className="card-description line-clamp">
                    {blog.blog.shortDec}
                  </p>
                  <p className="card-date">{blog.cr_date}</p>
                </div>
              </a>
              <div className="card-footer">
                <button
                  onClick={() => editBlog({ blogTitle: blog.seo_title })}
                  className="btn edit-btn"
                >
                  Edit
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => deleteBlog({ blogTitle: blog.seo_title })}
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

export default AllBlogs;
