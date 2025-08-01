import React, { useContext, useEffect, useState } from 'react'
import "./GennerateVideo.css"
import { Unlock, ChevronDown, ChevronRight, Headphones, History, LogOut, Settings2, Stars, Trash2, User, Video } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import prompt2playlogo_removebg from '../assets/prompt2playlogo_removebg.png'
import { AuthContext } from '../contexts/AuthContext'
import { toast } from 'sonner'
import GeneratingLoader from './GeneratingLoader'

const GennerateVideo = () => {
  const {logout,authRequestWithTokenGet,videoRequestWithToken} = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen,setIsOpen] = useState(false);
  const [promptInput, setPromptInput] = useState({prompt:''});
  const [promptLength, setPromptLength ] = useState(0);
  const [isgenerating,setIsgenerating] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [toggleSettings, setToggleSettings] = useState(false);
  // sampleVideo = 'https://www.w3schools.com/html/mov_bbb.mp4';
  const toggleProfile = ()=>{
    setIsOpen(!isOpen)
  };
  const toggleSettingsfnc = ()=>{
    setToggleSettings(!toggleSettings)
  };
  const logOutFnc = (e) =>{
    e.preventDefault()
    logout();
    navigate("/login");
  }

  function showPromptLength(e){
    const text = e.target.value;
    setPromptInput({prompt:text});
    setPromptLength(text.length); 
  };

  const getCurrentUser = async ()=>{
    try {
      const res = await authRequestWithTokenGet();
      if (res) {
        if (res.status === "error") {
          toast.error(res.message)
        }
        else{
          setCurrentUser(res?.user);
        }
        return
      }
      toast.error("Oops! Something went wrong, Please try again")
    } catch (error) {
      console.log(error)
    }
  };

  const generateVideo = async ()=>{
    setIsgenerating(true)
    try {
      const res = await videoRequestWithToken(promptInput,"generate");
      if (res) {
        if (res?.status === "error") {
          toast.error(res.message)
        }else{
          setVideoURL(res?.video)
          toast.success(res?.message)
          document.getElementById("video").scrollIntoView({behavior:"smooth",block:"start"})
        }
        return
      };
      toast.error("Oops! Something went wrong, Please try again")
    } catch (error) {
      console.log(error)
    } finally{
      setIsgenerating(false)
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUser !== null) {
      toast.success(`You are currently logged in as ${currentUser?.userName}`);
    }
  }, [currentUser]);

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
          <div className="profileDropdown" id='profileDropdown' onClick={toggleProfile}>
            {
               !currentUser?.profilePic ? (<User/>) : (<img title={`${currentUser.fullName}(@${currentUser.userName})`} className='profileImg' src={currentUser.profilePic} alt="profile-picture" />) 
            }
          <ChevronDown className={`chev ${isOpen ? "open" : ""}`}/></div>
          <div className={`dropdownContent ${isOpen ? "open" : ""}`} id='dropdownContent'>
            <div className="profile">
              <div className="profilePic">
                {
                  !currentUser?.profilePic ? (<User size={80}/>) : (<img title={`${currentUser.fullName}(@${currentUser.userName})`} className='profileImg' src={currentUser.profilePic} alt="profile-picture" />) 
                }
              </div>
              <div className="details">
                <h2>@{currentUser ? currentUser.userName.length >= 9 ? `${currentUser.userName.slice(0,7)}...` : currentUser.userName : "User"}</h2>
                <Link to="/user/account-center" style={{textDecoration:"underline"}}>Account Center <ChevronRight size={15}/></Link>
              </div>
            </div>
            <div className="actionLinks">
              <Link to="/user/history"><div className="cont"><History/>History</div><ChevronRight/></Link>

              <a href="/#contact"><div className="cont"><Headphones/>Contact Support</div><ChevronRight/></a>

              <Link onClick={logOutFnc}><div className="cont"><LogOut/>Log out</div><ChevronRight/></Link>

              <a style={{cursor:"pointer"}} onClick={toggleSettingsfnc} className='toggleSettings'><div className="cont"><Settings2/>Other Settings</div><ChevronDown className={`chevron ${toggleSettings && "open"}`}/></a>

              <div className={`otherSettings ${toggleSettings && "open"}`} style={{paddingLeft:"2rem"}}>
                <Link to='/updatePassword?forgot=false'><div className="cont"><Unlock/>Reset Password</div><ChevronRight/></Link>
                <a><div className="cont"><Trash2/>Delete Account</div><ChevronRight/></a>
              </div>
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
                  <textarea onChange={showPromptLength} name="prompt" id="prompt" className={`${promptLength >= 200 ? "much" : ""}`} maxLength={200} placeholder='Describe the video content to be generated based on your prompt...'>
                  </textarea>
                  <div id="counter" className={`count ${promptLength >= 200 ? "much" : ""}`}>{promptLength}/200</div>
                  <button disabled={!promptInput.prompt || isgenerating} onClick={generateVideo}><Stars/>Generate</button>
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