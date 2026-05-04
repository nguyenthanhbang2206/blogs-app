import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [creds, setCreds] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://qj2vdr-8080.csb.app/api/auth/register",
        creds
      );

      if (response.status === 200) {
        alert("Register success!");
        navigate("/login");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setError(error.response.data.message);
      } else {
        setError("Register failed!");
      }
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <h2>Register</h2>

      <input
        placeholder="Username"
        onChange={(e) => setCreds({ ...creds, username: e.target.value })}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setCreds({ ...creds, password: e.target.value })}
      />
      <br />
      <br />

      <button onClick={handleRegister}>Register</button>

      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
}

export default Register;
