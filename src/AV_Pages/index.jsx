import React from "react";
import AdminSection from "../components/adminSection";
import config from "../config";

export const AvDashboard = () => {
  return (
    <div>
      <div className="dashboard-sections">
        <AdminSection
          title="Members"
          endpoint={`${config.API_URL}/AvMembersList`}
          path={"/Av-all-Members"}
        />
        <AdminSection
          title="Products"
          endpoint={`${config.API_URL}/AvProductList`}
          path={"/Av-all-Products"}
        />
        <AdminSection
          title="Services"
          endpoint={`${config.API_URL}/AvServiceList`}
          path={"/Av-all-Services"}
        />
      </div>
    </div>
  );
};
