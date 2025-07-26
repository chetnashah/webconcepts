export enum PersonGender {
    Male = 0,
    Female = 1,
    Unknown = 2
}

export interface Photo {
    Id: number;
    Name?: string;
}

export interface Person {
    UserName: string;
    FirstName: string;
    LastName: string;
    Emails?: string[];
    AddressInfo?: Location[];
    Gender?: PersonGender;
    Concurrency: number;
    Friends?: Person[];
    Trips?: Trip[];
    Photo?: Photo;
}

export interface Airline {
    AirlineCode: string;
    Name: string;
}

export interface Airport {
    IcaoCode: string;
    Name: string;
    IataCode: string;
    Location: AirportLocation;
}

export interface PlanItem {
    PlanItemId: number;
    ConfirmationCode?: string;
    StartsAt?: Date;
    EndsAt?: Date;
    Duration?: string;
}

export interface PublicTransportation extends PlanItem {
    SeatNumber?: string;
}

export interface Flight extends PublicTransportation {
    FlightNumber: string;
    From: Airport;
    To: Airport;
    Airline: Airline;
}

export interface Event extends PlanItem {
    Description?: string;
    OccursAt: EventLocation;
}

export interface Trip {
    TripId: number;
    ShareId?: string;
    Description?: string;
    Name: string;
    Budget: number;
    StartsAt: Date;
    EndsAt: Date;
    Tags: string[];
    Photos?: Photo[];
    PlanItems?: PlanItem[];
}

export interface City {
    CountryRegion: string;
    Name: string;
    Region: string;
}

export interface Location {
    Address: string;
    City: City;
}

export interface EventLocation extends Location {
    BuildingInfo?: string;
}

export interface AirportLocation extends Location {
    Loc: { latitude: number; longitude: number };
}
