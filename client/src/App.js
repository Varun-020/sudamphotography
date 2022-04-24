import "./main.scss";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; import Store from './store';
import BookingBar from "./components/BookingBar";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import Booking from "./components/Booking";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./private/PrivateRoute";
import RouteLinks from "./private/RouteLinks";
import Contact from "./components/Contact";
import Gallery from "./components/Gallery";
import SetOffer from "./components/SetOffer";
import AdminGallery from "./components/AdminGallery";
import ContactList from "./components/ContactList";
import BookingList from "./components/BookingList";

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Navbar />

        <Routes>
          <Route path='/' exact element={
            <RouteLinks>
              <Home />
            </RouteLinks>} />

          <Route path='/login' exact element={
            <RouteLinks>
              <Login />
            </RouteLinks>
          } />

          <Route path='/signup' exact element={
            <RouteLinks>
              <Register />
            </RouteLinks>
          } />

          <Route path='/booking' exact element={
            <RouteLinks>
              <Booking />
            </RouteLinks>
          } />

          <Route path='/contactus' exact element={
            <RouteLinks>
              <Contact />
            </RouteLinks>
          } />

          <Route path='/gallery' exact element={
            <RouteLinks>
              <Gallery />
            </RouteLinks>
          } />

          <Route path='/dashboard' exact element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />

          <Route path='/setOffer' exact element={
            <PrivateRoute>
              <SetOffer />
            </PrivateRoute>
          } />

          <Route path='/admingallery' exact element={
            <PrivateRoute>
              <AdminGallery />
            </PrivateRoute>
          } />

          <Route path='/contactlist' exact element={
            <PrivateRoute>
              <ContactList />
            </PrivateRoute>
          } />

          <Route path='/bookinglist' exact element={
            <PrivateRoute>
              <BookingList />
            </PrivateRoute>
          } />

          <Route path='*' element={
            <RouteLinks>
              <NotFound />
            </RouteLinks>
          } />
        </Routes>
        <BookingBar />
      </Router>
    </Provider>
  );
}

export default App;
