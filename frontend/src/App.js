import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { GroupFormProvider } from "./components/GroupForm/GroupFormContext";
import GroupFormIntro from "./components/GroupForm/GroupFormIntro";
import LogInForm from "./components/LogInForm/loginform";
import NavMenu from "./components/NavMenu/navmenu";
import NotFoundPage from "./components/NotFoundPage/notfoundpage";
import SignUpForm from "./components/SignUpForm/signupform";
import { fetchKeywords } from "./store/keywords";

function App() {

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchKeywords());
  }, []);

  return (
    <>
    <NavMenu />
    
    {/* <Route path="/login" element={<LogInForm />} /> */}
    <Routes>
      <Route path="/" element={<p>Yes it is all</p>} />
      <Route path="/home" element={<h1>Welcome home!</h1>} />
    <Route path="/login" element={<LogInForm />} />
    <Route path="/signup" element={<SignUpForm />} />
    <Route path="/groups/new" element={<GroupFormProvider>
                                      <GroupFormIntro />
                                      </GroupFormProvider>} />
    <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
}

export default App;
