"use client";
import Input from "@/ui/atoms/Input/Input";
import Label from "@/ui/atoms/Label/Label";
import styles from "./FormInput.module.scss"
import { Controller, FieldValues } from "react-hook-form";
import { IFormInputProps } from "@/app/core/application/models/molecules/FormInput";

const FormInput = <T extends FieldValues>({
    label,
    type,
    name,
    control,
    error,
    id,
    placeholder,
}: IFormInputProps<T>) => {
    return (
        <div className={styles.div}>
            <Label
                htmlFor={id || label.toLowerCase()}
                label={label}
            >
            </Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Input
                        id={id || label.toLowerCase()}
                        type={type}
                        error={error?.message}
                        placeholder={placeholder || `Ingrese su ${label.toLowerCase()}`}
                        {...field}
                    />
                )}
            />
        </div>
    );
};

export default FormInput;