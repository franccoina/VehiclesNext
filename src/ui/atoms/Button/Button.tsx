import React from 'react';
import { IButtonProps } from '@/app/core/application/models/atoms/Button';
import styles from "./Button.module.scss"

const Button: React.FC<IButtonProps> = ({ children, className, label, type, icon, onClick }) => {
  return (
    <button className={`${styles.button} ${className}`} type={type} onClick={onClick}>
      {icon}{label}{children}
    </button>
  );
};

export default Button;