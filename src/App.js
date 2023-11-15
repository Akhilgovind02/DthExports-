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
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
function App  () {
  return (
    <Router>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        </Routes>
    </Router>
  );
};

export default App;
