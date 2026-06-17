import React from "react";
import "./Layout.css";

function Header() {
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

            </div>

        </header>
    );
}

export default Header;