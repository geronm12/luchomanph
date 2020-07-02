import React, {useState, useEffect} from 'react';
import LoginModal from "./components/Modals/LoginModal"
import './App.css';

function App() {

  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    
  }, [showModal])

  return (
     <div>
     <h3>Home Page</h3>
     <LoginModal show={showModal} setShow = {setShowModal}></LoginModal>
     </div>
  );
}

export default App;
