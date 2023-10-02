export interface RideDetails {
    formattedDate: string;
    _id: number;
    ride_id: string;
    userId: string;
    pickupCoordinates: PickupLocation;
    dropoffCoordinates: DropoffLocation;
    pickupLocation: string;
    dropoffLocation: string;
    distance: string;
    duration: string;
    model: string;
    price: number;
    status:string;
    date:number;
    feedback:string
    rating:number 
    paymentMode:string   
    ratings:number
}

interface PickupLocation {
    lat: number;
    lng: number;
}

interface DropoffLocation {
    lat: number;
    lng: number;
}


export interface DriverInterface {
    name: string;
    email: string;
    mobile: number;
    password: string;
    driverImage: string;
    referral_code: string;
    aadhar: Aadhar;
    location: Location;
    license: License;
    account_status: string;
    identification: boolean;
    vehicle_details: Vehicle;
    joiningDate: Date;
    wallet: {
        balance: number;
        transactions: {
            date: Date;
            details: string;
            amount: number;
            status: string;
        }[];
    };
    RideDetails: {
        completedRides: number;
        cancelledRides: number;
        totalEarnings: number;
    };
    isAvailable: boolean;
    feedbacks: [
        {
            feedback: string;
            rating: number;
        }
    ];
}

interface Aadhar {
    id: string;
    image: string;
}

interface License {
    id: string;
    image: string;
}

interface Location {
    longitude: number;
    latitude: number;
}

interface Vehicle {
    registerationID: string;
    model: string;
    rcImageUrl: string;
    carImageUrl: string;
}
