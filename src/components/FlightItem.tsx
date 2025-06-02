'use client';

import {Flight} from "../types/Flight";
import {memo, useMemo} from "react";

function FlightItem({flight}: { flight: Flight }) {
    const depTime = useMemo(() => {
        return new Date(flight.departure.scheduled).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
        });
    }, [flight.departure.scheduled]);

    const arrTime = useMemo(() => {
        return new Date(flight.arrival.scheduled).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
        });
    }, [flight.arrival.scheduled]);

    return (
        <div
            className="list-group-item list-group-item-action"
            style={{
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            title={`${flight.airline.name} flight ${flight.flight.number}`}
            onMouseEnter={e => {
                const target = e.currentTarget;
                target.style.transform = 'scale(1.03)';
                target.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                target.style.zIndex = '1';
            }}
            onMouseLeave={e => {
                const target = e.currentTarget;
                target.style.transform = 'scale(1)';
                target.style.boxShadow = 'none';
                target.style.zIndex = 'auto';
            }}
        >
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h5>{flight.airline.name} {flight.flight.number}</h5>
                    <p className="mb-1">
                        {flight.departure.iata} ({flight.departure.airport})
                        → {flight.arrival.iata} ({flight.arrival.airport})
                    </p>
                    <p className="mb-0 text-muted">Status: {flight.flight_status}</p>
                </div>
                <div className="text-end">
                    <p className="mb-1">
                        <strong>Dep:</strong> {depTime} {flight.departure.gate ? `(Gate ${flight.departure.gate})` : ''}
                    </p>
                    <p className="mb-1">
                        <strong>Arr:</strong> {arrTime} {flight.arrival.gate ? `(Gate ${flight.arrival.gate})` : ''}
                    </p>
                    <p className="mb-0"><small>Flight Date: {flight.flight_date}</small></p>
                </div>
            </div>
        </div>
    );
};

// Memoize the component.
export default memo(FlightItem);