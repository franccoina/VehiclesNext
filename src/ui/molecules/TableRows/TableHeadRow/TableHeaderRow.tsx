import TableDataHead from "@/ui/atoms/Th/Th";
import TableDataRow from "@/ui/atoms/Tr/Tr";
import styles from "./TableHeaderRow.module.scss"

interface ITableHeaderRowProps {
    data: string[];
}

const TableHeaderRow: React.FC<ITableHeaderRowProps> = ({data}) => {
    return (
      <thead>
        <TableDataRow className={styles.tr}>
        {data.map((column, index) => (
          <TableDataHead key={index} className={styles.th}>{column}</TableDataHead>
            ))}
        </TableDataRow>
      </thead>
    );
  };
  
  export default TableHeaderRow;