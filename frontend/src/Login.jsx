import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "./AppContext";

function Login() {
  const { login } = useContext(AppContext);
  const [creds, setCreds] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        creds,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        login(response.data.user || { username: creds.username });
        navigate("/stats");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response && error.response.status === 401) {
        setError("Invalid username or password!");
      } else {
        setError("Login failed!");
      }
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <br />

      <span>Username:</span>
      <br />
      <input
        type="text"
        onChange={(e) => setCreds({ ...creds, username: e.target.value })}
      />
      <br />

      <span>Password:</span>
      <br />
      <input
        type="password"
        onChange={(e) => setCreds({ ...creds, password: e.target.value })}
      />
      <br />
      <br />

      <button onClick={handleLogin}>Login</button>

      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
}

export default Login;
