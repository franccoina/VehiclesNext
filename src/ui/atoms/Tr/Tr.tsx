"use client"
import { ITrProps } from '@/app/core/application/models/atoms/Tr';
import React from 'react';

const TableDataRow: React.FC<ITrProps> = ({ children, className }) => {
  return (
    <tr className={className}>
      {children}
    </tr>
  );
};

export default TableDataRow;