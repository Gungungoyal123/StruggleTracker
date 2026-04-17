import { BrowserRouter,Routes,Route } from "react-router-dom";
import OtpPage from "./OtpPage.jsx";
import NewPasswordPage from "./NewPasswordPage.jsx";
import Login from "./Login.jsx";
import Reset from "./Reset.jsx";
import Signup from "./Signup.jsx";
import Dashboard from "./Dashboard.jsx"

function App() {
  return (
   <BrowserRouter>
     <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/reset" element={<Reset></Reset>}></Route>
        <Route path="/otppage" element={<OtpPage/>} />
        <Route path="/newpassword" element={<NewPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
     </Routes>
   </BrowserRouter>
    
  );
}

export default App;