export interface IAllVehiclesResponse {
    statusCode: number;
    message:    string;
    data:       VehiclesDatum[];
    metadata:   Metadata;
}

export interface VehiclesDatum {
    id:           number;
    make:         string;
    model:        string;
    year:         number;
    licensePlate: string;
    photo:        null | string;
}

export interface Metadata {
    totalItems:   number;
    itemCount:    number;
    itemsPerPage: number;
    totalPages:   number;
    currentPage:  number;
}

export interface IAllVehiclesRequest {
    page: number;
    size: number;
}

//

export interface IVehicleResponse {
    statusCode: number;
    message:    string;
    data:       VehiclesDatum;
    metadata:   Metadata;
}

export interface VehiclesDatum {
    id:           number;
    make:         string;
    model:        string;
    year:         number;
    licensePlate: string;
    photo:        null | string;
}

export interface IVehicleRequest {
    id: unknown;
}