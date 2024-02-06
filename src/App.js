import {
  RouterProvider,
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CookiesProvider, useCookies } from "react-cookie";

import "./App.css";

//assets
import userIconImage from "./assets/user/user-circle.256x256.png";

//constants
import PAGES from "./constants/pages";
import COMPONENT_STATE from "./constants/myAccountComponentStates";

//components
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";

//pages
import HomePage from "./pages/Home/main/HomePage";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import AboutPage from "./pages/About/AboutPage";
import SearchPlantPage from "./pages/SearchPlant/SearchPlantPage";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";
import ContactPage from "./pages/Contact/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicy/PrivacyPolicyPage";
import TermsPage from "./pages/Terms/TermsPage";
import BlogPage from "./pages/Blog/BlogPage";
import Post from "./pages/Blog/Post";
import ForumPage from "./pages/Forum/ForumPage";
import PlantPage from "./pages/Plant/PlantPage";
import HomePageLogged from "./pages/Home/loggedUser/HomePageLogged";

//utils
import PrivateRoutes from "./utils/PrivateRoutes";
import UnauthorizedRoutes from "./utils/UnauthorizedRoutes";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

//context export
export const cookiesContext = React.createContext();
export const functionalityElementContext = React.createContext();
export const profileImageContext = React.createContext();

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'userId']);
  const [profileImage, setProfileImage] = useState(null);
  const [functionalityElement, setFunctionalityElement] = useState(
    COMPONENT_STATE.COCKPIT
  );
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    loadProfileImage();
  }, [setProfileImage, cookies])

  const loadProfileImage = async () => {
    try {
      const response = await fetch(`${BASE_URL}/image/${cookies.userId}`);
      if (response.ok) {
        const imageBlob = await response.blob();
        if (imageBlob.size > 0) {
          const imageUrl = URL.createObjectURL(imageBlob);
          setProfileImage(imageUrl);
          return;
        }
        await loadGoogleImage();
      }
    } catch (error) {
      console.error("Failed to load profile image", error);
    }
  }

  const loadGoogleImage = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/google-image/${cookies.userId}`);
      if (response.ok) {
        const data = await response.json();
        data.url !== null ? setProfileImage(data.url) : setProfileImage(userIconImage);
      } else if (response.status === 404) {
        setProfileImage(userIconImage);
      }
    } catch (error) {
      console.error("Failed to load google profile image", error);
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path={PAGES.HOME}
          element={
            <>
              <nav>
                <Navbar
                  cookies={cookies}
                  removeCookie={removeCookie} />
              </nav>
              <main className='flex-column'>
                <Outlet />
              </main>
              <footer>
                <Footer />
              </footer>
            </>
          }
        >
          <Route index element={cookies.token ? <HomePageLogged userId={cookies.userId} token={cookies.token} removeCookie={removeCookie} setCookie={setCookie} /> : <HomePage />} />
          <Route path={PAGES.ABOUT} element={<AboutPage />} />
          <Route path={PAGES.SEARCH} element={<SearchPlantPage />} />


          <Route path={PAGES.CONTACT} element={<ContactPage />} />
          <Route path={PAGES.PRIVACY_POLICY} element={<PrivacyPolicyPage />} />
          <Route path={PAGES.TERMS} element={<TermsPage />} />
          <Route path={PAGES.PLANT} element={<PlantPage token={cookies.token} userId={cookies.userId} />} />
          <Route path={PAGES.UNASSIGNED} element={<PageNotFound />} />
          <Route path={PAGES.BLOG} element={<BlogPage />} />
          <Route path={PAGES.POST} element={<Post />} />
          <Route element={<UnauthorizedRoutes token={cookies.token} />}>
            <Route path={PAGES.LOGIN} element={
              <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
                <LoginPage setCookie={setCookie} /></GoogleOAuthProvider>} />
            <Route
              path={PAGES.REGISTER}
              element={
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
                  <RegisterPage setCookie={setCookie} />
                </GoogleOAuthProvider>
              }
            />
            <Route path={PAGES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          </Route>
          <Route element={<PrivateRoutes token={cookies.token} />} >
            <Route path={PAGES.FORUM} element={<ForumPage />} />
          </Route>
        </Route>
      </>
    )
  );

  return (
    <div className="App">
      <CookiesProvider>
        <cookiesContext.Provider value={cookies}>
          <functionalityElementContext.Provider value={{ functionalityElement, setFunctionalityElement }}>
            <profileImageContext.Provider value={{ profileImage, setProfileImage }}>
              <RouterProvider router={router} />
            </profileImageContext.Provider>
          </functionalityElementContext.Provider>
        </cookiesContext.Provider>
      </CookiesProvider>
    </div>
  );
}

export default App;
