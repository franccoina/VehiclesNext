export interface ISelectProps  extends React.SelectHTMLAttributes<HTMLSelectElement> {
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    name: string;
    options: { value: string, label: string }[];
    className?: string;
    error?: string;
}