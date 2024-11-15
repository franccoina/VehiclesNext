"use client";
import React, { useState, useEffect } from "react";
import Button from "../../atoms/Button/Button";
import { useSession } from "next-auth/react";
import { useModalContext } from "@/ui/contexts/ModalContext";
import styles from "./Header.module.scss";
import { GrAddCircle } from "react-icons/gr";
import { toast } from "react-toastify";
import { LuFileSpreadsheet } from "react-icons/lu";
import FormVehicle from "../Form/vehicles/FormVehicles";
import { EndpointVehicles } from "@/app/core/application/dto";
import FormInput from "@/ui/molecules/FormInput/FormInput";
import { VehicleService } from "@/app/infrastructure";

const Header: React.FC = () => {
  const { openModal, setModalContent } = useModalContext();
  const { data: session } = useSession();
  
  // Estado para los parámetros de búsqueda del formulario
  const [searchParam, setSearchParam] = useState({
    searchPlaca: "",
    searchAnio: "",
    searchMarca: "",
    searchModelo: "",
  });

  // Cargar datos desde localStorage al montar el componente
  useEffect(() => {
    const savedSearch = JSON.parse(localStorage.getItem("vehicleSearchParams") || "{}");
    if (savedSearch) {
      setSearchParam(savedSearch);
    }
  }, []);

  // Guardar datos en localStorage cada vez que searchParam cambie
  useEffect(() => {
    localStorage.setItem("vehicleSearchParams", JSON.stringify(searchParam));
  }, [searchParam]);

  // Actualizar el estado de los parámetros de búsqueda
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParam((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Lógica para abrir el modal de formulario
  const handleModal = () => {
    setModalContent(
    <>
    </>);
    openModal();
  };

  const vehicleService = new VehicleService();

  const handleDownloadReport = async () => {
    try {
      const res = await vehicleService.findAll({ page, size: 4 });

      if (!res.ok) {
        throw new Error("Error descargando el reporte");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "reportes_vehiculos.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success("Tus vehiculos se han descargado con éxito.");
    } catch (error) {
      console.error("Error descargando los reportes", error);
      toast.error("No tienes vehiculos creados.");
    }
  };

  // Limpiar el formulario (resetear parámetros de búsqueda)
  const handleClearSearch = () => {
    setSearchParam({
      searchPlaca: "",
      searchAnio: "",
      searchMarca: "",
      searchModelo: "",
    });
  };

  // Si no hay sesión o el email del usuario no está disponible, no renderizamos nada
  if (!session || !session.user || !session.user.email) {
    return null;
  }

  // Usuario logueado
  const user = session.user;

  return (
    <div className={styles.headerContainer}>
      <form className={styles.inputsContainer}>
        <FormInput
          name="searchPlaca"
          label="Placa"
          placeholder=""
          value={searchParam.searchPlaca}
          onChange={handleChange}
        />
        <FormInput
          name="searchAnio"
          label="Año"
          placeholder=""
          value={searchParam.searchAnio}
          onChange={handleChange}
        />
        <FormInput
          name="searchMarca"
          label="Marca"
          placeholder=""
          value={searchParam.searchMarca}
          onChange={handleChange}
        />
        <FormInput
          name="searchModelo"
          label="Modelo"
          placeholder=""
          value={searchParam.searchModelo}
          onChange={handleChange}
        />
        <div className={styles.buttonGroup}>
          <Button
            className="primaryBtn"
            type="submit"
            label="Filtrar"
            icon={<GrAddCircle />}
          />
          <Button
            className="tertiaryBtn"
            type="reset"
            label="Limpiar"
            icon={<GrAddCircle />}
            onClick={handleClearSearch}
          />
        </div>
      </form>
      <div className={styles.buttonsContainer}>
        <Button
          className="primaryBtn"
          type="button"
          label="Agregar Vehiculo"
          icon={<GrAddCircle />}
          onClick={handleModal}
        />
        <Button
          className="secondaryBtn"
          type="button"
          onClick={handleDownloadReport}
          label="Descargar Reporte"
          icon={<LuFileSpreadsheet />}
        />
      </div>
    </div>
  );
};

export default Header;
