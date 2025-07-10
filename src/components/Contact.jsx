import React from 'react'
import './Contact.css'
import { MessageCircle, Send, User } from 'lucide-react'
import { toast } from 'sonner'

const Contact = () => {
  return (
    <>
      <form className="contact" id="contact" onSubmit={(e)=>{e.preventDefault(), toast.success("Your message has been sent successfully, we will get back to you soon")}}>
        <h2>Get in touch</h2>
        <div className="contactInputs">
          <label htmlFor="name"><User size={35}/></label>
          <input required title='First Name' type="text" name='name' placeholder='First Name'/>
          <input title='Last Name' type="text" name='name' placeholder='Last Name (Optional)' className='last'/>
        </div>
        <div className="contactTextarea">
          <label htmlFor="message"><MessageCircle size={35}/></label>
          <textarea required title='Message' name="message" id="messageTextarea" placeholder='Message'></textarea>
        </div>
        <div className="contactButton">
          <button className='btn contact-Btn'><Send/>Send Message</button>
        </div>
      </form>
    </>
  )
}

export default Contact