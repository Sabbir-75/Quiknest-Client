import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import './Coverage.css'
import Container from '../../Components/Container/Container';
import { IoSearch } from "react-icons/io5";


const Coverage = () => {
    const districtData = useLoaderData()

    function PanToMarker({ position }) {
        const map = useMap();
        useMemo(() => {
            if (position) {
                map.flyTo(position, 12, { duration: 1.5 });
            }
        }, [position, map]);
        return (
            <Circle
                center={position}
                radius={8000}
                pathOptions={{
                    color: "#3B82F6", 
                    fillColor: "#93C5FD",  
                    fillOpacity: 0.4,
                }}
            />
        );
    }
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPosition, setSelectedPosition] = useState(null);

    const markers = useMemo(() => districtData.map(d => ({

        id: d.district,
        position: [d.latitude, d.longitude],
        name: d.district,
        city: d.covered_area

    })), [districtData]);

    const handleSearch = () => {
        const found = markers.find(m =>
            m.name.toLowerCase() === searchTerm.trim().toLowerCase()
        );
        if (found) {
            setSelectedPosition(found.position);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "District not found!",
            });
        }
    };

    return (
        <Container>
            <div className="bg-base-100 my-3 md:my-6 lg:my-8 rounded-3xl py-8 md:py-16 lg:py-22 px-4 md:px-12 lg:px-20">
                <h1 className="text-6xl font-extrabold text-base-content mb-3 md:mb-6 lg:mb-10">
                    We are available in 64 districts
                </h1>
                <div className="flex items-center mb-6 md:mb-12 lg:mb-20">
                    <div className="flex items-center w-full max-w-md bg-gray-100 rounded-l-full px-4 py-2 shadow-sm">
                        <IoSearch className="text-2xl text-black mr-3" />
                        <input
                            type="text"
                            className="bg-transparent focus:outline-none w-full text-base-300 placeholder-base-300"
                            placeholder="Search district..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        className="bg-primary text-primary-content font-semibold px-4 py-[8px] rounded-r-full shadow-sm"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                <p className="mb-6 text-3xl text-base-content font-extrabold">
                    We deliver almost all over Bangladesh. We are available in 64 districts.
                </p>

                <MapContainer
                    center={[23.8, 90.4]}
                    zoom={7}
                    style={{ height: "600px", width: "100%" }}
                >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {markers.map(m => (
                        <Marker key={m.id} position={m.position}>
                            <Popup>
                                <strong>{m.name}</strong><br />
                                <div className='flex'>
                                    {
                                        m.city.map(data => <h1>{data},</h1>)
                                    }
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                    {selectedPosition && <PanToMarker position={selectedPosition} />}
                </MapContainer>
            </div>
        </Container>

    );
}

export default Coverage;
