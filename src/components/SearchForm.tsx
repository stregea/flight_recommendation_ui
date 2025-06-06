'use client';

import { useState } from 'react';
import {SearchParams} from "../types/SearchParams";

export default function SearchForm({ onSearchAction }: { onSearchAction: (params: SearchParams) => void }) {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchAction({ departure, arrival, date });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col-md">
          <input
            type="text"
            className="form-control"
            placeholder="Departure"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          />
        </div>
        <div className="col-md">
          <input
            type="text"
            className="form-control"
            placeholder="Arrival"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
          />
        </div>
        <div className="col-md">
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-primary" type="submit">Search</button>
        </div>
      </div>
    </form>
  );
}
