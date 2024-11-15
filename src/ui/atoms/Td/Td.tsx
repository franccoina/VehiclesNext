"use client"
import { ITdProps } from '@/app/core/application/models/atoms/Td';
import React from 'react';

const TableDataCell: React.FC<ITdProps> = ({ children, className }) => {
  return (
    <td className={className}>
      {children}
    </td>
  );
};

export default TableDataCell;