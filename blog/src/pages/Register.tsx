import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const nav = useNavigate();
  const [username, setUsername] = useState<any>();
  const [password, setPassword] = useState<any>();

  const handleSubmit = async () => {
    try {
      const resp: any = await axios.post("localhost:5000/api/auth/register", {
        username,
        password,
      });
      if (resp.status === 200) {
        nav("/");
      }
    } catch (Error: any) {
      console.error(Error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => {
          setUsername(e?.target?.value);
        }}
      />
      <input
        type="text"
        placeholder="Password"
        onChange={(e) => {
          setPassword(e?.target?.value);
        }}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Register;
