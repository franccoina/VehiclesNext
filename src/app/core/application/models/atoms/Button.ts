import React from "react";

export type ButtonType = "button" | "submit" | "reset";

export interface IButtonProps {
  type?: ButtonType;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean; 
  label?: string;
  onClick?: () => unknown;
}