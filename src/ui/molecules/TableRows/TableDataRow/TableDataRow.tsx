import TableDataCell from "@/ui/atoms/Td/Td";
import TableDataRow from "@/ui/atoms/Tr/Tr";
import ActionButtons from "../../ActionButtons/ActionButtons";
import styles from "./TableDataRow.module.scss";
import Image from "next/image";

interface ITableRowProps {
    data: string[];
    photo?: string;
    onEdit?: () => void;
    onDelete?: () => void;
    onDetail?: () => void;
}

const TableRow: React.FC<ITableRowProps> = ({ data, photo, onDetail, onEdit, onDelete }) => {
    return (
        <TableDataRow className={styles.tr}>
            {photo && (
                <TableDataCell className={styles.td}>
                    <Image src={photo} alt="Vehicle's Photo" width={50} height={50} />
                </TableDataCell>
            )}
            {data.map((value, index) => (
                <TableDataCell key={index} className={styles.td}>{value}</TableDataCell>
            ))}
            {onDetail && onEdit && onDelete && (
                <TableDataCell className={styles.td}>
                    <ActionButtons onDetail={onDetail} onEdit={onEdit} onDelete={onDelete} />
                </TableDataCell>
            )}
        </TableDataRow>
    );
}

export default TableRow;
