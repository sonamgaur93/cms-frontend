import "./Login.css";
import logo from "../../assets/images/logo.png";

import { FaEnvelope, FaLock } from "react-icons/fa";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/authService";
import { useEffect } from "react";


function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const token = await login(username, password);

            localStorage.setItem("token", token);

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert("Invalid Username or Password");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <div className="logo-section">

                    <img src={logo} alt="College Management System" />

                    <h2>CMS</h2>

                    <p>College Management System</p>

                </div>

                <div className="login-body">

                    <h5 className="text-center mb-4">

                        Sign in to start your session

                    </h5>

                    <form onSubmit={handleLogin}>

                        <div className="input-group mb-3">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />

                            <span className="input-group-text">

                                <FaEnvelope />

                            </span>

                        </div>

                        <div className="input-group mb-3">

                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <span className="input-group-text">

                                <FaLock />

                            </span>

                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <div className="form-check">

                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="remember"
                                />

                                <label
                                    htmlFor="remember"
                                    className="form-check-label"
                                >
                                    Remember Me
                                </label>

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-100 login-btn"
                            disabled={loading}
                        >

                            {loading ? "Signing In..." : "Sign In"}

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default Login;