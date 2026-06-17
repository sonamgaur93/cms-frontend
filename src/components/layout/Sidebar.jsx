import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

import {
    FaHome,
    FaUniversity,
    FaBook,
    FaClipboardList,
    FaUserGraduate
} from "react-icons/fa";

import "./Layout.css";

function Sidebar() {

    return (

        <div className="sidebar">

           <div className="sidebar-logo">

            <img src={logo} alt="College Management System" />

            <h5>College Management System</h5>

       </div>

            <ul>

                <li>
                    <Link to="/dashboard">
                        <FaHome /> Dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/colleges">
                        <FaUniversity /> Colleges
                    </Link>
                </li>

                <li>
                    <Link to="/courses">
                        <FaBook /> Courses
                    </Link>
                </li>

                <li>
                    <Link to="/college-courses">
                        <FaClipboardList /> College Courses
                    </Link>
                </li>

                <li>
                    <Link to="/enquiries">
                        <FaUserGraduate /> Enquiries
                    </Link>
                </li>

            </ul>

        </div>

    );

}

export default Sidebar;