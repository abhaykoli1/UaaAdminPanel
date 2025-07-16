import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Header = ({ isSidebarOpen }) => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/addService":
        return "Add UAA Service";
      case "/addSample":
        return "Add UAA Sample";
      case "/Sample-Category":
        return "Sample Category";
      case "/addBlog":
        return "Add UAA Blog";
      case "/all-Samples":
        return "Add UAA Samples";
      case "/all-Service":
        return "All UAA Services";
      case "/all-Blog":
        return "All UAA Blogs";
      case "/counters":
        return "UAA Counters";
      case "/home-queries":
        return "UAA Home Queries";
      case "/contact-queries":
        return "UAA Contact Queries";
      case "/all-Users":
        return "UAA All Users";

      case "/Av-Counters":
        return "Av Counters";
      case "/Av-add-Product":
        return "Add AV Products";
      case "/Av-add-Service":
        return "Add AV Service";
      case "/Av-add-Members":
        return "Add AV Members";

      case "/Av-Dashboard":
        return "AV Dashboard";
      case "/Av-all-Members":
        return "AV Members";
      case "/Av-all-Products":
        return "AV Products";
      case "/Av-all-Services":
        return "AV Services";
      case "/Av-Contact-Queries":
        return "AV Contact Queries";
      default:
        return "UAA Dashboard";
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("isLogin"); // Clear login session
    window.location.reload();
    // navigate("/login", { replace: true }); // Redirect to login
  };

  return (
    <header
      style={{ zIndex: "1" }}
      className={` header  ${!isSidebarOpen ? "shifted" : ""}`}
    >
      <h2 className="font-bold text-xl mt-4">{getTitle()}</h2>
      <div className="user-profile">
        {/* <FaUserCircle className="user-icon" />
        <span>Admin</span> */}
        <button onClick={handleLogout} className="logout">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
