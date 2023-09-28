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
