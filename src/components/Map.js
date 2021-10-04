import { useState } from 'react'
import { v4 as KeyGen } from 'uuid'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import getCenter from 'geolib/es/getCenter'
import { LocationMarkerIcon } from '@heroicons/react/solid'

function Map({ data }) {

    const [selectedLocation, setSelectedLocation] = useState({})
    const filteredLatAndLong = data.map(({ lat, long }) => ({
        longitude: long,
        latitude: lat
    }))

    const center = getCenter(filteredLatAndLong)

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude || 37.7577,
        longitude: center.longitude || -122.4376,
        zoom: 12
    })

    return (
        <ReactMapGL
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(prev => nextViewport)}
            mapStyle="mapbox://styles/well47808/ckucxls2401el17qqu5wshiwv"
            mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAP_ACCESS_TOKEN}
        >
            {
                data.map(location => (
                    <div key={KeyGen()}>
                        <Marker
                            latitude={location.lat}
                            longitude={location.long}
                            offsetLeft={-20}
                            offsetTop={-10}
                        >
                            <p
                                onClick={e => setSelectedLocation(location)}
                                className="cursor-pointer text-2xl animate-bounce text-white">
                                <LocationMarkerIcon className="h-6 " />
                            </p>


                        </Marker>

                        {selectedLocation?.long === location.long
                            && <Popup
                                className="z-50"
                                closeOnClick={true}
                                onClose={() => setSelectedLocation({})}
                                latitude={location.lat}
                                longitude={location.long}
                            >
                                {location.title}
                            </Popup>


                        }
                    </div>
                ))
            }
        </ ReactMapGL>
    )
}

export default Map
