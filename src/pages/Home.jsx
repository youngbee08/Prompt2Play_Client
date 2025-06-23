import React from 'react'
import Header from '../components/header'
import IntroSection from '../components/IntroSection'
import AboutSection from '../components/AboutSection'
import Carousel from '../components/carousel'

const Home = () => {
  return (
    <>
        <Header/>

        <IntroSection/>

        <Carousel/>
        
        <AboutSection/>
    </>
  )
}

export default Home