import { HttpClient } from "../utils/client-http";
import { IRecordsByVehiclesRequest, IRecordsByVehiclesResponse } from "@/app/core/application/dto";

export class RecordService  {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient();
    }

    async getAll({page, size, id}:IRecordsByVehiclesRequest){
        try {
            const vehicles = await this.httpClient.get<IRecordsByVehiclesResponse>(`vehicles/${id}/maintenance?page=${page}&size=${size}`);
            return vehicles;
        } catch (error) {
            console.log(error);
            throw new Error("Error al obtener los registros");
        }
    }

}