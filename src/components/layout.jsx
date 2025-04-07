import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 700) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="layout">
      <div className="!z-50">
        <Header isSidebarOpen={isSidebarOpen} />
      </div>
      <div className="!z-40">
        <Sidebar onToggle={setIsSidebarOpen} />
      </div>
      <div
        className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}
      >
        <div className="content-are mt-14">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
