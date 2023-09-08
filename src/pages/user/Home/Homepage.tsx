import React from 'react'
import { Home } from '../../../components/user/Home/Home'
import Navbar from '../../../components/user/Home/Navbar'
import HeroSection from '../../../components/user/Home/HeroSection'
import Ride from '../../../components/user/Home/Ride'
import WhySafely from '../../../components/user/Home/WhySafely'
import Footer from '../../../components/user/Home/Footer'
import '../../../components/user/Home/Home.scss'

export const Homepage = () => {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <Ride/>
    <WhySafely/>
    <Footer/>
    </>
  )
}
