"use client";
import { VehiclesDatum, ErrorResponse, FieldError, IVehicleRequest } from "@/app/core/application/dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { IVehiclesRequest } from "@/app/core/application/dto";
import { FormFile } from "@/ui/molecules/FormFile/FormFile";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./FormVehicles.module.scss"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/ui/atoms/Button/Button";
import FormInput from "@/ui/molecules/FormInput/FormInput";

interface IVehiclesFormProps {
    initialData?: IVehiclesRequest | null;
}

const initialVehiclesData = {
    make: "",
    model: "",
    year: 0,
    licensePlate: "",
    file: ""
};

const vehiclesSchema = yup.object().shape({
    make: yup.string().required("La marca es obligatoria"),
    model: yup.string().required("El modelo es obligatorio"),
    year: yup.number().required("El año es obligatorio"),
    licensePlate: yup.string().required("La placa es obligatoria"),
    file: yup.string()
});

const FormVehicle: React.FC<IVehiclesFormProps> = ({ initialData }) => {
    const {
        control,
        handleSubmit,
        setError,
        setValue,
        reset,
        formState: { errors },
    } = useForm<IVehicleRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(vehiclesSchema),
        defaultValues: initialVehiclesData,
    });

    const router = useRouter();
    useEffect(() => {
        if (initialData) {
            setValue("make", initialData.make);
            setValue("model", initialData.model);
            setValue("year", initialData.year);
            setValue("licensePlate", initialData.licensePlate);
            setValue("file", initialData.file);
        }
    }, [initialData, setValue]);

    const handleCreateVehicle = async (data: IVehiclesRequest) => {
        try {
            const res = await fetch(EndpointVehicles.CREATE_VEHICLE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                throw new Error("Error creando el vehiculo");
            }
            const createdVehicle = await res.json();
            reset(initialVehiclesData);
            router.refresh();

            console.log("Vehiculo creado", createdVehicle);
        } catch (error) {
            console.error("Error creando vehiculo", error);
            handleError(error);
        }
    };

    const handleUpdateVehicle = async (data: IVehiclesRequest) => {
        const licensePlate = (initialData?.licensePlate);
        if (!licensePlate) {
            throw new Error("Vehiculo no encontrado o sin Placa");
        }

        try {
            const res = await fetch(EndpointVehicles.UPDATE_VEHICLE.replace(":licensePlate", licensePlate), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                throw new Error("Error actualizando vehiculo");
            }
            const updatedVehicle = await res.json();
            router.refresh();
            console.log("Vehiculo actualizado", updatedVehicle);
        } catch (error) {
            console.error("Error actualizando vehiculo", error);
            handleError(error);
        }
    };

    const handleError = (error: unknown) => {
        const errorData = error as ErrorResponse;
        if (errorData && errorData.errors) {
            if (Array.isArray(errorData.errors) && "field" in errorData.errors[0]) {
                errorData.errors.forEach((fieldError) => {
                    const { field, error } = fieldError as FieldError;
                    setError(field as keyof IVehiclesRequest, {
                        message: error,
                    });
                });
            } else {
                if ("message" in errorData.errors[0]) {
                    setError("title", {
                        message: errorData.errors[0].message,
                    });
                }
            }
        }
    };

    const onSubmit = async (data: IVehiclesRequest) => {
        if (initialData) {
            handleUpdateVehicle(data);
        } else {
            handleCreateVehicle(data);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h1 className={styles.h1}>{initialData ? "Editar Vehiculo" : "Agregar Vehiculo"}</h1>

            <FormInput<IVehicleRequest>
                control={control}
                type="text"
                label="Marca"
                name="make"
                error={errors.make}
            />

            <FormInput<IVehicleRequest>
                control={control}
                type="text"
                label="Modelo"
                name="model"
                error={errors.model}
            />

            <FormInput<IVehicleRequest>
                control={control}
                type="number"
                label="Año"
                name="year"
                error={errors.year}
            />

            <FormInput<IVehicleRequest>
                control={control}
                type="text"
                label="Placa"
                name="licensePlate"
                error={errors.licensePlate}
            />

            <FormFile<IVehicleRequest>
                control={control}
                name="file"
                label="Foto del Vehiculo"
                error={errors.file}
            />

            <Button
                type="submit"
                className={"secondaryBtn"}
            >
                {initialData ? "Actualizar" : "Agregar"}
            </Button>
        </form>
    );
};

export default FormVehicle;