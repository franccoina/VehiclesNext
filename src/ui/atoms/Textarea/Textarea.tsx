import React from 'react';
import { ITextareaProps } from '@/app/core/application/models/atoms/Textarea';
import styles from "./Textarea.module.scss"

const Textarea: React.FC<ITextareaProps> = ({
    placeholder,
    value,
    className,
    name,
    onChange,
    id,
    key,
}) => {
    return (
        <textarea
            className={`${styles.textarea} ${className}`}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            id={id}
            key={key}
        />
    );
};

export default Textarea;