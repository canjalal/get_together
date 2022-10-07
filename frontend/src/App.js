import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import EventHome from "./components/EventPages/EventHome";
import EventNewForm from "./components/EventPages/EventNewForm";
import { GroupFormProvider } from "./components/GroupForm/GroupFormContext";
import GroupFormIntro from "./components/GroupForm/GroupFormIntro";
import GroupEditPage from "./components/GroupPages/GroupEditPage";
import GroupShow from "./components/GroupPages/GroupShow";
import HomeFeed from "./components/HomeFeed/homefeed";
import LoggedOutHome from "./components/HomeFeed/loggedouthome";
import LogInForm from "./components/LogInForm/loginform";
import NavMenu from "./components/NavMenu/navmenu";
import NotFoundPage from "./components/NotFoundPage/notfoundpage";
import SearchResults from "./components/Search/searchresults";
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
    <Route path="/searchresults" element={<SearchResults />} />
    <Route path="/groups/:groupId" element={<GroupShow />} />
    <Route path="/groups/:groupId/edit" element={<GroupEditPage />} />
    <Route path="/groups/new" element={<GroupFormProvider>
                                      <GroupFormIntro />
                                      </GroupFormProvider>} />
    <Route path="/groups/:groupId/events/new" element={<EventNewForm />} />
    <Route path="/events/:eventId/*" element={<EventHome />} />
    {/* Tried making a nested Routes but it wasn't matching correctly, trying to grab a groupId */}
    {/* <Route path="/events/:eventId/edit" element={<EventNewForm />} /> */}
    <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
}

export default App;
