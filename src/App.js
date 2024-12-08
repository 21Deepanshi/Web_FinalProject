import React, {useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/home/Home';
import About from './Pages/about/About';
import SignIn from './Pages/signIn/SignIn';
import ManageBooks from './Pages/manageBooks/ManageBooks';
import BookDetails from './Components/BookDetail';
import Header from './Components/Header'; 
import Footer from './Components/Footer';

const PrivateRoute = ({ element, isLoggedIn }) => {
  return isLoggedIn ? element : <SignIn />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <div>
      <Router> 
        <Header isLoggedIn={isLoggedIn} isAdmin={true} onLogout={handleLogout} />       
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookDetails />} ></Route>
          <Route path="/about" element={<About />} />
          <Route path="/signIn" element={<SignIn onLoginSuccess={handleLoginSuccess} />} />
          {/* <Route path="/books" element={<Books />} /> */}
          <Route
            path="/manageBooks"
            element={<PrivateRoute element={<ManageBooks />} isLoggedIn={isLoggedIn} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;