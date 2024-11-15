"use client";
import { IAllVehiclesResponse } from "@/app/core/application/dto";
import TableRow from "@/ui/molecules/TableRows/TableDataRow/TableDataRow";
import TableHeaderRow from "@/ui/molecules/TableRows/TableHeadRow/TableHeaderRow";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./Table.module.scss";
import { useModalContext } from "@/ui/contexts/ModalContext";
import { EndpointVehicles } from "@/app/core/application/dto";
import { VehiclesDatum } from "@/app/core/application/dto";
import { IRecordsByVehiclesResponse } from "@/app/core/application/dto";

// Tipos de propiedades
interface ITableProps {
  allData: IAllVehiclesResponse | IRecordsByVehiclesResponse;
  tableType: string;
}

const Table = ({ allData, tableType }: ITableProps) => {
  const { openModal, setModalContent } = useModalContext();
  const [selected, setSelected] = useState<VehiclesDatum | null>(null);
  const router = useRouter();

  const columns = tableType === "vehicles"
    ? ["Foto", "Marca", "Modelo", "Año", "Placa", "Acciones"]
    : ["Fecha", "Tipo", "Kilometraje", "Notas"];

  const handleEdit = (vehicle: VehiclesDatum) => {
    setSelected(vehicle);
    setModalContent(<></>);
    openModal();
  };

  const handleDetail = (id: number) => {
    router.push(`/vehicles-management/maintenance/${id}`);
  };

  const handleDelete = async (id: number) => {
    console.log("ID to delete:", id);

    const idString = id.toString();
    console.log("ID on string:", idString);

    const isConfirmed = confirm("¿Are you sure you want to delete this vehicle?");
    if (!isConfirmed) return;

    try {
      const res = await fetch(`${EndpointVehicles.DELETE_VEHICLE.replace(":id", idString)}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error deleting vehicle");
      }
      console.log("Vehicle deleted.");
      router.refresh();
    } catch (error) {
      console.log("Error deleting the vehicle", error);
    }
  };

  const renderTable = () => {
    if (tableType === "vehicles") {
      return (
        <table className={styles.table}>
          <TableHeaderRow data={columns} />
          <tbody>
            {(allData as IAllVehiclesResponse).data.map((vehicle) => (
              <TableRow
                key={vehicle.id}
                photo={vehicle.photo!}
                data={[vehicle.make, vehicle.model, vehicle.year.toString(), vehicle.licensePlate]}
                onDelete={() => handleDelete(vehicle.id)}
                onDetail={() => handleDetail(vehicle.id)}
                onEdit={() => handleEdit(vehicle)}
              />
            ))}
          </tbody>
        </table>
      );
    } else {
      return (
        <table className={styles.table}>
          <TableHeaderRow data={columns} />
          <tbody>
            {(allData as IRecordsByVehiclesResponse).data.map((record) => (
              <TableRow
                key={record.id}
                data={[record.date, record.type, record.mileage.toString(), record.notes]}
              />
            ))}
          </tbody>
        </table>
      );
    }
  };

  return renderTable();
};

export default Table;
