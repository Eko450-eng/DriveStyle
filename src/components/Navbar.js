import { NavLink } from 'react-router-dom'
import logo from '../styles/assets/logo.png'

export default function Navbar(){
	return (
        <div className="Navbar">
          <img className='logo' src={logo} alt="Die siluette eines Sportwagens" />
            <nav >
                <NavLink
                    to="home"
                    className={({ isActive }) => isActive ? "activeLink" : "link"}
                >Aufbereitung</NavLink>
                <NavLink
                    to="wohnmobilvermietun"
                    className={({ isActive }) => isActive ? "activeLink" : "link"}
                >Wohnmobilvermietung</NavLink>
                <NavLink
                    to="gutachten"
                    className={({ isActive }) => isActive ? "activeLink" : "link"}
                >KFZ Gutachten</NavLink>
                <NavLink
                    to="login"
                    className={({ isActive }) => isActive ? "activeLink" : "link"}
                >Kundenlogin</NavLink>
            </nav>
        </div>
    )
}
