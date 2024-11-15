import { Metadata } from "../vehicles/allVehicles-response.dto";

export interface IRecordsByVehiclesResponse {
    statusCode: number;
    message:    string;
    data:       RecordsDatum[];
    metadata:   Metadata;
}

export interface RecordsDatum {
    id: number;
    type: string;
    date: string;
    mileage: number;
    notes: string;
}

export interface IRecordsByVehiclesRequest {
    id: unknown;
    page: number;
    size: number;
}