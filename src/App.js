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

//pages
import HomePage from './pages/HomePage/HomePage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import About from './pages/About/About';

//components
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer/Footer';


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
              <main>
                <Outlet/>
              </main>
              <footer>
                <Footer/>
              </footer>
            </>
          }>
            <Route index element = {<HomePage/>}/>
            <Route path={PAGES.ABOUT} element={<About/>}/>

            <Route path="*" element={<PageNotFound/>} />
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
