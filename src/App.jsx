import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { AuthProvider } from "./Auth/AuthContext";
import PrivateRoute from "./Componenets/PrivateRoute";
import Home from "./Pages/Home";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* FIX for "/" */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path='/foget-password' element={<ForgetPassword/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


