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
    Button
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axios";
import { useSelector } from "react-redux";
import { RideDetails } from "../../../utils/Interfaces";
import { useDispatch } from "react-redux";
import { openDriverRideData } from "../../../services/redux/slices/driverRideDataSlice";
import '../driverMain.scss'

const DriverRIdeHistory = () => {

    const dispatch = useDispatch()

    const TABLE_HEAD = ["No", "Pickup", "Dropoff", "Status", "Date", ""];
    const driver_id = useSelector((store: any) => store.driver.driver_id)

    const [rideData, setrideData] = useState<null | RideDetails[]>([])

    useEffect(() => {
        const getData = async () => {
            const { data } = await axiosInstance.get(`/driver/getAllrides?driver_id=${driver_id}`)
            setrideData(data)
        }
        getData()
    }, [])

    const [search, setSearch] = useState('');

    const filteredRideData = rideData?.filter((ride) =>
        ride.pickupLocation.toLowerCase().includes(search.toLowerCase()) ||
        ride.dropoffLocation.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>

            <Card className="h-full - w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mt-2  flex flex-col justify-end gap-8 md:flex-row md:items-center">
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <div className="w-full md:w-72">
                                <Input
                                    value={search}
                                    onChange={(e)=>setSearch(e.target.value)}
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
                                            <td className={classes} >
                                                <Button
                                                    onClick={() => dispatch(openDriverRideData(ride_id))}
                                                    size="sm" variant="text" className="rounded-full mx-auto h-fit w-fit" children={"more details"}></Button>
                                            </td>
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

export default DriverRIdeHistory