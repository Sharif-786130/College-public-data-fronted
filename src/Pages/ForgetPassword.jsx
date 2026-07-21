import { useState } from "react";
import { forgetPassword } from "../APIs/ForgetPassword";
import { Navigate, useNavigate } from "react-router-dom";

function ForgetPassword() {
    const [email, setEmail] = useState("");
    // const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgetPassword(email);
            alert("Reset link sent to your email.please check Gmail");
            // setTimeout(() => {
            //     navigate('/reset-password')
            // }, 2000);
        } catch (err) {
            console.error(err)
            alert("Failed to send Reset link");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
             <form
              onSubmit={handleSubmit}
               className="w-80 bg-orange-500 p-6 text-white rounded-lg shadow-lg flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-center">Foget Password</h2> 
            <input
                type='email'
                placeholder="Enter Your Email"
                className="border-white p-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />

            <button type='submit'
            className="bg-white text-orange-600 font-semibold py-2 rounded hover:bg-gray-100 transition">Send Reset Link</button>
        </form>
        </div>
       
    )
}
export default ForgetPassword;