"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Metadata } from '@/app/core/application/dto';
import styles from "./MaintenanceTemplate.module.scss"
import Table from '@/ui/organisms/Table/Table';
import Image from 'next/image';
import PageNavigation from '@/ui/molecules/Pagination/Pagination';
import { IVehicleResponse } from '@/app/core/application/dto';
import { IRecordsByVehiclesResponse } from '@/app/core/application/dto/records/history-response.dto';

interface IMaintenanceTemplateProps {
  pagination: Metadata,
  data: IRecordsByVehiclesResponse,
  tableType: string,
  vehicle: IVehicleResponse
}
const MaintenanceTemplate = ({ tableType, data, pagination, vehicle}: IMaintenanceTemplateProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleNext = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString()); 
    if(nextPage <= pagination.totalPages){
      params.set('page', nextPage.toString());
      router.push(`?${params.toString()}`); 
    }
  };

  const handlePrevious = (backPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if(backPage > 0){
      params.set('page', backPage.toString());
      router.push(`?${params.toString()}`);
    }
  };

  const currentPage = pagination.currentPage;

  return (
    <div className={styles.div}>
      <div className={styles.vehicle }>
      <Image src={vehicle.data.photo} alt="Vehicle's Photo" width={50} height={50} />
        <div>Marca: {vehicle.data.make}</div>
        <div>Año: {vehicle.data.year}</div>
        <div>Placa: {vehicle.data.licensePlate}</div>
        <div>Modelo: {vehicle.data.model}</div>
      </div>
      <div className={styles.contentWrapper }>
        <Table tableType={tableType} allData={data}/>
      </div>
      <PageNavigation
        pagination={pagination}
        onNext={()=>handleNext(currentPage+1)}
        onPrevious={()=>handlePrevious(currentPage-1)}
      />
    </div>
  );
};

export default MaintenanceTemplate;