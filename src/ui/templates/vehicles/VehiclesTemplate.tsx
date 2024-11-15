"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {  IAllVehiclesResponse, Metadata } from '@/app/core/application/dto';
import styles from "./VehiclesTemplate.module.scss"
import Table from '@/ui/organisms/Table/Table';
import PageNavigation from '@/ui/molecules/Pagination/Pagination';

interface IVehiclesTemplateProps {
  pagination: Metadata,
  data: IAllVehiclesResponse
  tableType: string,
}
const VehiclesTemplate = ({ data, tableType, pagination}: IVehiclesTemplateProps) => {
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

export default VehiclesTemplate;