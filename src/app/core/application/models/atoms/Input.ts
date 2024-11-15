import React from "react";

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'checkbox' | 'radio' | 'file';

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: InputType;
    placeholder?: string;
    className?: string;
    name: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    key?: string;
    disabled?: boolean;
    error?: string;
}