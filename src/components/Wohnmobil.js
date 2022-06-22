import { useEffect, useState } from 'react'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { Button, Modal, Select, TextInput } from '@mantine/core'
import { DateRangePicker } from '@mantine/dates'
import dayjs from 'dayjs'
import c600 from '../styles/assets/C600.png'
import db from '../FirebaseConf'
import { createStyles } from '@mantine/core'
import { useForm } from '@mantine/hooks'
import emails from '@emailjs/browser'


const FloatingLabelStyle = createStyles((theme) => ({
  root: {
    position: 'relative',
    marginTop: 20,
  },

  input: {
    height: 'auto',
    paddingTop: 18,},
  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

function Wohnmobil(){
    const { classes } = FloatingLabelStyle()
    const [ infos, setInfos ] = useState([])
    const [ loaded, setLoaded ] = useState(false)
    const [ opened, setOpened ] = useState(false)
    const form = useForm({
        initialValues:{
            date:"",
            name:"",
            mail:"",
            mobile:"",
            favorite:"",
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    })

    const getInfos = async() => {
        const q = query(collection(db, "womo"))
        const unsub = onSnapshot(q, (qs)=>{
        qs.forEach(doc=>{
            setInfos(old => [...old, doc.data()])
            })
        })
    }


    const sendMail = (v)=>{
        emails.send(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            {
                subject: "Wohnmobilvermietung Anfrage",
                name:v.name,
                dateStart:dayjs(v.date[0]).format('DD.MM.YYYY'),
                dateEnd: dayjs(v.date[1]).format('DD.MM.YYYY'),
                Wohnmobil: "C600",
                mail:v.mail,
                mobile:v.mobile,
                favorite:v.favorite,
            },
            process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        ).then(function(response) {

            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
    }

    useEffect(()=>{
        setInfos([])
        getInfos()
    },[])

    useEffect(()=>{
        setLoaded(true)
    },[infos])

	return <div className="Wohnmobil full-size">

             <Modal
               opened={opened}
               onClose={()=>setOpened(false)}
               title={"Ihre Anfrage absenden"}
               centered
             >
               <form
                 className="form-centered"
                 onSubmit={form.onSubmit((values) => sendMail(values))}>
                    <DateRangePicker
                            required
                            label="Zeitraum"
                            placeholder="In welchem Zeitraum wollen Sie mieten?"
                            classNames={classes}
                            clearable={false}
                            inputFormat="DD.MM.YYYY"
                            {...form.getInputProps('date')}
                    />
                    <TextInput {...form.getInputProps('name')} required label="Name" placeholder="Max Musterman" classNames={classes} />

                    <TextInput {...form.getInputProps('mail')} required label="E-Mail" placeholder="max@musterman.de" classNames={classes} />
                    <TextInput {...form.getInputProps('mobile')} required label="Telefon / WhatsApp" placeholder="0170 123 45678" classNames={classes} />

                    <Select
                        style={{ zIndex: 2 }}
                        data={["Anruf", "E-Mail", "WhatsApp"]}
                        placeholder="Bitte Auswählen"
                        label="Wie würden Sie am liebsten kontaktiert werden?"
                        classNames={classes}
                        {...form.getInputProps('favorite')}
                    />
                 <div className='form-submit-wrapper'>
                    <Button
                        styles={{
                            root:{
                                margin:"0 auto"
                            }
                        }}
                        type="submit"
                        color="green"
                    >Anfrage Abschicken</Button>
                 </div>
               </form>


             </Modal>

             <div className="womo-hero">
                <h1>City Car C600</h1>
                <p>89 €/Tag</p>
             </div>

               {loaded &&
                infos.map((info, i )=>{
                    return <div key={i} className='infos'>
                             <div>
                                <p>Schlafplätze</p>
                                <p>{info.Schlafplätze}</p>
                             </div>
                            <div>
                                <p>Gesamtlänge</p>
                                <p>{info.Gesamtlänge}</p>
                            </div>
                            <div>
                                <p>Gesamtbreite</p>
                                <p>{info.Gesamtbreite}</p>
                            </div>
                            <div>
                                <p>Gesamthöhe</p>
                                <p>{info.Gesamthöhe}</p>
                            </div>
                            <div>
                                <p>Autobauart</p>
                                <p>{info.Autobauart}</p>
                            </div>
                            <div>
                                <p>techn. zul. Gesamtmasse</p>
                                <p>{info.TechnZulGesamtmasse}</p>
                            </div>
                            <div>
                                <p>Anhängerlast (gebremst)</p>
                                <p>{info.AnhängerlastGebremst}</p>
                            </div>
                            <div>
                                <p>Anhängerlast (ungebremst)</p>
                                <p>{info.AnhängerlastUngebremst}</p>
                            </div>
                            <div>
                                <p>Infrastruktur</p>
                                <p>{info.Infrastruktur}</p>
                            </div>
                            <div>
                                <p>Sitzgruppe</p>
                                <p>{info.Sitzgruppe}</p>
                            </div>
                            <div>
                                <p>Betten</p>
                                <p>{info.Betten}</p>
                            </div>
                            <div>
                                <p>Liegeflächen</p>
                                <p>{info.Liegefläche}</p>
                            </div>
                            <div>
                                <p>Polster</p>
                                <p>{info.Polster}</p>
                            </div>
                            <div>
                                <p>Heizung</p>
                                <p>{info.Heizung}</p>
                            </div>
                            <div>
                                <p>Kühlschrankvolumen</p>
                                <p>{info.Kühlschrankvolumen}</p>
                            </div>
                            <div>
                                <p>Gefriervolumen</p>
                                <p>{info.Gefriervolumen}</p>
                            </div>
                            <div>
                                <p>Wasservorrat</p>
                                <p>{info.Wasservorrat}</p>
                            </div>
                            <div>
                                <p>Wasservorrat inkl. Boiler</p>
                                <p>{info.WasservorratInklBoiler}</p>
                            </div>
                            <div>
                                <p>Abwassertankvolumen</p>
                                <p>{info.Abwassertankvolumen}</p>
                            </div>
                            <div>
                                <p>Batteriekapazität</p>
                                <p>{info.Batteriekapazität}</p>
                            </div>
                            <div>
                                <p>Ladegerät</p>
                                <p>{info.Ladegerät}</p>
                            </div>
                            <div>
                                <p>Steckdosen 12V</p>
                                <p>{info.Steckdosen}</p>
                            </div>
                    </div>
                })
               }

             <div className="images">
               {/* Karussel */}
               <img src={c600} alt="Ein foto von dem Wohnmobil City Car C600"/>
             </div>

             <Button
               radius="xl"
               color="green"
               onClick={()=> setOpened(true)}
             >Anfrage senden</Button>

		   </div>
}
export default Wohnmobil
