import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState }from 'react'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Wohnmobil from './components/Wohnmobil'
import NormalPage from './components/NormalPage'
import Cms from './components/Cms'

import db from './FirebaseConf';
import "./styles/main.css"

function Instagram () {
    window.location.replace("https://www.instagram.com/eko.450")
    return null
}

function App() {
  const [dev, setDev] = useState(true);
  const [hagelschaden, setHagelschaden] = useState([]);
  const [gutachten, setGutachten] = useState([]);
  const location = useLocation()

  const getData = async (col, state) => {
        const q = query(collection(db, col))
        const unsub = onSnapshot(q, (qs)=>{
            qs.forEach(doc=>{
              state(doc.data())
            })
        })
  }

  useEffect(()=>{
    if (dev){
        setGutachten([])
        setHagelschaden([])
        getData("hagelschaden", setHagelschaden)
        getData("gutachten", setGutachten)
    }
  },[])


  return (
    <div className='App'>
        <Navbar/>
        <TransitionGroup component={null}>
          <CSSTransition key={location.key} classNames="fade" timeout={500}>
            <Routes>
              <Route index path="home" element={<Home/>}/>
              <Route path="/" element={<Home/>}/>
              <Route path="/wohnmobilvermietung" element={<Wohnmobil/>}/>
              <Route path="/gutachten" element={<NormalPage title={gutachten.title} body={gutachten.body}/>}/>
              <Route path="/hagelschaden" element={<NormalPage title={hagelschaden.title} body={hagelschaden.body}/>}/>
              <Route path="/instagram" element={<Instagram/>}/>
              <Route path="/cms" element={<Cms/>}/>
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      <Footer />
    </div>
  );
}

export default App;
