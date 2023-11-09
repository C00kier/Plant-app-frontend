import {
  RouterProvider,
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';

import './App.css';

//constants
import PAGES from './constants/pages';

//components
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer/Footer';

//pages
import HomePage from './pages/Home/main/HomePage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import AboutPage from './pages/About/AboutPage';
import SearchPlantPage from './pages/SearchPlant/SearchPlantPage';
import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';
import ContactPage from './pages/Contact/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicy/PrivacyPolicyPage';
import TermsPage from './pages/Terms/TermsPage';
import BlogPage from './pages/Blog/BlogPage';
import ForumPage from './pages/Forum/ForumPage';
import ProfilePage from './pages/Profile/ProfilePage';
import PlantPage from './pages/Plant/PlantPage';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path={PAGES.HOME}
          element={
            <>
              <nav>
                <Navbar />
              </nav>
              <main className='flex-column-center-center'>
                <Outlet/>
              </main>
              <footer>
                <Footer/>
              </footer>
            </>
          }>
            <Route index element = {<HomePage/>}/>
            <Route path={PAGES.ABOUT} element={<AboutPage/>}/>
            <Route path={PAGES.SEARCH} element={<SearchPlantPage/>}/>
            <Route path={PAGES.REGISTER} element={<RegisterPage/>}/>
            <Route path={PAGES.LOGIN} element={<LoginPage/>}/>
            <Route path={PAGES.BLOG} element={<BlogPage/>}/>
            <Route path={PAGES.CONTACT} element={<ContactPage/>}/>
            <Route path={PAGES.PRIVACY_POLICY} element={<PrivacyPolicyPage/>}/>
            <Route path={PAGES.TERMS} element={<TermsPage/>}/>
            <Route path={PAGES.FORUM} element={<ForumPage/>}/>
            <Route path={PAGES.PROFILE} element={<ProfilePage/>}/>
            <Route path={PAGES.PLANT} element={<PlantPage/>}/>

            <Route path={PAGES.UNASSIGNED} element={<PageNotFound/>} />
          </Route>
      </>
    )
  )

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
