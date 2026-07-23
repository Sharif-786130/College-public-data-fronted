import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../APIs/ForgetPassword";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [showpassword,setShowpassword]=useState(false);
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
                <div className="relative mb-3">
                       <input
                    type={showpassword ? "text":"password"}
                    placeholder="Enter new Password"
                    className="w-full p-2 border"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="button"
                    className="absolute right-3 top-0.5 translate-y-1/2 flex items-center justify-center leading-none text-gray-500"
                    onClick={()=>setShowpassword(!showpassword)}>
                    {setShowpassword ?"🙈":"👁️"}
                </button>
                </div>
             
                <button type="submit"
                className="bg-white text-orange-600 font-semibold py-2 rounded hover:bg-gray-100 transition">Reset</button>
            </form>
        </div>

    )
}
export default ResetPassword;