export interface AirportInfo {
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