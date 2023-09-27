import Navbar from '../../../components/user/Home/Navbar'
import UserCurrentRide from '../../../components/user/Home/UserCurrentRide'
import Footer from '../../../components/user/Home/Footer'
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";
import { useState } from 'react';
import UserRideHistory from '../../../components/user/Home/UserRideHistory';
import { useSelector } from "react-redux";
import UserRideDetails from '../../../components/user/Home/UserRideDetails';

const CurrentRidePage = () => {
    const { isOpenUserRideData, ride_id } = useSelector((store: any) => store.userRideData);

    const [tab, settab] = useState(1);

    return (
        <>
            <Navbar />
            <div className='rounded-3xl bg-gray-100 drop-shadow-xl md:w-[91%] mx-auto mt-5 pt-7 pb-4 mb-8'>
                <div className='ml-5'>
                    <Tabs position="relative" variant="unstyled">
                        <div className="ml-5">
                            <TabList>
                                <Tab sx={{ fontSize: "24px" }} onClick={() => settab(1)}>
                                    <h1 className={tab === 1 ? "font-bold" : "font-normal"}>Current Ride</h1>
                                </Tab>
                                <Tab sx={{ fontSize: "24px" }} onClick={() => settab(2)}>
                                    <h1 className={tab === 2 ? "font-bold " : "font-normal"}>Rides History</h1>
                                </Tab>
                            </TabList>
                            <TabIndicator mt="-1.5px" height="3px" bg="blue.500" borderRadius="1px" />
                        </div>
                        <TabPanels>
                            <TabPanel>
                                <UserCurrentRide />
                            </TabPanel>
                            <TabPanel>
                                {isOpenUserRideData ? <UserRideDetails ride_id={ride_id} /> :
                                    <UserRideHistory />}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CurrentRidePage