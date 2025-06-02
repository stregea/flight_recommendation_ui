'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchForm from '../components/SearchForm';
import FlightList from '../components/FlightList';

export default function HomePage() {
  const [flights, setFlights] = useState([]);

  const handleSearch = async (params: { departure: string; arrival: string; date: string }) => {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (res.ok) {
      const data = await res.json();
      setFlights(data);
    } else {
      console.error('Failed to fetch flights');
      setFlights([]);
    }
  };

  return (
    <>
      <Navbar />
      <Hero />
      <div className="container my-5">
        <SearchForm onSearch={handleSearch} />
        <FlightList flights={flights} />
      </div>
    </>
  );
}
