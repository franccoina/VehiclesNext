import { IAllVehiclesRequest, IAllVehiclesResponse, IVehicleRequest, IVehicleResponse, IVehiclesResponse } from "@/app/core/application/dto";
import { HttpClient } from "../utils/client-http";

export class VehicleService  {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    async findAll({page, size}:IAllVehiclesRequest){
        try {
            const vehicles = await this.httpClient.get<IAllVehiclesResponse>(`vehicles?page=${page}&size=${size}`);
            return vehicles;
        } catch (error) {
            console.log(error);
            throw new Error("Error al obtener los vehiculos");
        }
    }

    async findById({id}:IVehicleRequest){
        try {
            const vehicles = await this.httpClient.get<IVehicleResponse>(`vehicles/${id}`);
            return vehicles;
        } catch (error) {
            console.log(error);
            throw new Error("Error al obtener los vehiculos");
        }
    }

    async create(req: FormData): Promise<IVehiclesResponse>{
        const formData = true;
        try {
            const newVehicle = await this.httpClient.post< IVehiclesResponse, FormData>(
                "vehicles",
                 req,
                formData)
            return newVehicle;
        } catch (error) {
            console.log(error);
            throw new Error("Error al crear el vehiculo");
        }
    }

    async update(id: number, req: FormData): Promise<IVehiclesResponse>{
        const formData = true;
        try {
            const updatedVehicle = await this.httpClient.patch<IVehiclesResponse, FormData>(
                `vehicles/${id}`, 
                req, 
                formData)
            return updatedVehicle;
        } catch (error) {
            console.log(error);
            throw new Error("Error al actualizar el vehiculo");
        }
    }

    async destroy(id: number){
        try {
            const vehicle = await this.httpClient.delete(`vehicles/${id}`);
            return vehicle;
        } catch (error) {
            console.log(error)
            throw new Error("Error al eliminar el vehiculo");
        }
    }

}