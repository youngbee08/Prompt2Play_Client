import React, { useContext, useEffect, useRef, useState } from 'react'
import './Account.css'
import { ArrowLeft, Edit3, User } from 'lucide-react'
import { toast } from 'sonner';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const {authRequestWithTokenGet,authRequestWithTokenPost} = useContext(AuthContext);
  const [disabled, setDisabled] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const [updateProfileForm, setUpdateProfileForm] = useState ({
    fullName:'',
    userName:'',
    profilePic:null,
    phoneNumber:''
  })

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

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (updateProfileForm) {
      setDisabled(false)
    }else{
      setDisabled(true)
    }
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUpdateProfileForm((prev) => ({...prev, [e.target.name]:file}));
      setPreview(imageUrl);
    }
  };

  const handleCancel = () =>{
    setPreview(null);
    document.getElementById("profileDetals").reset()
  };

  const handleNavigate = () =>{
    navigate(-1)
  };

  const handleInputChange = (e) =>{
    if (updateProfileForm) {
      setDisabled(false)
    }else{
      setDisabled(true)
    }
    const {name,value} = e.target;
    setUpdateProfileForm((prev) => ({...prev, [name]:value}))
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    setUpdating(true)
    const formData = new FormData();
    formData.append("fullName", updateProfileForm.fullName || currentUser.fullName)
    formData.append("userName", updateProfileForm.userName || currentUser.userName)
    formData.append("phoneNumber", updateProfileForm.phoneNumber || currentUser.phoneNumber)
    formData.append("profilePic", updateProfileForm.profilePic || currentUser.profilePic)
    try {
      const res = await authRequestWithTokenPost(formData,"updateProfile");
      if (res) {
        if (res.status === "error") {
          toast.error(res.message)
        }else{
          toast.success(res.message)
          navigate("/ai/text-to-video")
        }
        return
      }
      toast.error("Oops! Something went wrong, Please try again")
    } catch (error) {
      console.log(error)
    } finally{
      setUpdating(false)
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
  <>
    <div className="goBack">
      <button onClick={handleNavigate}><ArrowLeft/> Back</button>
    </div>
    <div className='editContainer'>
      <div className="pPicture">
        {preview ? (
          <img src={preview} alt="Profile Preview" className="previewImg" />
        ) : (        
          !currentUser?.profilePic ? (<User size={64}/>) : (<img title={`${currentUser.fullName}(@${currentUser.userName})`} className='profileImg' src={currentUser.profilePic} alt="profile-picture" />)            
        )}
        <button className='editIcon' type="button" onClick={handleEditClick}>
          <Edit3 size={18} />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          name='profilePic'
        />
      </div>

      <form className="profileDetals" id='profileDetals' onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" placeholder='Full Name' name="fullName" defaultValue={currentUser?.fullName}  onChange={handleInputChange} max={20}/>
        </div>

        <div className="inputGroup">
          <label htmlFor="userName">Username</label>
          <input type="text" placeholder='Username' name="userName" defaultValue={currentUser?.userName} onChange={handleInputChange} max={12}/>
        </div>

        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input type="email" readOnly  placeholder='Email Address' name="email" defaultValue={currentUser?.email}/>
        </div>

        <div className="inputGroup">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" placeholder='Phone Number' name="phoneNumber" defaultValue={currentUser?.phoneNumber} onChange={handleInputChange}/>
        </div>

        <div className="actionBtns">
          <button onClick={handleCancel} className='cancelBtn' type='button'>Cancel</button>
          <button className="saveBtn" type="submit" disabled={updating || disabled}>{updating ? "Saving Changes" : "Save Changes"}
            {
              updating && (<div className="spinner"></div>)
            }
          </button>
        </div>
      </form>
    </div>
  </>
  )
}

export default Account;
