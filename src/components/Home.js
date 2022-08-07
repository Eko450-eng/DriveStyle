import { collection, onSnapshot, query } from 'firebase/firestore';
import { gsap } from 'gsap'
import React, { useEffect, useState } from 'react';
import db from '../FirebaseConf'

export default function Home() {
    let count = 0
    const [ leistungen, setLeistungen ] = useState([])
    const [ homeTitle, setHomeTitle ] = useState([])

    const getLeistungen = async() =>{
        const q = query(collection(db, "leistungen"))
        const unsub = onSnapshot(q, (qs)=>{
            qs.forEach(doc=>{
                setLeistungen(old => [...old, doc.data()])
            })
        })
    }

    const getTitle = async() =>{
        const q = query(collection(db, "headers"))
        const unsub = onSnapshot(q, (qs)=>{
            qs.forEach(doc=>{
                let data = doc.data().home
                setHomeTitle(()=>[...data])
            })
        })
    }

    useEffect(()=>{
        setLeistungen([])
        getLeistungen()
        getTitle()
    },[])

    gsap.fromTo(".main", {opacity:0, x:1000},{opacity:1, x:0, delay:1.5, duration:1})

    return (
        <div className="Home">
          <div className="background">
            <div className="hero full-size">
              <h1 className="heading">DRIVESTYLE</h1>

              {homeTitle.map((i,k)=>{
                return <p key={k}>{i}</p>
              })}

              <div className='scroll-indicator'>
                <div className="ball"></div>
              </div>
            </div>
          </div>
          <p className='marker'>t</p>
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

                          <ul className='leistung-body'>{
                              leistung.body.map((leistung, index)=>{
                                  return <li key={index}>{leistung}</li>
                              })
                          }</ul>

                          {
                          leistung.zusatz != undefined &&
                            <ul className='leistung-body'> <p>Zusatzleistungen</p>{
                                leistung.zusatz.map((leistung, index)=>{
                                    return <li key={index}>{leistung}</li>
                                })
                            }</ul>
                          }

                    </div>
                    )
                })
              }

            </div>
              <p className="disclaimer">*Preise sind mindestwerte, für genauere Preisangaben können Sie uns gerne kontaktieren</p>
        </div>
    );
}
