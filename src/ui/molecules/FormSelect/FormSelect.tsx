import { Controller, FieldValues } from "react-hook-form";
import styles from "./FormSelect.module.scss"
import Select from "@/ui/atoms/Select/Select";
import { IFormSelectProps } from "@/app/core/application/models/molecules/FormSelect";
import Label from "@/ui/atoms/Label/Label";

export const FormSelect = <T extends FieldValues>({
    label,
    name,
    control,
    error,
    id,
    options,
}: IFormSelectProps<T>) => {
    return (
        <div className={styles.div}>
            <Label htmlFor={id ?? label.toLowerCase()} label={label}></Label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select
                        id={id ?? label.toLowerCase()}
                        error={error?.message}
                        options={options}
                        {...field}
                    />
                )}
            />
        </div>
    )
}