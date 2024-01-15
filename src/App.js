
    import React from 'react';
    import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import { useState } from 'react';
    import { BrowserRouter } from 'react-router-dom';
    import Login from './Components/Login/Login';
    import Home from './Components/Home';
    import Content from './Components/Home/Elements/Content/Dashboard';
    // import Home from './Components/Pages/Home/Home';
    // import Sidebar from './Components/Sidebar/Sidebar';
    // import IncomingCheck from './Components/Pages/Incoming/IncomingCheck';
import IncomingForm from './Components/Forms/IncomingForm';
import Dashboard from './Components/Home/Elements/Content/Dashboard';
import Acceptform from './Components/Forms/Acceptform';
import Root from './Components/Root/Root'
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

    const router = createBrowserRouter([
      {
        path:'/login',
        element:<Login  onLogin={handleLogin} ></Login>
      },
      {
        path:'/',
        element:<Root/> ,
        children:[
          {
            path:'/dashboard',
            element:<Dashboard/>,
            children:[{
              path:'/dashboard/incomingForm',
              element:<IncomingForm />,
            },
            {
            path:'/dashboard/accept',
            element:<Acceptform />
            }
          ],

            // children:[{
            //   path:'/dashboard/accept',
            //   element:<Acceptform />
            // }]
          }
        ]
      }
    ]);
 
        return (
          <div>
          <RouterProvider router={router}></RouterProvider>

          </div>

          // <BrowserRouter>
          //     <Routes> 
          //       <Route path='/' element={<Dashboard />}></Route>
          //     <Route path="/login" element={<Login onLogin={handleLogin} />} />
          //     <Route path='/home' element ={<Home user = {user} />}>
              
              
          //     {/* <Route path="/home" element={<IncomingForm />}/>  */}
          // </Route>
          //     <Route path='incomingForm' element={<IncomingForm />}></Route>
          //     </Routes>
          // </BrowserRouter>
      )
    };

    export default App;
