import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/signup/Signup";
import Login from "./Pages/login/Login";
import Forgot from "./Pages/Forgot/Forgot";
import { Toaster } from "react-hot-toast";
import Activate from "./activate/Activate";
import Validateresetpass from "./activate/Validateresetpass";
import Reset from "./Pages/reset/Reset";
import Urlshortner from "./Component/urlshortner/Urlshortner";

function App() {
  return <>
    <div className="main_wrapper">
      <Toaster/>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset/:token/:id" element={<Reset/>} />
        <Route path="/user/activate/:token" element={<Activate />} />
        <Route path="/urlshortner" element={<Urlshortner />} />
        <Route path="/getresetpassword/:token/:id" element={<Validateresetpass/>} />
      </Routes>
      
    </div>
</>
}

export default App;
