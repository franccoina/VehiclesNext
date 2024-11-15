"use client";
import React from 'react'; 
import styles from "./ActionButtons.module.scss"
import Button from '@/ui/atoms/Button/Button';
import { RiHistoryFill } from "react-icons/ri";
import { GoTrash } from "react-icons/go";
import { PiNotePencil } from "react-icons/pi";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
  onDetail: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDetail, onDelete }) => {
  return (
    <div className={styles.divButtonsContainer}>
      <Button onClick={onEdit} 
      className={"actionsBtn"}
      icon={<PiNotePencil/>}
      />
      <Button 
        onClick={onDetail} 
        className={"actionsBtn"}
        icon={<RiHistoryFill/>}
        />
      <Button 
        onClick={onDelete} 
        className={"actionsBtn"}
        icon={<GoTrash/>}
        />
    </div>
  );
};

export default ActionButtons;