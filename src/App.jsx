import { Route, Routes } from "react-router-dom";
import "./index.css";
import AdminLayout from "./components/layout";
import { AdminDashboard } from "./pages";
import AddService from "./pages/addservice";
import AddSample from "./pages/addSample";
import AddBlog from "./pages/addBlog";
import Login from "./components/login";
import AllBlogs from "./pages/allblogs";
import AllServices from "./pages/allServices";
import { AllSamples } from "./pages/allSamples";
import AddCounter from "./pages/addcounters";
import HomeQueries from "./pages/homeQuery";
import ContactQueries from "./pages/contactQuery";
import AllUsers from "./pages/allUsers";
import EditSample from "./pages/edit-Sample";
import EditService from "./pages/edit-Service";
import EditBlog from "./pages/edit-Blog";
import CheckAuth from "./common/check-auth";
import NotFound from "./common/not-found";
import UnauthPage from "./common/unauth-page";
import AddAvCounter from "./AV_Pages/addCounters";
import AddAvService from "./AV_Pages/addServices";
import AddAvProduct from "./AV_Pages/addProducts";
import AddAvMembers from "./AV_Pages/addMembers";
import { AvDashboard } from "./AV_Pages";
import { AllAvMembers } from "./AV_Pages/allMembers";
import { AvAllServices } from "./AV_Pages/allServices";
import { AvAllProducts } from "./AV_Pages/allProducts";
import AvEditService from "./AV_Pages/edit-Service";
import AvEditProduct from "./AV_Pages/edit-Product";
import AvEditMember from "./AV_Pages/edit-Member";
import AvContactQueries from "./AV_Pages/AvContactQuery";

function App() {
  let isLoggedIn = sessionStorage.getItem("isLogin");
  console.log(isLoggedIn);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <CheckAuth isLoggedIn={isLoggedIn}>
            <Login />
          </CheckAuth>
        }
      />
      <Route
        path="/"
        element={
          <CheckAuth isLoggedIn={isLoggedIn}>
            <AdminLayout />
          </CheckAuth>
        }
      >
        <Route path="" element={<AdminDashboard />} />

        <Route path="addService" element={<AddService />} />
        <Route path="all-Services" element={<AllServices />} />

        <Route path="edit-service/:serviceTitle" element={<EditService />} />

        <Route path="addSample" element={<AddSample />} />
        <Route path="all-Samples" element={<AllSamples />} />
        <Route path="edit-sample/:seo_title" element={<EditSample />} />

        <Route path="addBlog" element={<AddBlog />} />
        <Route path="all-Blog" element={<AllBlogs />} />
        <Route path="edit-blog/:seo_title" element={<EditBlog />} />

        <Route path="Av-Dashboard" element={<AvDashboard />} />

        <Route path="Av-all-Members" element={<AllAvMembers />} />
        <Route path="Av-all-Products" element={<AvAllProducts />} />
        <Route path="Av-all-Services" element={<AvAllServices />} />

        <Route path="edit-AvService/:_id" element={<AvEditService />} />
        <Route path="edit-AvProduct/:_id" element={<AvEditProduct />} />
        <Route path="edit-AvMember/:_id" element={<AvEditMember />} />

        <Route path="Av-add-Product" element={<AddAvProduct />} />
        <Route path="Av-add-Service" element={<AddAvService />} />
        <Route path="Av-add-Members" element={<AddAvMembers />} />
        <Route path="Av-Counters" element={<AddAvCounter />} />
        <Route path="Av-Contact-Queries" element={<AvContactQueries />} />

        <Route path="counters" element={<AddCounter />} />
        <Route path="home-queries" element={<HomeQueries />} />
        <Route path="contact-queries" element={<ContactQueries />} />
        <Route path="all-Users" element={<AllUsers />} />
      </Route>
      <Route path="/unauth-page" element={<UnauthPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
