import Navbar from "../../../components/user/Home/Navbar";
import Footer from "../../../components/user/Home/Footer";
import ProfileInfo from "../../../components/user/Home/ProfileInfo";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";
import { useState } from 'react';
import UserWalletInfo from "../../../components/user/Home/UserWalletInfo";

const Profilepage = () => {
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
                                    <h1 className={tab === 1 ? "font-bold" : "font-normal"}>Profile Info</h1>
                                </Tab>
                                <Tab sx={{ fontSize: "24px" }} onClick={() => settab(2)}>
                                    <h1 className={tab === 2 ? "font-bold " : "font-normal"}>Wallet</h1>
                                </Tab>
                            </TabList>
                            <TabIndicator mt="-1.5px" height="3px" bg="blue.500" borderRadius="1px" />
                        </div>
                        <TabPanels>
                            <TabPanel>
                                <ProfileInfo />
                            </TabPanel>
                            <TabPanel>
                                <UserWalletInfo />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profilepage;
