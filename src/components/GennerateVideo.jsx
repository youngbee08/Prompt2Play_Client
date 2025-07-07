import React, { useContext, useEffect, useState } from 'react'
import "./GennerateVideo.css"
import { AtSign, ChevronDown, ChevronRight, Headphones, History, LogOut, Stars, User, Video } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import prompt2playlogo_removebg from '../assets/prompt2playlogo_removebg.png'
import { AuthContext } from '../contexts/AuthContext'
import { toast } from 'sonner'
import GeneratingLoader from './GeneratingLoader'

const GennerateVideo = () => {
  const {logout,authRequestWithTokenGet,videoRequestWithToken} = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen,setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [count, setCount] = useState(0);
  const [isgenerating,setIsgenerating] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  // sampleVideo = 'https://www.w3schools.com/html/mov_bbb.mp4';
  const toggleProfile = ()=>{
    setIsOpen(!isOpen)
  };
  const logOutFnc = (e) =>{
    e.preventDefault()
    logout();
    navigate("/login");
  }

  function showCount(e){
    const text = e.target.value;
    setPrompt({prompt:text});
    console.log(prompt)
    setCount(text.length); 
  };

  const getCurrentUser = async ()=>{
    try {
      const res = await authRequestWithTokenGet();
      if (res.status === "error") {
        return toast.error(res.message)
      }
      console.log(res)
      console.log(res.user, 'logged')
      setCurrentUser(res.user);
      console.log(currentUser,"current")
      toast.success(`You are currently logged in as ${currentUser?.userName}`)
    } catch (error) {
      console.log(error)
    }
  };

  const generateVideo = async ()=>{
    setIsgenerating(true)
    console.log(prompt)
    try {
      const res = await videoRequestWithToken(prompt,"generate","POST");
      if (res.status === "error") {
        return toast.error(res.message)
      };
      setVideoURL(res.video)
      toast.success(res.message)
      document.getElementById("video").scrollIntoView({behavior:"smooth",block:"start"})
    } catch (error) {
      console.log(error)
    } finally{
      setIsgenerating(false)
    }
  };

  useEffect(() => {
    getCurrentUser()
  }, [])


  return (
    <>
      <header className='generateHeader'>
        <div className="generateLogo">
          <img src={prompt2playlogo_removebg} alt="prompt2playLogo" />
          <h2 className='title'>Promp2Play AI</h2>
          <p className='split'>|</p>
          <h2 className='title'>AI Video Generator</h2>
        </div>
        <div className="dropDown">
          <div className="profileDropdown" id='profileDropdown' onClick={toggleProfile}><User/><ChevronDown className={`chev ${isOpen ? "open" : ""}`}/></div>
          <div className={`dropdownContent ${isOpen ? "open" : ""}`} id='dropdownContent'>
            <div className="profile">
              <div className="profilePic">
                <User size={50}/>
              </div>
              <div className="details">
                <h2>@bamitale</h2>
                <Link to="" style={{textDecoration:"underline"}}>Account Center <ChevronRight size={15}/></Link>
              </div>
            </div>
            <div className="actionLinks">
              <Link to="/history"><History/>History</Link>
              <a href="/#contact"><Headphones/>Contact Support</a>
              <Link onClick={logOutFnc}><LogOut/>Log out</Link>
            </div>
          </div>
        </div>
      </header>
      <section className='generate'>
        <aside className='generateCard contentTab'>
          <div className="head">
            <h2>Text To Video</h2>
          </div>
          {
            isgenerating ? (
              <>
                <div>
                  <GeneratingLoader/>
                </div>
              </>
            ):(
              <>
                <div className="input">
                  <h3>Prompt</h3>
                  <textarea onChange={showCount} name="prompt" id="prompt" className={`${count >= 200 ? "much" : ""}`} maxLength={200} placeholder='Describe the video content to be generated based on your prompt...'>
                  </textarea>
                  <div id="counter" className={`count ${count >= 200 ? "much" : ""}`}>{count}/200</div>
                  <button disabled={prompt == '' && true || isgenerating} onClick={generateVideo}><Stars/>Generate</button>
                </div>
              </>
            )
          }
        </aside>
        <main className='generateCard videoTab'>
          <div className="head">
            <h2>Output</h2>
          </div>
          <div className="video" id='video'>
            {
              videoURL === "" ? (
                <>
                   <Video size={200}/>
                   <p>Your cinematic masterpiece will illuminate this space once our digital artisans complete their craft. Stay tuned, perfection takes a moment! 🌟</p>
                </>
              ) : (
                <>
                  <video
                  src={videoURL}
                  controls
                  playsInline
                  autoPlay
                  style={{
                    marginTop: "1.5rem",
                    borderRadius: "12px",
                    width: "100%",
                    maxWidth: "600px",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                    outline: "none"
                  }}
                  />
                </>
              )
            }
          </div>
        </main>
      </section>
    </>
  )
}

export default GennerateVideo