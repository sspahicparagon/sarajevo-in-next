import { memo, useCallback, useState } from 'react';
import { google } from 'google-maps';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { GoogleMapsUrl } from '../values/GlobalValues';

interface MapConfing {
    width?: string;
    height?: string;
    lat: string | null;
    long: string | null;
    center?: { lat: number, lng: number };
}

export default memo(function Map({ width = "", height = "", lat = "30", long = "30" }: MapConfing) {

    const { isLoaded } = useJsApiLoader({
        id: 'google-maps-script',
        googleMapsApiKey: process.env.GOOGLE_MAPS_KEY ?? ""
    });
    const [center, setCenter] = useState({ lat: parseFloat(lat ?? '30'), lng: parseFloat(long ?? '30') })

    const [map, setMap] = useState<google.maps.Map<Element> | undefined | null>(null);

    const onLoad = useCallback((map: google.maps.Map<Element>) => {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map);
    }, [center]);

    const onUnmount = useCallback((map: google.maps.Map<Element>) => {
        setMap(null);
    }, [])

    const onMarkerClick = (event: google.maps.MapMouseEvent) => {
        window.open(GoogleMapsUrl(event.latLng.toUrlValue()));
    }

    return (
        <>
            {isLoaded &&
                <GoogleMap
                    center={center}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    zoom={19}
                    onLoad={onLoad}
                    mapTypeId={google?.maps?.MapTypeId?.HYBRID ?? 'hybrid'}
                    onUnmount={onUnmount}
                >
                    <MarkerF position={center} onClick={onMarkerClick}></MarkerF>
                </GoogleMap>
            }
        </>
    )
});