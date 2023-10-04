import {
    Card,
    CardHeader,
    Typography,
    CardBody,
    Chip,
    Dialog,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axiosUser from '../../../services/axios/axiosUser'
import { useSelector } from "react-redux";
import { loadStripe } from '@stripe/stripe-js';
import toast from "react-hot-toast";


const UserWalletInfo = () => {
    const TABLE_HEAD = ["No", "Date", "Details", "Status", "Amount"];

    const [userData, setuserData] = useState<null | any>({})
    const [walletTransactions, setwalletTransactions] = useState<null | any[]>([])

    const { user_id, userToken } = useSelector((store: any) => store.user)

    const getData = async () => {
        try {
            const { data } = await axiosUser(userToken).get(`userData?id=${user_id}`)
            setuserData(data)
            setwalletTransactions(data.formattedTransactions)
        } catch (error) {
            toast.error((error as Error).message)
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const [paymentModal, setpaymentModal] = useState(false)
    const [balance, setbalance] = useState("")

    const addBalance = async () => {
        try {
            const formData = new FormData
            formData.append("balance", balance)
            const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
            const { data } = await axiosUser(userToken).post("addWalletBalance", formData, { params: { user_id: user_id } })

            console.log(data, "stripe  dataaaa");

            const result = await stripe?.redirectToCheckout({
                sessionId: data.id
            });
            console.log(result, "resultttt");

            if (result?.error) {
                toast.error(result.error.message || "An error occurred during payment.");
            }
        } catch (error) {
            console.error("An error occurred:", error)
            toast.error("An error occurred. Please try again later.")
        }
    }

    return (
        <>

            <Dialog className='bg-transparent' open={paymentModal} handler={addBalance}>
                {paymentModal &&
                    <>
                        <div className='w-full h-fit rounded-lg bg-gray-50 px-8 pt-8 flex flex-col text-center'>
                            <div className='text-center'>
                                <h1 className='text-2xl font-bold text-black px-5'>
                                    Enter the amount you want to add to the wallet
                                </h1>
                            </div>
                            <div className='mt-4 text-center w-full '>
                                <input type="number" onChange={(e) => setbalance(e.target.value)} placeholder="Type here" className="input input-bordered input-success w-full max-w-xs" />
                            </div>
                            <div className='flex justify-center items-end h-fit mt-7 mb-7 gap-5'>
                                <button
                                    onClick={() => setpaymentModal(false)}
                                    className='btn'>dismiss</button>
                                <button
                                    onClick={() => addBalance()}
                                    className='btn btn-success text-white'>ADD BALANCE</button>
                            </div>
                        </div>
                    </>
                }
            </Dialog>

            <div className='bg-gray-100 w-[96%] mx-auto h-fit rounded-2xl drop-shadow-2xl md:flex'>
                <Card className="h-full - w-full">
                    <CardHeader floated={false} shadow={false} className="rounded-none">
                        <div className="mt-2  flex flex-col justify-between gap-8 md:flex-row md:items-center">
                            <div className="flex w-full shrink-0 gap-2 md:w-max">
                                <div className="w-full md:w-72 px-3">
                                    <h1 className="text-2xl font-medium text-black">Wallet transactions</h1>
                                </div>
                            </div>
                            <div className="md:flex grid md:w-fit shrink-0 gap-3 md:gap-2">
                                <div className="w-fit flex">
                                    <button className="btn">
                                        WALLET BALANCE
                                        <div className="badge badge-lg badge-success text-white">₹{userData?.wallet?.balance}</div>
                                    </button>
                                </div>
                                <div
                                    onClick={() => setpaymentModal(true)}
                                    className="w-fit flex">
                                    <button className="btn">
                                        ADD BALANCE
                                        <div className="badge badge-lg badge-success text-white">+</div>
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
                                            formattedDate,
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
                                                        {formattedDate}
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

export default UserWalletInfo