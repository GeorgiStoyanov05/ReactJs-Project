import {Routes, Route} from 'react-router-dom'
import Index from './components/Index/Index';
import About from './components/About/About'
import Songs from './components/Songs/Songs';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Create from './components/Create/Create';
import Details from './components/Details/Details'
import Edit from './components/Edit/Edit';
import Logout from './components/Logout/Logout';
import { AuthContext } from './contexts/AuthContext';
import { CreateContext } from './contexts/CreateContext';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function App() {

  const [showCreate, setShowCreate] = useState(true);
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();


  function CloseCreate(){
    setShowCreate(state=>!state);
  }

  function onLoginSubmit(e){
    e.preventDefault();
    const baseUrl = 'http://localhost:3030/users/login';
    let values = new FormData(e.target);
    let { email, password } = Object.fromEntries(values);
        fetch(baseUrl, {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })
      .then(res=>res.json())
      .then(data=>{
        if (data.code===403){
          alert(data.message);
        } else{
          setAuth(data);
          navigate('/');
        }
      })
  }

  async function onRegisterSubmit(e){
    e.preventDefault();
    const baseUrl = 'http://localhost:3030/users/register';
    const values = new FormData(e.target);
    const {name, email, password, rePassword, bio} = Object.fromEntries(values);
    if (password===rePassword){

      const res = await fetch(baseUrl, {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({name, email, password, bio})
      })
      const data = await res.json();
      setAuth(data);
      navigate('/');

    } else{
      alert("Passwords don't match!");
    }
  }

  async function onLogOut(){
    const baseUrl = 'http://localhost:3030/users/logout'
    const res = await fetch(baseUrl);
    setAuth({});
  }

const createContext = {
  showCreate,
  setShowCreate,
  CloseCreate
}

const authContext = {
  onLoginSubmit,
  onRegisterSubmit,
  onLogOut,
  ...auth
}



  return (
    <AuthContext.Provider value = {authContext}>
    <CreateContext.Provider value = {createContext}>
    <div className="App">
      <Routes>  
        <Route path='/' element = {<Index/>}/>
        <Route path='/about' element = {<About />} />
        <Route path='/catalog' element = {<Songs />} />
        <Route path='/catalog/:id' element={<Details />} />
        <Route path='/create' element = {<Create/>} />
        <Route path='/edit/:id' element = {<Edit />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/register' element = {<Register /> }/>
        <Route path='/logout' element = {<Logout />} />
      </Routes>
    </div>
    </CreateContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
