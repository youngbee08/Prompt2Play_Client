import React, { useContext, useEffect, useState } from 'react'
import "./GennerateVideo.css"
import { Unlock, ChevronDown, ChevronRight,  LogOut, Settings2,  Trash2, User, Video, VideoOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import prompt2playlogo_removebg from '../assets/prompt2playlogo_removebg.png'
import { AuthContext } from '../contexts/AuthContext'
import { toast } from 'sonner'

const Videos = () => {
  const {logout,authRequestWithTokenGet,videoRequestWithTokenGet} = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen,setIsOpen] = useState(false);
  const [videos,setVideos] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [toggleSettings, setToggleSettings] = useState(false);
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

  const getVideos = async ()=>{
    setIsLoading(true)
    try{
      const res = await videoRequestWithTokenGet();
      if (res) {
        if (res.status === "error") {
          toast.error(res.message)
        }
        else{
          setVideos(res?.videos);
        }
        return
      }
      toast.error("Oops! Something went wrong, Please try again")
    }catch (error) {
      console.log(error)
    } finally{
      setIsLoading(false)
    }
  }


  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <>
      <header className='generateHeader'>
        <div className="generateLogo">
          <img src={prompt2playlogo_removebg} alt="prompt2playLogo" />
          <h2 className='title'>Promp2Play AI</h2>
          <p className='split'><ChevronRight size={12} color='black'/></p>
          <Link className='title' to='/ai/text-to-video'>AI Video Generator</Link>
          <p className='split'><ChevronRight size={12} color='black'/></p>
          <h2 className='title'>Cutbacks</h2>
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
              <Link to="/ai/text-to-video"><div className="cont"><Video/>Generate new video</div><ChevronRight/></Link>

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
      <section className='videoSection'>
          <div className="head">
            <h2>Videos</h2>
          </div>
          {
            isLoading ? (
              <>
                <div className="spin">
                  <div className="spinner"></div>
                </div>
              </>
            ):(
              !videos.length ? (
                <>
                  <div className="notCreated">
                    <VideoOff size={200}/>
                    <p>Seems you haven't create any video</p>
                    <Link to="/ai/text-to-video">Start Creating</Link>
                  </div>
                </>
              ): (
                <>
                  <div className='videos'>
                    {
                      videos.map((element,index)=>[
                        <>
                          <video src={`${element.videoUrl}`} key={index} controls></video>
                        </>
                      ])
                    }
                </div>
                </>
              )
            )
          }
      </section>
    </>
  )
}

export default Videos