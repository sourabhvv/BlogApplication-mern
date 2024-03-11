import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import AuthorProfilePage from "./pages/AuthorProfilepage";
import Profile from './pages/Profile';
import Articles from './pages/Articles';
import Dashboard from './pages/Dashboard';
function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const userRoute = () => (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path='/articles' component={Articles} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/Profile/:id" component={AuthorProfilePage} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        
        </Switch>
      </div>
    </Router>
  );

  const authRoute = () => (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path='/articles' component={Articles} />
         
          <Route path="/Profile/:id" component={AuthorProfilePage} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        
        </Switch>
      </div>
    </Router>
  );

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  return token ? userRoute() : authRoute();
}

export default App;
