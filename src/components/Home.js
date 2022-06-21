import React from 'react';

const leistungen = [
    {
        title:"LEISTUNGEN",
        price: 30,
        body: "Tempor non lectus, magnis dui nibh dapibus duis, eget, purus elementum conubia sollicitudin cubilia erat ac augue ac tempus. Molestie et erat bibendum a, dictumst ante dis. Hendrerit risus, ridiculus neque orci nascetur sit. Netus et sapien a, vivamus mollis. Potenti, cubilia taciti fusce nonummy sodales porttitor urna nunc commodo elit."
    },
    {
        title:"LEISTUNGEN",
        price: 30,
        body: "Tempor non lectus, magnis dui nibh dapibus duis, eget, purus elementum conubia sollicitudin cubilia erat ac augue ac tempus. Molestie et erat bibendum a, dictumst ante dis. Hendrerit risus, ridiculus neque orci nascetur sit. Netus et sapien a, vivamus mollis. Potenti, cubilia taciti fusce nonummy sodales porttitor urna nunc commodo elit."
    },
    {
        title:"LEISTUNGEN",
        price: 30,
        body: "Tempor non lectus, magnis dui nibh dapibus duis, eget, purus elementum conubia sollicitudin cubilia erat ac augue ac tempus. Molestie et erat bibendum a, dictumst ante dis. Hendrerit risus, ridiculus neque orci nascetur sit. Netus et sapien a, vivamus mollis. Potenti, cubilia taciti fusce nonummy sodales porttitor urna nunc commodo elit."
    },
    {
        title:"LEISTUNGEN",
        price: 30,
        body: "Tempor non lectus, magnis dui nibh dapibus duis, eget, purus elementum conubia sollicitudin cubilia erat ac augue ac tempus. Molestie et erat bibendum a, dictumst ante dis. Hendrerit risus, ridiculus neque orci nascetur sit. Netus et sapien a, vivamus mollis. Potenti, cubilia taciti fusce nonummy sodales porttitor urna nunc commodo elit."
    },
    {
        title:"LEISTUNGEN",
        price: 30,
        body: "Tempor non lectus, magnis dui nibh dapibus duis, eget, purus elementum conubia sollicitudin cubilia erat ac augue ac tempus. Molestie et erat bibendum a, dictumst ante dis. Hendrerit risus, ridiculus neque orci nascetur sit. Netus et sapien a, vivamus mollis. Potenti, cubilia taciti fusce nonummy sodales porttitor urna nunc commodo elit."
    },
]

export default function Home() {
    let count = 0
    return (
        <div className="Home">
            <div className="hero">
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
                    console.log(count)

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
                            <p className='leistung-pricetag'>`{leistung.price} €*`</p>
                        </div>
                        <p className='leistung-body'>{leistung.body}</p>
                    </div>
                    )
                })
              }
            </div>
        </div>
    );
}
