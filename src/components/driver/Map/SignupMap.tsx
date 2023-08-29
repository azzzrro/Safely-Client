import React, { useRef, useEffect, useState } from "react";
import mapboxgl, { Marker } from "mapbox-gl";
import "./SignupMap.scss";
import { toast } from "react-toastify";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const SignupMap = ({ handleGeolocation, isGeolocationActive }: any) => {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(77.5946);
    const [lat, setLat] = useState(12.9716);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (isGeolocationActive) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLng(longitude);
                        setLat(latitude);
                        setZoom(15);
                        handleGeolocation(latitude, longitude,true);
                    },
                    (error) => {
                        toast.error(error.message);
                    }
                );
            } else {
                toast.error("No location service");
            }
        }
    }, [isGeolocationActive]);

    useEffect(() => {
        // if(map.current)
        map.current = new mapboxgl.Map({
            container: mapContainer.current || "",
            style: "mapbox://styles/mapbox/streets-v12",
            center: [lng, lat],
            zoom: zoom,
        });

        map.current.on("dblclick",handleMapDoubleClick)

        const marker = new mapboxgl.Marker()
            .setLngLat([lng,lat])
            .addTo(map.current)
    }, [lng, lat, zoom]);


    const handleMapDoubleClick = (e:mapboxgl.MapMouseEvent) =>{
        const {lng,lat} = e.lngLat
        setLng(lng)
        setLat(lat)
        setZoom(15)
        handleGeolocation(lat, lng);
    }

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current || "",
            style: "mapbox://styles/mapbox/streets-v12",
            center: [lng, lat],
            zoom: zoom,
        });
    });

    return (
        <>
            <div ref={mapContainer} className="map-container" />
        </>
    );
};

export default SignupMap;
