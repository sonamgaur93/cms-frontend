import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const login = async (username, password) => {

    const response = await axios.post(
        `${BASE_URL}/auth/login`,
        {
            username,
            password
        },
        {
            headers: {
                "Content-Type": "application/json"
            },
            responseType: "text"
        }
    );

    return response.data;
};