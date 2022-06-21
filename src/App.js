import { Route, Routes } from 'react-router-dom';
import { useState }from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import ComingSoon from './components/ComingSoon'

import "./styles/main.css"

function App() {
  const [dev, setDev] = useState(false);

  return (
    <div className='App'>
      { dev ?
        <div>
          <Navbar/>
          <Routes>
            <Route index path="home" element={<Home/>}/>
          </Routes>
          <Footer />
        </div> : <ComingSoon/>
      }
    </div>
  );
}

export default App;
