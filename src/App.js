import React, {useState, useEffect} from 'react';
import LoginModal from "./components/Modals/LoginModal"
import {ToastContainer} from "react-toastify";
import {AuthContext} from "./utils/context";
import {isUserLogedApi} from "./api/login";
import Routing from "./routes/Routing";
import './App.css';

function App() {

 
  const [user, setUser] = useState(null);

  const [refreshLogin, setRefreshLogin] = useState(false); 

  const [loadUser, setLoadUser] = useState(false);

  useEffect(() => {
   setUser(isUserLogedApi())
   setRefreshLogin(false);
   setLoadUser(true);
  },[refreshLogin]);

  if(!loadUser) return null;
   
  return (
     <AuthContext.Provider value = {user}>
       { user ?  
       (<Routing setRefreshLogin= {setRefreshLogin} />) :
      (<LoginModal  setRefreshLogin={setRefreshLogin}></LoginModal>)}
     <ToastContainer 
     position="top-right"
     autoClose = {5000}
     hideProgressBar
     newestOnTop = {false}
     closeOnClick
     rtl = {false}
     pauseOnVisibilityChange
     draggable
     pauseOnHover
     />
     </AuthContext.Provider>
  );
}

export default App;
