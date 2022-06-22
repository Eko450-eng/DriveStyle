import { Route, Routes } from 'react-router-dom';
import { useEffect, useState }from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import ComingSoon from './components/ComingSoon'
import Wohnmobil from './components/Wohnmobil'
import NormalPage from './components/NormalPage'
import "./styles/main.css"
import { collection, onSnapshot, query } from 'firebase/firestore';
import db from './FirebaseConf';

function Instagram () {
    window.location.replace("https://www.instagram.com/eko.450")
    return null
}

function App() {
  const [dev, setDev] = useState(true);
  const [hagelschaden, setHagelschaden] = useState([]);
  const [gutachten, setGutachten] = useState([]);

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
      { dev && <Navbar/> }
      { dev &&
        <Routes>
          <Route index path="home" element={<Home/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/wohnmobilvermietung" element={<Wohnmobil/>}/>
          <Route path="/gutachten" element={<NormalPage title={gutachten.title} body={gutachten.body}/>}/>
          <Route path="/hagelschaden" element={<NormalPage title={hagelschaden.title} body={hagelschaden.body}/>}/>
          <Route path="/instagram" element={<Instagram/>}/>
        </Routes>
      }
      { !dev && <ComingSoon/> }
      { dev && <Footer /> }
    </div>
  );
}

export default App;
