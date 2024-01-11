import {
  RouterProvider,
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import React from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CookiesProvider, useCookies } from "react-cookie";

import "./App.css";

//constants
import PAGES from "./constants/pages";

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

//interfaces
import Cookie from "./models/interfaces/Cookie";
import FunctionalityElementContext from "./context/FunctionalityElementContext";

//context export
export const cookiesContext = React.createContext<Cookie>({"token" : "", "userId" : ""});

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'userId']);

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
          <Route index element={cookies.token ? <HomePageLogged userId={cookies.userId} token={cookies.token} removeCookie={removeCookie}/> : <HomePage />} />
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
              <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID as string}>
                <LoginPage setCookie={setCookie} /></GoogleOAuthProvider>} />
            <Route
              path={PAGES.REGISTER}
              element={
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID as string}>
                  <RegisterPage setCookie={setCookie} />
                </GoogleOAuthProvider>
              }
            />
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
        <cookiesContext.Provider value={cookies as Cookie}>
          <FunctionalityElementContext>
            <RouterProvider router={router} />
          </FunctionalityElementContext>
        </cookiesContext.Provider>
      </CookiesProvider>
    </div>
  );
}

export default App;
