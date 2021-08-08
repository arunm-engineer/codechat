import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import PageRouters from "./components/PageRouters"


function App() {

  // Notifications API on app start for message pop-ups
  useEffect(() => {
    console.log(Notification.permission);
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(permission => {
        console.log(permission);
      })
      .catch(() => {
        console.log("Error in Notification");
      })
    }
  }, [])

  return (
    <div className="App">
      <PageRouters />
    </div>
  );
}

export default App;
