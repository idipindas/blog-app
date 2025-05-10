import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<any>();
  const [password, setPassword] = useState<any>();

  const handleSubmit = async () => {
    console.log("caal");
    try {
      const resp: any = await api.post("/auth/login", {
        username,
        password,
      });
      console.log(resp);

      if (resp.status === 201) {
        localStorage.setItem("token", resp?.data?.token);
        navigate("/blog");
      }
    } catch (Error: any) {
      console.error(Error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="" style={{ display: "grid" }}>
        <h2>login</h2>
        <input
          style={{ marginBottom: 2 }}
          width={"300"}
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e?.target?.value);
          }}
        />
        <input
          type="text"
          style={{ marginBottom: 2 }}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e?.target?.value);
          }}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Login;
