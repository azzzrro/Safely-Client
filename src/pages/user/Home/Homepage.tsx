import Navbar from '../../../components/user/Home/Navbar'
import HeroSection from '../../../components/user/Home/HeroSection'
import Ride from '../../../components/user/Home/Ride'
import WhySafely from '../../../components/user/Home/WhySafely'
import Footer from '../../../components/user/Home/Footer'
import '../../../components/user/Home/Home.scss'
import { useSelector } from 'react-redux'
import DriverSearching from '../../../components/DriverSearching'

export const Homepage = () => {
  const { isOpen } = useSelector((store: any) => store.driverSearch)
  return (
    <>
      {isOpen && <DriverSearching />}
      <Navbar />
      <HeroSection />
      <Ride />
      <WhySafely />
      <Footer />
    </>
  )
}
