import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import EventHome from "./components/EventPages/EventHome";
import EventNewForm from "./components/EventPages/EventNewForm";
import { GroupFormProvider } from "./components/GroupForm/GroupFormContext";
import GroupFormIntro from "./components/GroupForm/GroupFormIntro";
import GroupEditPage from "./components/GroupPages/GroupEditPage";
import GroupShow from "./components/GroupPages/GroupShow";
import HomeFeed from "./components/HomeFeed/HomeFeed";
import LoggedOutHome from "./components/HomeFeed/loggedouthome";
import LogInForm from "./components/LogInForm/LoginForm";
import NavMenu from "./components/NavMenu/NavMenu";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import SearchResults from "./components/Search/SearchResults";
import SignUpForm from "./components/SignUpForm/SignupForm";
import { fetchKeywords } from "./store/keywords";
import { getCurrentUser } from "./store/session";

function App() {

  const dispatch = useDispatch();

  const sessionUser = useSelector(getCurrentUser);


  useEffect(() => {
    dispatch(fetchKeywords());
  }, []);

  return (
    <>
    <NavMenu />
    
    {/* <Route path="/login" element={<LogInForm />} /> */}
    <Routes>
      <Route path="/" element={<LoggedOutHome />} />
      <Route path="/home" element={
                                    <ProtectedRoute user={sessionUser}>
                                      <HomeFeed />
                                    </ProtectedRoute>
                                              } />
      <Route path="/login" element={<LogInForm />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/searchresults" element={<SearchResults />} />
      <Route path="/groups/:groupId" element={<GroupShow />} />
      <Route path="/groups/:groupId/edit" element={
                                                  <ProtectedRoute user={sessionUser}>
                                                    <GroupEditPage />
                                                  </ProtectedRoute>
                                                    } />
      <Route path="/groups/new" element={
                                      <ProtectedRoute user={sessionUser}>
                                        <GroupFormProvider>
                                        <GroupFormIntro />
                                        </GroupFormProvider>
                                      </ProtectedRoute>
                                        } />
      <Route path="/groups/:groupId/events/new" element={
                                                      <ProtectedRoute user={sessionUser}>
                                                        <EventNewForm />
                                                      </ProtectedRoute>
                                                        } />
      <Route path="/events/:eventId/*" element={<EventHome />} />
      {/* Tried making a nested Routes but it wasn't matching correctly, trying to grab a groupId */}
      {/* <Route path="/events/:eventId/edit" element={<EventNewForm />} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </>
  );
}

export default App;
