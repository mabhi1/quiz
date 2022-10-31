import "./App.css";
import FrontPage from "./components/FrontPage";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import Dashboard from "./components/Admin/Dashboard";
import Footer from "./components/Footer";
import EditQuiz from "./components/Admin/EditQuiz";

function App() {
    return (
        <Router>
            <div className="font-['Helvetica'] bg-slate-50 text-slate-900 min-h-screen flex flex-col justify-between">
                <span>
                    <header className="px-5 py-1 flex items-center justify-around shadow-md">
                        <Navbar />
                    </header>
                    <div className="p-5">
                        <Routes>
                            <Route path="/" element={<FrontPage />} />
                            <Route path="/signin" element={<Signin />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/edit/:id" element={<EditQuiz />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </span>
                <footer>
                    <Footer />
                </footer>
            </div>
        </Router>
    );
}

export default App;
