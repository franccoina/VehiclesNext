import styles from "./Label.module.scss"
import React from 'react';
import { ILabelProps } from '@/app/core/application/models/atoms/Label';

const Label: React.FC<ILabelProps> = ({ label, htmlFor, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${styles.label} ${className}`}>
      {label}
    </label>
  );
};

export default Label;