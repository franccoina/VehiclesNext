"use client";
import { ErrorResponse, FieldError, ILoginRequest } from "@/app/core/application/dto";
import Button from "@/ui/atoms/Button/Button";
import FormInput from "@/ui/molecules/FormInput/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./FormLogin.module.scss";
import { toast } from "react-toastify";
import { CiLock } from "react-icons/ci";
import { AiOutlineCar } from "react-icons/ai";

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("El correo es inválido")
        .required("El correo el obligatorio"),
    password: yup
        .string()
        .min(8, "La contraseña debe tener  al menos 8  caracteres")
        .required("La contraseña es obligatoria"),
});

export const FormLogin = () => {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ILoginRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(loginSchema),
    });

    const router = useRouter()
    const handleLogin = async (data: ILoginRequest) => {
        console.log(data);
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            console.log(result);

            if (result?.error) {
                console.log("Ocurrio un error", JSON.parse(result.error));
                handleError(JSON.parse(result.error))
                return;
            }
            router.push("/vehicles-management")
            toast.success("You have logged in successfully. Welcome.")
        } catch (error) {
            console.log(error);
            toast.error("We could not log the user in. Try again.")
        }
    };

    const handleError = (error: unknown) => {
        const erroData = error as ErrorResponse;
        if (erroData && erroData.errors) {
            if (Array.isArray(erroData.errors) && "field" in erroData.errors[0]) {
                erroData.errors.forEach((fieldError) => {
                    const { field, error } = fieldError as FieldError;
                    setError(field as keyof ILoginRequest, {
                        message: error,
                    });
                });
            } else {
                if ("message" in erroData.errors[0]) {
                    setError("email", {
                        message: erroData.errors[0].message,
                    });
                }
            }
        }
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(handleLogin)}
        >
            <AiOutlineCar className={styles.isotype} />
            <h1 className={styles.logo}>Transport Solutions S.A</h1>
            <p className={styles.sub}>Inicia sesión en tu cuenta y gestiona tu flota de vehiculos</p>
            <FormInput<ILoginRequest>
                control={control}
                type="email"
                label="Correo Electrónico"
                name="email"
                error={errors.email}
                placeholder="tuempresa@dominio.com"
            />
            <FormInput<ILoginRequest>
                control={control}
                type="password"
                label="Contraseña"
                name="password"
                error={errors.password}
                placeholder="Ingresa tu contraseña"
            />
            <Button
                type="submit"
                className={"primaryBtn"}
                label="Iniciar Sesión"
                icon={<CiLock />}
            />
            <p className={styles.info}>
                ¿Problemas para iniciar sesión? Contacta al administrador del sistema
            </p>
        </form>
    );
};

export default FormLogin;