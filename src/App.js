    // import 'bootstrap/dist/css/bootstrap.min.css';
    // import Login from './Components/Login/Login';
    // import Home from './Components/Home/Home';
    // function App() {
    //   return (
    //     <div>
    //       {/* <Login /> */}
    //       <Home />
    //     </div>
    //   );
    // }

    // export default App;


    // App.js
    import React from 'react';
    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import { useState } from 'react';
    import Login from './Components/Login/Login';
    import Home from './Components/Home/Home';
    function App  () {
      const [user, setUser] = useState(null);

    const handleLogin = (data) => {
      if (data.success && data.user) {
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
              </Routes>
          </Router>
      );
    };

    export default App;
