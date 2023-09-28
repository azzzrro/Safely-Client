import React, { useState } from "react";
import { AdminNavbar } from "../../../components/admin/AdminNavbar";
import { PendingDrivers } from "../../../components/admin/DriversData/PendingDrivers";
import { VerifiedDrivers } from "../../../components/admin/DriversData/VerifiedDrivers";
import BlockedDrivers from "../../../components/admin/DriversData/BlockedDrivers";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";
import "../AdminPages.scss"

export const AdminDrivers = () => {
    const [tab, settab] = useState(1);
    return (
        <>
            <AdminNavbar />
            <div className="admin-container rounded-3xl bg-gray-100 drop-shadow-xl md:mx-[8rem] mt-[2.5rem] py-8">
                <Tabs position="relative" variant="unstyled">
                    <div className="ml-5">
                        <TabList>
                            <Tab sx={{ fontSize: '24px'}} onClick={() => settab(1)}>
                                <h1 className={tab === 1 ? "font-bold" : "font-normal"}>Verified Drivers</h1>
                            </Tab>
                            <Tab sx={{ fontSize: '24px'}} onClick={() => settab(2)}>
                                <h1 className={tab === 2 ? "font-bold " : "font-normal"}>Pending Drivers</h1>
                            </Tab>
                            <Tab sx={{ fontSize: '24px'}} onClick={() => settab(3)}>
                                <h1 className={tab === 3 ? "font-bold " : "font-normal"}>Blocked Drivers</h1>
                            </Tab>
                        </TabList>
                        <TabIndicator mt="-1.5px" height="3px" bg="blue.500" borderRadius="1px" />
                    </div>
                    <TabPanels>
                        <TabPanel>
                            <VerifiedDrivers />
                        </TabPanel>
                        <TabPanel>
                            <PendingDrivers />
                        </TabPanel>
                        <TabPanel>
                            <BlockedDrivers />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </>
    );
};
