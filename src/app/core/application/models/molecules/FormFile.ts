import { Control, FieldError, FieldValues, Path } from "react-hook-form";

export interface IFormFileProps<T extends FieldValues> {
    label: string;
    name: Path<T>;
    control: Control<T>;
    error?: FieldError;
    id?: string;
    accept?: string;
}