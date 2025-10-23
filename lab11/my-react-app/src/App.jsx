import { useState } from 'react';
import './App.css';
import ContextTheme from '../component/ContextTheme';
import ChildComponent from '../component/ChildComponent';
import {BrowserRouter as Router,Route,Link, Routes} from 'react-router-dom'
import Home from './Home';
import About from './About';
import Contact from './Contact';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return<>
  <Router>
<nav className="navbar bg-body-tertiary">
      <Link to='/'>Home </Link>
      <Link to='/about'>About </Link>
      <Link to='/contact'>Contact </Link>
    </nav>
    <Routes>
      <Route path='/' element={<><Home></Home></>} />
      <Route path='/about' element={<><About></About></>} />
      <Route path='/contact' element={<><Contact></Contact></>} />
    </Routes>
  </Router>
  
  
  
  </>
  
}

export default App;





// const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });

//   const [theme, setTheme] = useState('light');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     console.log(formData);
//     setTheme(theme === 'dark' ? 'light' : 'dark');
    
//   };

//   return (
//     <>
//       <ContextTheme.Provider value={{ theme, setTheme }}>
//         <ChildComponent />
//       </ContextTheme.Provider>
//       <label htmlFor="username">Username</label><br />
//       <input type="text" name="username" className="Username" onChange={handleChange} placeholder="Enter the text"/><br />
//       <label htmlFor="password">Password</label><br />
//       <input type="password" name="password" className="password" onChange={handleChange} placeholder="Enter the password"/><br />
//       <input type="submit" className="btn btn-primary" onClick={handleSubmit} value="Submit"/>
//     </>
//   );