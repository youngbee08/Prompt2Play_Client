import { ArrowUp } from 'lucide-react'
import React, { useState } from 'react'
import "./ScrollUp.css"

const ScrollUp = () => {
    const [display, setDisplay] = useState(false);
    const shouldDisplay = ()=>{
        window.scrollY > 100 ? setDisplay(true) : setDisplay(false);
    };
    window.addEventListener("scroll", shouldDisplay)
  return (
    display && (
        <div className='scrollCon'>
           <a href="#"><ArrowUp size={25}/></a>
        </div>
    )
  )
}

export default ScrollUp