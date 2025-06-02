import {AirportInfo} from "./AirportInfo";
import {Airline} from "./Airline";
import {FlightInfo} from "./FlightInfo";
import {Aircraft} from "./Aircraft";
import {LiveData} from "./LiveData";

export interface Flight {
    flight_date: string;
    flight_status: string;
    departure: AirportInfo;
    arrival: AirportInfo;
    airline: Airline;
    flight: FlightInfo;
    aircraft: Aircraft;
    live: LiveData;
}