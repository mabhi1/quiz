import "./App.css";
import FrontPage from "./components/FrontPage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";

function App() {
    return (
        <Router>
            <div className="font-['Helvetica'] bg-slate-50 text-slate-900 min-h-screen">
                <header className="px-5 py-1 flex items-center justify-around shadow-md">
                    <Navbar />
                </header>
                <div className="p-5">
                    <Routes>
                        <Route path="/" element={<FrontPage />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
