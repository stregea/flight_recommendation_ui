'use client';
import { useState, useMemo } from 'react';

interface AirportInfo {
  airport: string;
  timezone: string;
  iata: string;
  icao: string;
  terminal: string | null;
  gate: string | null;
  baggage?: string | null;
  delay: number | null;
  scheduled: string;
  estimated: string | null;
  actual: string | null;
  estimated_runway?: string | null;
  actual_runway?: string | null;
}

interface Airline {
  name: string;
  iata: string;
  icao: string;
}

interface FlightInfo {
  number: string;
  iata: string;
  icao: string;
  codeshared?: any;
}

interface Aircraft {
  registration: string;
  iata: string;
  icao: string;
  icao24: string;
}

interface LiveData {
  updated: string;
  latitude: number;
  longitude: number;
  altitude: number;
  direction: number;
  speed_horizontal: number;
  speed_vertical: number;
  is_ground: boolean;
}

interface Flight {
  flight_date: string;
  flight_status: string;
  departure: AirportInfo;
  arrival: AirportInfo;
  airline: Airline;
  flight: FlightInfo;
  aircraft: Aircraft;
  live: LiveData;
}

const PAGE_SIZE = 5;

export default function FlightList({ flights }: { flights: Flight[] }) {
  const [page, setPage] = useState(1);

  const sortedFlights = useMemo(() => {
    return [...flights].sort((a, b) => b.flight_date.localeCompare(a.flight_date));
  }, [flights]);

  const totalPages = Math.ceil(sortedFlights.length / PAGE_SIZE);

  const flightsPage = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedFlights.slice(start, start + PAGE_SIZE);
  }, [sortedFlights, page]);

  if (!flights.length) {
    return <p>No flights found.</p>;
  }

  return (
      <>
        <div className="list-group">
          {flightsPage.map((flight, idx) => {
            const depTime = new Date(flight.departure.scheduled).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/New_York' });
            const arrTime = new Date(flight.arrival.scheduled).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'America/New_York' });

            return (
                <div
                    key={idx}
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
                        {flight.departure.iata} ({flight.departure.airport}) → {flight.arrival.iata} ({flight.arrival.airport})
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
          })}
        </div>

        <nav aria-label="Flight list pagination" className="mt-3">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPage(p => Math.max(p - 1, 1))} aria-label="Previous">
                &laquo; Prev
              </button>
            </li>

            {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
            ))}

            <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => setPage(p => Math.min(p + 1, totalPages))} aria-label="Next">
                Next &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </>
  );
}
