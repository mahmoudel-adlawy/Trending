import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tvshow from './Components/Tvshow/Tvshow';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/NotFound/Notfound';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import ProtectedRow from './Components/Protected/ProtectedRow';
import MovieDetails from './Components/MovieDetails/MovieDetails';




function App() {
  
  useEffect(()=>{
    if(localStorage.getItem('usertoken') !==null){
      savecurntuser()
    }
  },[])


  const [userdata,setuserdata] = useState(null)
  
  function savecurntuser(){
    let token = localStorage.getItem('usertoken');
    let decoded = jwtDecode(token)
    setuserdata(decoded);
    console.log(userdata);


  }
  
let routers = createBrowserRouter([
  { path: "", element: <Layout userdata={userdata} setuserdata={setuserdata} /> , children: [
    {index:true , element: <ProtectedRow><Home/></ProtectedRow> },
    {path:"movies" , element:<ProtectedRow><Movies/></ProtectedRow> },
    {path:"tvshow" , element: <ProtectedRow><Tvshow/></ProtectedRow> },
    {path:"people" , element: <ProtectedRow><People/></ProtectedRow> },
    {path:"moviedetails/:id/:mediaType" , element: <ProtectedRow><MovieDetails></MovieDetails></ProtectedRow> },
    {path:"login" , element: <Login savecurntuser={savecurntuser}/>},
    {path:"register" , element: <Register/>},
    {path:"*" , element: <Notfound/>},
  ]}

])
  return <RouterProvider router={routers}></RouterProvider>
}

export default App;
