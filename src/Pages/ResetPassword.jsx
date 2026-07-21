import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../APIs/ForgetPassword";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(token, password);
            alert("password updated");
            setTimeout(()=>{
                navigate('/login')
            },2000);
        } catch (err) {
            console.error(err);
            alert('Reset failed')
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <form 
            onSubmit={handleSubmit}
            className="w-80 bg-orange-500 p-6 text-white rounded-lg shadow-lg flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-center">Reset Password</h2>
                <input
                    type='password'
                    placeholder="Enter new Password"
                    className="border-white p-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                  {/* <input
                    type='password'
                    placeholder="Re-Enter new Password"
                    className="border-white p-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /> */}
                <button type="submit"
                className="bg-white text-orange-600 font-semibold py-2 rounded hover:bg-gray-100 transition">Reset</button>
            </form>
        </div>

    )
}
export default ResetPassword;