import { useState } from "react";

import { useNavigate } from "react-router-dom";
import Api from "../APIs/Axios";


export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });

  const [showpassword,setShowpassword]=useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.post("/auth/signup", form);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80"
      >
        <h2 className="text-xl font-bold mb-4">Signup</h2>

        <input
          name="fullName"
          placeholder="Full Name"
          className="w-full p-2 mb-3 border"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border"
          onChange={handleChange}
        />

        <div className="relative mb-3">
           <input
          name="password"
          type={setShowpassword ? "text":"password"}
          placeholder="Password"
          className="w-full p-2 mb-3 border"
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={()=>setShowpassword(!showpassword)}
          className="absolute right-3 top-0.5 translate-y-1/2 flex items-center justify-center leading-none text-gray-500">
          {showpassword?"🙈":"👁️"}
        </button>
        </div>
       

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
