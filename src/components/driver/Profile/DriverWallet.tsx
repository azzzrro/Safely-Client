import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Chip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axios";
import { useSelector } from "react-redux";

const DriverWallet = () => {
    const TABLE_HEAD = ["No", "Date", "Details", "Status", "Amount"];

    const [driverData, setdriverData] = useState<null | any>({})
    const [walletTransactions, setwalletTransactions] = useState<null | any[]>([])

    const driver_id = useSelector((store: any) => store.driver.driver_id)

    useEffect(() => {
        const getData = async () => {
            const { data } = await axiosInstance.get(`/driver/driverData?driver_id=${driver_id}`)
            setdriverData(data)
            setwalletTransactions(data.wallet.transactions)
        }
        getData()
    }, [])

    return (
        <>
            <div className='bg-gray-100 w-[96%] mx-auto h-fit rounded-2xl drop-shadow-2xl md:flex'>
                <Card className="h-full - w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mt-2  flex flex-col justify-between gap-8 md:flex-row md:items-center">
                            <div className="flex w-full shrink-0 gap-2 md:w-max">
                                <div className="w-full md:w-72 px-3">
                                     <h1 className="text-2xl font-medium text-black">Wallet transactions</h1>
                                </div>
                            </div>
                            <div className="flex w-full shrink-0 gap-2 md:w-max">
                                <div className="w-full ">
                                    <button className="btn">
                                        WALLET BALANCE
                                        <div className="badge badge-lg badge-success text-white">₹{driverData?.wallet?.balance}</div>
                                    </button>
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
                                {walletTransactions?.map(
                                    (
                                        {
                                            date,
                                            details,
                                            amount,
                                            status,
                                        },
                                        index,
                                    ): any => {
                                        const isLast = index === walletTransactions?.length - 1;

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
                                                        {date}
                                                    </Typography>
                                                </td>
                                                <td className={classes + " max-w-[15rem]"}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {details}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <div className="w-fit  mx-auto">
                                                        <Chip
                                                            size="sm"
                                                            variant="ghost"
                                                            value={status}
                                                            color={
                                                                status === "Credit"
                                                                    ? "green"
                                                                    : status === "Debit"
                                                                        ? "red" : "amber"
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
                                                                ₹{amount}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>
                                                {/* <td className={classes} >
                                                <Button
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
            </div>
        </>
    )
}

export default DriverWallet