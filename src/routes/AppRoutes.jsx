import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import CollegeList from "../pages/college/CollegeList";
import AddCollege from "../pages/college/AddCollege";

import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout/Layout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/colleges"
          element={
            <ProtectedRoute>
              <Layout>
                <CollegeList />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/colleges/add"
          element={
            <ProtectedRoute>
              <Layout>
                <AddCollege />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h2>404 Page Not Found</h2>} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;