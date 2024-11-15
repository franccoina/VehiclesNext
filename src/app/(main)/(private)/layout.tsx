'use client';
import React from "react";
import { ModalProvider } from "@/ui/contexts/ModalContext";
import Modal from "@/ui/organisms/Modals/Modals";
import styles from "./vehicles-management/Vehicles.module.scss";
import { Sidebar } from "@/ui/organisms/Sidebar/SidebarUser";
import AuthGuard from "./vehicles-management/guard/AuthGuard";

const VehiclesLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ModalProvider>
            <div className={styles.vehicles}>
                <Sidebar />
                <AuthGuard>
                    {children}
                </AuthGuard>
                <Modal />
            </div>
        </ModalProvider>
    );
};

export default VehiclesLayout;
