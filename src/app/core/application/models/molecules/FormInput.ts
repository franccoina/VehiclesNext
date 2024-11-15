import { InputType } from "../atoms/Input";
import { Control, FieldError, FieldValues, Path } from "react-hook-form";
export interface IFormInputProps<T extends FieldValues> {
    label: string;
    type: InputType;
    name: Path<T>;
    control: Control<T>;
    error?: FieldError;
    id?: string;
    placeholder?: string;
}