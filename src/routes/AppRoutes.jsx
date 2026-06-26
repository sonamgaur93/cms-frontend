import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import CollegeList from "../pages/college/CollegeList";
import AddCollege from "../pages/college/AddCollege";
import CollegeDetail from "../pages/college/CollegeDetails";
import EditCollege from "../pages/college/EditCollege";


import CourseList from "../pages/course/CourseList";
import AddCourse from "../pages/course/AddCourse";
import CourseDetail from "../pages/course/CourseDetail";
import EditCourse from "../pages/course/EditCourse";

import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout/Layout";
import CollegeCourseList from "../pages/collegeCourse/collegeCourseList";
import CollegeCourseDetail from "../pages/collegeCourse/collegeCourseDetail";
import AddCollegeCourse from "../pages/collegeCourse/AddCollegeCourse";
import EditCollegeCourse from "../pages/collegeCourse/EditCollegeCourse";

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

        <Route
          path="/colleges/edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <EditCollege />
              </Layout>
            </ProtectedRoute>
          }
        />



        <Route
          path="/colleges/view/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <CollegeDetail />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Layout>
                <CourseList />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses/add"
          element={
            <ProtectedRoute>
              <Layout>
                <AddCourse />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses/view/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <CourseDetail />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses/edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <EditCourse />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/college-courses"
          element={
            <ProtectedRoute>
              <Layout>
                <CollegeCourseList />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/college-courses/add"
          element={
            <ProtectedRoute>
              <Layout>
                <AddCollegeCourse />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/college-courses/edit/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <EditCollegeCourse />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/college-courses/view/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <CollegeCourseDetail />
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