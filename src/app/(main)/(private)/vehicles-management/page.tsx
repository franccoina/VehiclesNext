import { IAllVehiclesRequest } from '@/app/core/application/dto';
import React from 'react';
import styles from './Vehicles.module.scss';
import VehiclesTemplate from '@/ui/templates/vehicles/VehiclesTemplate';
import { VehicleService } from '@/app/infrastructure';

interface IProps {
    searchParams: IAllVehiclesRequest
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

const vehicleService = new VehicleService();

export default async function Vehicles({ searchParams }: IProps) {
    const page = searchParams.page ? parseInt(searchParams.page.toString()) : 1;
    const data = await vehicleService.findAll({ page, size: 4 });

    return (
        <div className={styles.vehiclesContent}>
            <VehiclesTemplate data={data} tableType={"vehicles"} pagination={data.metadata} />
        </div>
    )
}
