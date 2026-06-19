import React from "react";
import "./Layout.css";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

function Header() {

    const navigate = useNavigate();

    const handleLogout = () => {

        // Remove JWT Token
        localStorage.removeItem("token");

        // Redirect to Login
        navigate("/", { replace: true });

    };

    return (
        <header className="header">

            <div className="header-left">
                <h4>College Management System</h4>
            </div>

            <div className="header-right">

                <span className="welcome-text">
                    Welcome Admin
                </span>

                <img
                    src="https://ui-avatars.com/api/?name=Admin"
                    alt="Admin"
                    className="profile-image"
                />

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

        </header>
    );
}

export default Header;