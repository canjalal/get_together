import { Route, Routes, useLocation } from "react-router-dom";
import LogInForm from "./components/LogInForm/loginform";
import NavMenu from "./components/NavMenu/navmenu";
import NotFoundPage from "./components/NotFoundPage/notfoundpage";
import SignUpForm from "./components/SignUpForm/signupform";

function App() {

  return (
    <>
    <NavMenu />
    <h1>Hello world!</h1>
    
    {/* <Route path="/login" element={<LogInForm />} /> */}
    <Routes>
      <Route path="/" element={<p>Yes it is all</p>} />
    <Route path="/login" element={<LogInForm />} />
    <Route path="/signup" element={<SignUpForm />} />
    <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
}

export default App;
