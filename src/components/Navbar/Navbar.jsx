import React, { useRef } from 'react'
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
    window.addEventListener('scroll',function(){
        const navbar = document.getElementById("header");
        navbar.classList.toggle("sticky", window.scrollY > 0);
    });

    const NavLinkStyle = ({ isActive }) =>{
      return {
        color: isActive ? 'dodgerblue' : '#fff'
      }
    }

    const navRef = useRef()

    const showNavbar = () => {
      navRef.current.classList.toggle("reponsiveNav")
    }

  return (
    <>
        <header id='header'>
          <div className='navLogo' onClick={() => window.scroll(0,0)}><NavLink to="/"><h1><span>🏚</span> Waga's<span>HUB</span></h1></NavLink></div>
          <nav className='navBar' id='navBar' ref={navRef}>
            <NavLink to="/movies" className='navLinks' style={NavLinkStyle} id='movies' onClick={showNavbar}>
                Movies
              </NavLink>
              <NavLink to="/tvshows" className='navLinks' style={NavLinkStyle} onClick={showNavbar}>
                Tv Shows
              </NavLink>
              <NavLink to="/people" className='navLinks' style={NavLinkStyle} onClick={showNavbar}>
                People
              </NavLink>
              <button className='navBtn navCloseBtn' onClick={showNavbar}>
                <FaTimes />
              </button>
              
              <form className="search">
                <input type="text" className='navSearchInput' placeholder='Movies, Tv Shows, People...' />
                <button type='button' className='navSearchBtn'>
                  <FaSearch />
                </button>
              </form>
          </nav>
          <button className='navBtn' onClick={showNavbar}>
            <FaBars />
          </button>
        </header>
    </>
  )
}

export default Navbar