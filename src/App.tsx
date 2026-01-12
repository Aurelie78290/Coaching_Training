import { Outlet } from 'react-router';
import { useState } from "react";
import Header from './components/Header'
import './App.css'

function App() {
  const [user, setUser] = useState (null);

  return (
    <>
      <Header />
      <main>
        <Outlet context={{ user, setUser}} />
      </main>
    </>
  )
}

export default App
