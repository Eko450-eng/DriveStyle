import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'

function Footer(){
	return <div className="Footer">
             <div className="bank">
               <p>BANK: Sparkasse</p>
               <p>IBAN: DE00 0000 0000 0000</p>
               <p>BLZ: HELADEF1HAN</p>
             </div>
             <div className="name">
               <p>DRIVESTYLE</p>
               <p>BenzStr. 3</p>
               <p>72636 Frickenhausen</p>
               <p>Tel.: +49 1575 1541089</p>
               <p>info@drivestyle.info</p>
             </div>
             <div className="socials">
               <FontAwesomeIcon className='icons' icon={faEnvelope}/>
               <FontAwesomeIcon className='icons' icon={faInstagram}/>
               <FontAwesomeIcon className='icons' icon={faFacebook}/>
               <FontAwesomeIcon className='icons' icon={faPhone}/>
             </div>
		   </div>
}
export default Footer
