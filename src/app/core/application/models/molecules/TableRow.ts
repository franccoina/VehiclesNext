export interface ITableRowProps {
    photo: string;
    licensePlate: string;
    year: number;
    model: string;
    make: string;
    onEdit: () => void;
    onDelete: () => void;
    onDetail: () => void;
}