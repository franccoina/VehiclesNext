import { Controller, FieldValues } from "react-hook-form";
import styles from "./FormFile.module.scss"
import Input from "@/ui/atoms/Input/Input";
import { IFormFileProps } from "@/app/core/application/models/molecules/FormFile";
import Label from "@/ui/atoms/Label/Label";

export const FormFile = <T extends FieldValues>({
    label,
    name,
    control,
    error,
    id,
    accept,
}: IFormFileProps<T>) => {
    return (
        <div className={styles.div}>
            <Label htmlFor={id ?? label.toLowerCase()} label={label}></Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Input
                        className={styles.input}
                        type="file"
                        id={id ?? label.toLowerCase()}
                        {...field}
                        accept={accept}
                    />
                )}
            />
            {error && <p className={styles.p}>{error.message}</p>}
        </div>
    );
};