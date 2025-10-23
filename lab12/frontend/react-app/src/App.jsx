import { useState } from 'react'
import {BrowserRouter as Router,Route,Link, Routes} from 'react-router-dom'
import './App.css'
import Home from './Home';
import About from './About';
import Signup from './SignupSignIn';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <>
      <Router>
<nav className="navbar bg-body-tertiary">
      <Link to='/'>Home </Link>
      <Link to='/about'>About </Link>
      <Link to='/Signup'>Signup/signin </Link>
    </nav>
    <Routes>
      <Route path='/' element={<><Home></Home></>} />
      <Route path='/about' element={<><About></About></>} />
      <Route path='/Signup' element={<><Signup></Signup></>} />
    </Routes>
  </Router>
    </>
  )
}

export default App
