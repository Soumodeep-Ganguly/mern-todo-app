import React, { useState, useEffect, useContext } from 'react'
import { UilTimes, UilBars, UilSun, UilMoon, UilSignOutAlt, UilCreateDashboard, UilInfoCircle, UilAt } from '@iconscout/react-unicons'
import { AuthContext } from '../../app/auth'
import { Link } from 'react-router-dom'
import './sidenav.scss'

export default function SideNav(props) {
    const [open, setOpen] = useState(false)
    const authContext = useContext(AuthContext)

    useEffect(() => {
        // Use window.innerWidth to get the current screen width
        const screenWidth = window.innerWidth;

        // Set the initial state of open based on screen width
        setOpen(screenWidth >= 769);
    }, []);

    const toggleDarkMode = () => {
        if(authContext.dark) { // turn off dark mode
            localStorage.removeItem('darkMode')
            authContext.setDark(false)
        } else { // turn onn dark mode
            localStorage.setItem('darkMode', true)
            authContext.setDark(true)
        }
    }

    return (
        <div className='container'>
            <div className={`sidenav-view ${open ? 'open' : ''} ${authContext.dark ? 'dark' : ''}`}>
                <nav className={`${open ? "open" : "closed"}`}>
                    <header>TODO</header>
                    <div className='nav-wrapper'>
                        <Link to='/' className='active'>
                            <UilCreateDashboard style={{ marginTop: 20 }} />
                            <span className="nav-text">Dashboard</span>
                        </Link>
                    </div>
                    <div className='nav-action'>
                        {authContext.dark && <UilSun onClick={() => toggleDarkMode()} />}
                        {!authContext.dark && <UilMoon onClick={() => toggleDarkMode()} />}
                        <UilSignOutAlt className="sign-off" onClick={() => authContext.signout()} />
                    </div>
                </nav>
            </div>
            <div className={`sidenav-toggler ${authContext.dark ? 'dark' : ''}`}>
                {!open && <UilBars size={14} className="on" onClick={() => setOpen(true)} />}
                {open && <UilTimes size={18} className="off" onClick={() => setOpen(false)} />}
            </div>
            <div className={`content-view ${open ? 'open' : ''} ${authContext.dark ? 'dark' : ''}`}>
                {props.children}
            </div>
        </div>
    )
}
