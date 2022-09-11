import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { GroupFormProvider } from "./components/GroupForm/GroupFormContext";
import GroupFormIntro from "./components/GroupForm/GroupFormIntro";
import GroupShow from "./components/GroupPages/GroupShow";
import HomeFeed from "./components/HomeFeed/homefeed";
import LoggedOutHome from "./components/HomeFeed/loggedouthome";
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
      <Route path="/" element={<LoggedOutHome />} />
      <Route path="/home" element={<HomeFeed />} />
    <Route path="/login" element={<LogInForm />} />
    <Route path="/signup" element={<SignUpForm />} />
    <Route path="/groups/:groupId" element={<GroupShow />} />
    <Route path="/groups/new" element={<GroupFormProvider>
                                      <GroupFormIntro />
                                      </GroupFormProvider>} />
    <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
}

export default App;
