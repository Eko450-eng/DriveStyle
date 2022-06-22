import { collection, doc, getDoc, getDocs, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import db from '../FirebaseConf'

export default function Home() {
    let count = 0
    const [ leistungen, setLeistungen ] = useState([])

    const getLeistungen = async() =>{
        const q = query(collection(db, "leistungen"))
        const unsub = onSnapshot(q, (qs)=>{
            qs.forEach(doc=>{
                setLeistungen(old => [...old, doc.data()])
            })
        })
    }

    useEffect(()=>{
        setLeistungen([])
        getLeistungen()
    },[])

    return (
        <div className="Home">
            <div className="hero full-size">
              <h1>DRIVESTYLE</h1>
              <p>Nullam rutrum.Sed diamAliquam feugiat tellus ut neque.</p>
            </div>
            <div className="main">

              {
                leistungen.map((leistung, i) => {
                    let row = (i+1).toString()

                    let position = "left";
                    if(count === 3){
                        count = 1
                    }else{
                        count++
                    }

                    switch(count){
                        case(1):
                            position = "left";
                            break
                        case(2):
                            position = "center";
                            break
                        case(3):
                            position = "right";
                            break
                    }

                    return (
                        <div key={leistung+i} style={{ gridRow: row }} className={ "leistung-wrapper " + position }>
                        <div className="leistung-top">
                            <h4 className="leistung-title">{leistung.title.toUpperCase()}</h4>
                            <p className='leistung-price'>{leistung.price} €*</p>
                        </div>
                        <p className='leistung-body'>{leistung.body}</p>
                    </div>
                    )
                })
              }

            </div>
              <p className="disclaimer">*Preise sind mindestwerte, für genauere Preisangaben können Sie uns gerne kontaktieren</p>
        </div>
    );
}
