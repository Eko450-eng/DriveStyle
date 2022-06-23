import { Button, Menu } from '@mantine/core'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../styles/assets/logo.png'
import { Menu2 } from 'tabler-icons-react';

export default function Navbar(){

    const [ opened, setOpened ] = useState(false)
    const [ dev, setDev ] = useState(false)
    const Navigate = useNavigate()

	return (
        <div className="Navbar">
          <img
            onClick={()=>Navigate("")}
            className='logo' src={logo} alt="Die siluette eines Sportwagens" />
          <Menu
            styles={{
                body:{
                    backgroundColor: "black",
                    border:"1px solid gray"
                },
                itemLabel:{
                    color:"white",
                    margin:"0 auto",
                },
                itemHovered:{
                    background: "gray"
                }


            }}
            className='hamburger'
            control={
                <Button
                             className="no-hover-button"
                             variant='subtle'
                           ><Menu2
                                size={24}
                                strokeWidth={2}
                                color={'white'}
                            /></Button>}>
            <Menu.Item style={{textAlign:"center"}} onClick={()=>Navigate("home")}>Home</Menu.Item>
            <Menu.Item style={{textAlign:"center"}} onClick={()=>Navigate("wohnmobilvermietung")}>Wohnmobilvermietung</Menu.Item>
            <Menu.Item style={{textAlign:"center"}} onClick={()=>Navigate("gutachten")}>Gutachten</Menu.Item>
            <Menu.Item style={{textAlign:"center"}} onClick={()=>Navigate("hagelschaden")}>Hagelschaden</Menu.Item>
            {/* <Menu.Item style={{textAlign:"center"}} onClick={()=>Navigate("login")}>Login</Menu.Item> */}
              </Menu>
            <nav className="full-nav">
                <NavLink
                    to="home"
                    className={({ isActive }) => isActive ? "activeLink" : "link"}
                >Aufbereitung</NavLink>
                <NavLink
                    to="wohnmobilvermietung"
                    className={({ isActive }) => isActive ? "activeLink" : "link"}
                >Wohnmobilvermietung</NavLink>
                <NavLink
                    to="gutachten"
                    className={({ isActive }) => isActive ? "activeLink" : "link"}
                >KFZ Gutachten</NavLink>
                <NavLink
                    to="hagelschaden"
                    className={({ isActive }) => isActive ? "activeLink" : "link"}
                >Hagelschaden</NavLink>
                {/* <NavLink */}
                {/*     to="login" */}
                {/*     className={({ isActive }) => isActive ? "activeLink" : "link"} */}
                {/* >Kundenlogin</NavLink> */}
            </nav>
        </div>
    )
}
