import { ISelectProps } from "@/app/core/application/models/atoms/Select";
import styles from "./Select.module.scss"

const Select: React.FC<ISelectProps> = ({
  options,
  error,
  onChange,
  className,
  name,
  ...props
}) => {
  return (
    <div className={styles.div}>
      <select
        title={name}
        className={`${styles.select} ${className}`}
        {...props}
        name={name} onChange={onChange}
      >
        <option title="disabled" value="" disabled>-- Elige una opción ---</option>
        {options.map(({ label, value }) => (
          <option title={label} key={0} value={value}>{label}</option>
        ))}
      </select>
      {error && <p className={styles.p}>{error}</p>}
    </div>
  );
};

export default Select;