import React from 'react';
import { IInputProps } from '@/app/core/application/models/atoms/Input';
import styles from "./Input.module.scss"

const Input: React.FC<IInputProps> = ({
    type,
    placeholder,
    value,
    name,
    onChange,
    id,
    key,
    className,
    error,
    disabled = false,
    ...props
}) => {
    return (
        <div className={styles.div}>
        <input
            className={`${styles.input} ${className}`}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            id={id}
            key={key}
            disabled={disabled}
            {...props}
        />
                {error && <p className={styles.p}>{error}</p>}
                </div>
    );
};

export default Input;