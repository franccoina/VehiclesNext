import React from 'react';
import MaintenanceTemplate from '@/ui/templates/maintenance/MaintenanceTemplate';
import { RecordService, VehicleService } from '@/app/infrastructure';
import { IRecordsByVehiclesRequest } from '@/app/core/application/dto/records/history-response.dto';

interface IProps {
    params: { id: string }
    searchParams: IRecordsByVehiclesRequest
}

export const generateMetadata = async ({ searchParams }: IProps) => {
    const page = searchParams.page ?? 1;

    return {
        title: ` ${page}`,
        description: `  ${page}`,
        meta: [
            { name: 'description', content: ` ${page}` },
            { property: 'og:title', content: `  ${page}` },
            { property: 'og:description', content: `  ${page}` },
        ],
    }
}

const recordService = new RecordService();
const vehicleService = new VehicleService();

export default async function Maintenance({ params, searchParams }: IProps) {
    const { id } = params;
    const page = searchParams.page ? parseInt(searchParams.page.toString()) : 1;
    const records = await recordService.getAll({ page, size: 4, id });

    const vehicle = await vehicleService.findById({ id });

    return (
        <div>
            <MaintenanceTemplate
                tableType={"maintenance"}
                pagination={records.metadata}
                data={records}
                vehicle={vehicle}
            />
        </div>
    )
}
