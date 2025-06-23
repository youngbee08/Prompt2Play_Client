import React from 'react'

import './Carousel.css'

import amazon_logo from '../assets/amazon_logo.png'
import bbc_logo from '../assets/bbc_logo.png'
import google_logo from '../assets/google_logo.png'
import merck_logo from '../assets/merck_logo.png'
import meta_logo from '../assets/meta_logo.png'
import nbcuniversal_logo from '../assets/nbcuniversal_logo.png'
import netflix_logo from '../assets/netflix_logo.png'
import p_and_g_logo from '../assets/p_and_g_logo.png'
import pentax_logo from '../assets/pentax_logo.png'
import target_logo from '../assets/target_logo.png'
import ubs_logo from '../assets/ubs_logo.png'
import venturefoods_logo from '../assets/venturefoods_logo.png'
import visa_logo from '../assets/visa_logo.png'

const Carousel = () => {
  return (
    <div className='carouselCon'>
      <div className="carouselTrack">
        <img src={google_logo} alt="google_logo" />
        <img src={bbc_logo} alt="bbc_logo" />
        <img src={merck_logo} alt="merck_logo" />
        <img src={amazon_logo} alt="amazon_logo" />
        <img src={meta_logo} alt="meta_logo" />
        <img src={netflix_logo} alt="netflix_logo" />
        <img src={pentax_logo} alt="pentax_logo" />
        <img src={ubs_logo} alt="ubs_logo" />
        <img src={visa_logo} alt="visa_logo" />
        <img src={venturefoods_logo} alt="venturefoods_logo" />
        <img src={target_logo} alt="target_logo" />
        <img src={p_and_g_logo} alt="p_and_g_logo" />
        <img src={nbcuniversal_logo} alt="nbcuniversal_logo" />
      </div>
    </div>
  )
}

export default Carousel