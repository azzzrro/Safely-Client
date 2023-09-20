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
} from "@material-tailwind/react";

const TABLE_HEAD = ["No", "Pickup", "Dropoff", "Status", "Date", ""];

const TABLE_ROWS = [
    {
        img: "/img/logos/logo-spotify.svg",
        name: "Spotify",
        amount: "$2,500",
        date: "Wed 3:00pm",
        status: "paid",
        account: "visa",
        accountNumber: "1234",
        expiry: "06/2026",
    },
];

const UserRideHistory = () => {
    return (
        <>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mt-2  flex flex-col justify-end gap-8 md:flex-row md:items-center">
                        {/* <div>
                            <Typography variant="h5" color="blue-gray">
                                Ride history
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Details about all the rides
                            </Typography>
                        </div> */}
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <div className="w-full md:w-72">
                                <Input
                                    label="Search"
                                    icon={<MagnifyingGlassIcon className="h-5 w-5" />} crossOrigin={undefined} />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-hidden px-0">
                    <table className="w-full min-w-max table-auto text-center">
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
                            {TABLE_ROWS.map(
                                (
                                    {
                                        img,
                                        name,
                                        amount,
                                        date,
                                        status,
                                        account,
                                        accountNumber,
                                        expiry,
                                    },
                                    index,
                                ) => {
                                    const isLast = index === TABLE_ROWS.length - 1;
                                    const classes = isLast
                                        ? "p-4 text-center"
                                        : "p-4 border-b border-blue-gray-50 text-center";

                                    return (
                                        <tr key={name}>
                                            <td className={classes}>
                                                <div className="flex justify-center gap-3">

                                                    <Typography
                                                    >
                                                        1
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    pickup
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    dropp
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-fit  mx-auto">
                                                    <Chip
                                                        size="sm"
                                                        variant="ghost"
                                                        value={"completed"}
                                                        color={
                                                            status === "paid"
                                                                ? "green"
                                                                : status === "pending"
                                                                    ? "amber"
                                                                    : "red"
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
                                                            {Date.now()}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>

                                            <Chip variant="ghost" value="more details" className="rounded-full mx-auto h-fit w-fit" />

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

export default UserRideHistory