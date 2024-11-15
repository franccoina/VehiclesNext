import { IContentModalProps } from "@/app/core/application/models/molecules/ModalContent";
import styles from "./ModalContent.module.scss";

const ModalContent: React.FC<IContentModalProps> = ({children, className}) => {
    return (
        <div className={`${styles.modalContent} ${className}`}>
            {children}
        </div>
    );
};

export default ModalContent;