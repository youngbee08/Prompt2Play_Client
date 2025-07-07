import './Header.css';
import { Link, } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [onHome, setOnHome] = useState(false);
  const {checkIsAuthenticated} = useContext(AuthContext);

  const scroll = ()=>{
    window.scrollY > 0 ? setScrolled(true):setScrolled(false);
    window.scrollY >= 0 ? setOnHome(true):setOnHome(false);
  };

  window.addEventListener("scroll", scroll)

  return (
    <header className={`header ${scrolled && "scrolled"} ${isOpened && "open"}`}>
      <div className="headerContainer">
        <div className="logo">
          <strong className='prompt'>Prompt</strong>
          <span className='two'>2</span>
          <strong className='play'>Play</strong>
        </div>
        <nav>
          <ul className="nav-links">
            <li><a href="#" className={`${scrolled && "scrolled"} ${onHome && "onHome"}`}>Home</a></li>
            <li><a href="#about" className={`${scrolled && "scrolled"}`}>About</a></li>
            <li><a href="#contact" className={`${scrolled && "scrolled"}`}>Contact</a></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          {
            checkIsAuthenticated() ? (
              <>
                <Link to={'/ai/text-to-video'} className={`btn generate-btn ${scrolled && "scrolled"}`}>Generate A Video</Link>
              </>
            ):(
              <>
                <Link to="/login" className={`btn login-btn ${scrolled && "scrolled"}`}>Login</Link>
                <Link to="/signup" className={`btn signup-btn ${scrolled && "scrolled"}`}>Sign Up</Link>
              </>
            )
          }
        </div>
        <div className="mobile">
          <button onClick={() => setIsOpened(!isOpened)}>{!isOpened ? <Menu size={25}/> : <X size={25}/>}</button>
        </div>
        <div className={`hiddenNav ${isOpened ? "open" : "close"}`}>
          <a href="#">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          {
            checkIsAuthenticated() ? (
              <>
                <Link to={'/ai/text-to-video'} className={`btn generate-btn ${scrolled && "scrolled"}`}>Generate A Video</Link>
              </>
            ):(
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )
          }
        </div>
      </div>
    </header>
  );
}