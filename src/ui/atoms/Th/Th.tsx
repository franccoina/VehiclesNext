"use client"
import { IThProps } from '@/app/core/application/models/atoms/Th';
import React from 'react';

const TableDataHead: React.FC<IThProps> = ({ children, className }) => {
  return (
    <th className={className}>
      {children}
    </th>
  );
};

export default TableDataHead;