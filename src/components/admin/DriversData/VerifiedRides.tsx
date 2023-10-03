import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Chip,
    Input,
    Button,
    Tabs,
    Tab,
    TabsHeader,
} from "@material-tailwind/react";
import axiosAdmin from '../../../services/axios/axiosAdmin'
import { RideDetails } from "../../../utils/Interfaces";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const VerifiedRides = () => {
    const { id } = useParams();

    const TABS = [
        {
            label: "All",
            value: "All",
        },
        {
            label: "Completed",
            value: "Completed",
        },
        {
            label: "Cancelled",
            value: "Cancelled",
        },
    ];

    const TABLE_HEAD = ["No", "Pickup", "Dropoff", "Status", "Date"];

    const [rideData, setrideData] = useState<null | RideDetails[]>([])

    const { adminToken } = useSelector((store: any) => store.admin)

    const getData = async () => {
        try {
            const { data } = await axiosAdmin(adminToken).get(`getDriverRides?driver_id=${id}`)
            setrideData(data) 
        } catch (error) {
            toast.error((error as Error).message)
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const [filteredRideData, setFilteredRideData] = useState<RideDetails[] | null>(rideData)
    const [filterValue, setfilterValue] = useState("All")

    useEffect(() => {
        if (filterValue === 'All') {
            setFilteredRideData(rideData);
        } else {
            const filteredData = rideData?.filter(ride => ride.status === filterValue);
            setFilteredRideData(filteredData ? filteredData : null);
        }
    }, [filterValue, rideData]);

    const [search, setSearch] = useState('');

    useEffect(() => {
        const filteredData = rideData?.filter(ride =>
            ride.pickupLocation.toLowerCase().includes(search.toLowerCase()) ||
            ride.dropoffLocation.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredRideData(filteredData ? filteredData : null);
    }, [search, rideData]);

  return (
    <>

            <Card className="h-full - w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mt-2  flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <Tabs value={filterValue} className="w-full md:w-max">
                            <TabsHeader>
                                {TABS.map(({ label, value }) => (
                                    <Tab
                                        onClick={() => setfilterValue(value)}
                                        key={value} value={value}>
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>

                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <div className="w-full md:w-72">
                                <Input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    label="Search"
                                    icon={<MagnifyingGlassIcon className="h-5 w-5" />} crossOrigin={undefined} />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="max-h-96 overflow-y-auto px-0 driver-ride-table" >
                    <table className="w-full min-w-max table-auto text-center ">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRideData?.map(
                                (
                                    {
                                        pickupLocation,
                                        dropoffLocation,
                                        status,
                                        date,
                                        ride_id
                                    },
                                    index,
                                ): any => {
                                    const isLast = index === filteredRideData?.length - 1;

                                    const classes = isLast
                                        ? "p-4 text-center"
                                        : "p-4 border-b border-blue-gray-50 text-center";

                                    return (
                                        <tr key={index}>
                                            <td className={classes + " w-2"}>
                                                <div className="flex justify-center gap-3">
                                                    <Typography
                                                    >
                                                        {index + 1}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes + " max-w-[15rem]"}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {pickupLocation}
                                                </Typography>
                                            </td>
                                            <td className={classes + " max-w-[15rem]"}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {dropoffLocation}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-fit  mx-auto">
                                                    <Chip
                                                        size="sm"
                                                        variant="ghost"
                                                        value={status}
                                                        color={
                                                            status === "Completed"
                                                                ? "green"
                                                                : status === "Pending"
                                                                    ? "cyan"
                                                                    : status === "Confirmed"
                                                                        ? "purple"
                                                                        : status === "Cancelled"
                                                                            ? "red"
                                                                            : "yellow"
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex justify-center gap-3">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal opacity-70"
                                                        >
                                                            {date}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            {/* <td className={classes} >
                                                <Button
                                                    onClick={() => dispatch(openDriverRideData(ride_id))}
                                                    size="sm" variant="text" className="rounded-full mx-auto h-fit w-fit" children={"more details"}></Button>
                                            </td> */}
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
                {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Button variant="outlined" size="sm">
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        <IconButton variant="outlined" size="sm">
                            1
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            2
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            3
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            ...
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            8
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            9
                        </IconButton>
                        <IconButton variant="text" size="sm">
                            10
                        </IconButton>
                    </div>
                    <Button variant="outlined" size="sm">
                        Next
                    </Button>
                </CardFooter> */}
            </Card>

        </>
  )
}

export default VerifiedRides