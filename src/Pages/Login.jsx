import { useState } from "react";

import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

import Api from "../APIs/Axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.post("/auth/login", {
        email,
        password,
      });

      login(res.data.token);
      navigate("/home");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          placeholder="Email"
          className="w-full p-2 mb-3 border"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative mb-3">
          <input
            type={showpassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 border"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={()=>setShowpassword(!showpassword)}
            className="absolute right-3 top-0.5 translate-y-1/2 flex items-center justify-center leading-none text-gray-500">
            {showpassword ? "🙈":"👁️"}
          </button>
        </div>


        <p onClick={() => navigate('/foget-password')}
          className="text-sm text-blue-600 cursor-pointer text-right mb-4">
          Foget Password ?
        </p>

        <div className="flex gap-2">
          <button
            type='submit'
            className="w-1/2 bg-green-600 text-white p-2 rounded">
            Login
          </button>

          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="w-1/2 bg-green-600 text-white p-2 rounded">
            SignUp
          </button>
        </div>

      </form>
    </div>
  );
}
