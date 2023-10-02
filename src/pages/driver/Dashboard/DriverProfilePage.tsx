import { DriverNavbar } from "../../../components/driver/DriverNavbar";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";
import { useState } from "react";
import DriverInfo from "../../../components/driver/Profile/DriverInfo";
import DriverVehicleInfo from "../../../components/driver/Profile/DriverVehicleInfo";
import DriverWallet from "../../../components/driver/Profile/DriverWallet";
import DriverFeedbacks from "../../../components/driver/Profile/DriverFeedbacks";

const DriverProfilePage = () => {
    const [tab, settab] = useState(1);
    

    return (
        <>
            <DriverNavbar />
            <div className="admin-container rounded-3xl bg-teal-50 drop-shadow-xl md:mx-[8rem] mt-[2.5rem] pt-8 pb-4 mb-8">
                <Tabs position="relative" variant="unstyled">
                    <div className="md:ml-5">
                        <TabList>
                            <Tab sx={{ fontSize: "24px" }} onClick={() => settab(1)}>
                                <h1 className={tab === 1 ? "font-bold" : "font-normal"}>Profile</h1>
                            </Tab><Tab sx={{ fontSize: "24px" }} onClick={() => settab(2)}>
                                <h1 className={tab === 2 ? "font-bold " : "font-normal"}>Feedbacks</h1>
                            </Tab>
                            <Tab sx={{ fontSize: "24px" }} onClick={() => settab(3)}>
                                <h1 className={tab === 3 ? "font-bold " : "font-normal"}>Vehicle Info</h1>
                            </Tab>
                            <Tab sx={{ fontSize: "24px" }} onClick={() => settab(4)}>
                                <h1 className={tab === 4 ? "font-bold " : "font-normal"}>Wallet</h1>
                            </Tab>
                        </TabList>
                        <TabIndicator mt="-1.5px" height="3px" bg="blue.500" borderRadius="1px" />
                    </div>
                    <TabPanels>
                        <TabPanel>
                            <DriverInfo />
                        </TabPanel>
                        <TabPanel>
                            <DriverFeedbacks />
                        </TabPanel>
                        <TabPanel>
                            <DriverVehicleInfo />
                        </TabPanel>
                        <TabPanel>
                            <DriverWallet />
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </div>
        </>
    )
}

export default DriverProfilePage