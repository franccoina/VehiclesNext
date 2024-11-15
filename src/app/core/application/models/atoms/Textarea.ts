export interface ITextareaProps {
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    name: string;
    placeholder?: string;
    className?: string;
    value?: string;
    key?:string;
    id?: string;
}