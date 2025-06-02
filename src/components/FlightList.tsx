'use client';
import {useState} from 'react';
import {Flight} from "../types/Flight";
import FlightItem from "./FlightItem";
import Pagination from "./Pagination";

const ITEMS_PER_PAGE = 5;

export default function FlightList({flights}: { flights: Flight[] }) {
    const [currentPage, setCurrentPage] = useState(1);

    const sortedFlights = [...flights].sort((a, b) => b.flight_date.localeCompare(a.flight_date));

    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentFlights = sortedFlights.slice(startIdx, startIdx + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(sortedFlights.length / ITEMS_PER_PAGE);

    if (!flights.length) {
        return <p>No flights found.</p>;
    }

    return (
        <>
            <div className="list-group">
                {currentFlights.map((flight, idx) => (
                    <FlightItem key={idx} flight={flight}/>
                ))}
            </div>

            {/* Add Pagination Controls */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChangeAction={setCurrentPage}/>
        </>
    );
}
