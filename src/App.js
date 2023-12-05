
    import React from 'react';
    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import { useState } from 'react';
    import Login from './Components/Pages/Login/Login';
    import Home from './Components/Pages/Home/Home';
    import IncomingCheck from './Components/Pages/Incoming/IncomingCheck';
    function App  () {
      const [user, setUser] = useState(null);

    const handleLogin = (data) => {
      if (data.status && data.user) {
        setUser(data.user);
        console.log(data.user)
      }
      else{
        setUser(null);
        alert("invalid credentials");
      }
    };
        return (
          <Router>
              <Routes>  
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/home" element={<Home user={user} />} />
              <Route path='/incomingcheck' element = {<IncomingCheck />} />
              </Routes>
          </Router>
      );
    };

    export default App;
