import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaUser,
  FaCog,
  FaBars,
  FaServicestack,
  FaCreativeCommonsSampling,
  FaUsers,
  FaPhone,
  FaBook,
  FaDashcube,
  FaSortNumericDown,
  FaBlog,
  FaProductHunt,
  FaMagento,
  FaClipboardList,
} from "react-icons/fa";

const Sidebar = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 700) {
        setIsOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // // Check screen width and update isOpen state

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"} `}>
      <div className="sidebarHeader">
        <div className="toggle-btn" onClick={handleToggle}>
          <FaBars />
        </div>
        <h2 className="logo"></h2>
      </div>

      <ul className="menu !scrollbar-hide">
        <div className="Uaa">
          <label className="Uaa">UAA </label>
        </div>
        <a href="/" title="Home">
          <li>
            {" "}
            <FaDashcube className="icon" />
            {isOpen && <span>Dashboard</span>}
          </li>
        </a>
        <a href="/addService" title="Add Service">
          <li>
            {" "}
            <FaServicestack className="icon" />
            {isOpen && <span>Add Service</span>}
          </li>
        </a>

        <a href="/addBlog" title="Add Blog">
          <li>
            <FaBlog className="icon" />
            {isOpen && <span>Add Blog</span>}
          </li>
        </a>

        <a href="/addSample" title="Add Sample">
          <li>
            <FaCreativeCommonsSampling className="icon" />
            {isOpen && <span>Add Sample</span>}
          </li>
        </a>
        <a href="/Sample-Category" title="Sample Category">
          <li>
            <FaClipboardList className="icon" />
            {isOpen && <span>Sample Category</span>}
          </li>
        </a>

        <a href="/counters" title="Add Counters">
          <li>
            <FaSortNumericDown className="icon" />
            {isOpen && <span>Add Counters</span>}
          </li>
        </a>
        <a href="/home-queries" title="Home Queries">
          <li>
            <FaBook className="icon" />
            {isOpen && <span>Home Queries</span>}
          </li>
        </a>
        <a href="/contact-queries" title="Contact Queries">
          <li>
            <FaPhone className="icon" />
            {isOpen && <span>Contact Queries</span>}
          </li>
        </a>
        <a href="/all-Users" title="All Users">
          <li>
            <FaUsers className="icon" />
            {isOpen && <span>All Users</span>}
          </li>
        </a>

        <div className="AvLable">
          <label>AV </label>
        </div>
        <a href="/Av-Dashboard" title="AV Dashboard">
          <li>
            <FaDashcube className="icon" />
            {isOpen && <span>AV Dashboard</span>}
          </li>
        </a>
        <a href="/Av-Counters" title="AV Counters">
          <li>
            <FaSortNumericDown className="icon" />
            {isOpen && <span>AV Counters</span>}
          </li>
        </a>
        <a href="/Av-add-Product" title="AV Add Product">
          <li>
            <FaProductHunt className="icon" />
            {isOpen && <span>AV Add Product</span>}
          </li>
        </a>
        <a href="/Av-add-Service" title="AV Add Service">
          <li>
            <FaServicestack className="icon" />
            {isOpen && <span>AV Add Service</span>}
          </li>
        </a>
        <a href="/Av-add-Members" title="AV Add Members">
          <li>
            <FaMagento className="icon" />
            {isOpen && <span>AV Add Members</span>}
          </li>
        </a>
        <a href="/Av-Contact-Queries" title="AV Contact Queries">
          <li>
            <FaPhone className="icon" />
            {isOpen && <span>AV Contact Queries</span>}
          </li>
        </a>
      </ul>
    </div>
  );
};

export default Sidebar;
