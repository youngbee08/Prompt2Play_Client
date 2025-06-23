import './Header.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const scroll = ()=>{
    window.scrollY > 0 ? setScrolled(true):setScrolled(false);
  };

  window.addEventListener("scroll", scroll)
  return (
    <header className={`header ${scrolled ? "scrolled" : ""} ${isOpened ? "open" : ''}`}>
      <div className="headerContainer">
        <div className="logo">
          <strong className='prompt'>Prompt</strong>
          <span className='two'>2</span>
          <strong className='play'>Play</strong>
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/" className={`${scrolled ? "scrolled" : ""}`}>Home</Link></li>
            <li><Link to="/generate" className={`${scrolled ? "scrolled" : ""}`}>Generate</Link></li>
            <li><Link to="/about" className={`${scrolled ? "scrolled" : ""}`}>About</Link></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <Link to="/login" className={`btn login-btn ${scrolled ? "scrolled" : ""}`}>Login</Link>
          <Link to="/signup" className={`btn signup-btn ${scrolled ? "scrolled" : ""}`}>Sign Up</Link>
        </div>
        <div className="mobile">
          <button onClick={() => setIsOpened(!isOpened)}>{!isOpened ? <Menu size={25}/> : <X size={25}/>}</button>
        </div>
        <div className={`hiddenNav ${isOpened ? "open" : "close"}`}>
          <Link to="/">Home</Link>
          <Link to="/generate">Generate</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}