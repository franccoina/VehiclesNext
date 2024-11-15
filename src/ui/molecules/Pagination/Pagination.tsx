"use client";
import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import styles from "./Pagination.module.scss";
import Button from "@/ui/atoms/Button/Button";
import { IPaginationProps } from "@/app/core/application/models/molecules/Pagination";
const Pagination = ({
  pagination,
  onNext,
  onPrevious,
}: IPaginationProps) => {
  const currentPage = pagination.currentPage;
  const totalPages = pagination.totalPages;

  // Deshabilitar botones si estamos en la primera o última página
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className={styles.container}>
      {/* Botón para ir a la página anterior */}
      <Button
        className={`${styles.button} ${isPreviousDisabled ? styles.disabled : ""}`}
        onClick={onPrevious}
        disabled={isPreviousDisabled}
      >
        <BsChevronLeft />
      </Button>

      {/* Texto para mostrar la página actual y total */}
      <span className={styles.pageText}>
        Página {currentPage} de {totalPages}
      </span>

      {/* Botón para ir a la siguiente página */}
      <Button
        className={`${styles.button} ${isNextDisabled ? styles.disabled : ""}`}
        onClick={onNext}
        disabled={isNextDisabled}
      >
        <BsChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
