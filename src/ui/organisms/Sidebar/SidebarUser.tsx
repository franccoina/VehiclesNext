'use client';
import React from "react";
import Links from "@/ui/atoms/Link/Link";
import styles from "./Sidebar.module.scss";
import { signOut } from "next-auth/react";
import { LuLogOut } from "react-icons/lu";
import { AiOutlineCar } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { FaCarBurst } from "react-icons/fa6";

export const Sidebar: React.FC = () => {
    const pathname = usePathname();

    const router = useRouter();

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        console.log('Logging out');
        try {
            await signOut({ redirect: false });
            router.push('/login');
        } catch (error) {
            console.log("Error logging out", error);
        }
    };

    const clickedLink = async () => {
        console.log("You clicked on a sidebar link. Wait to be redirected.")
    };

    const navUserLinks = [
        { name: "Vehiculos", href: "/vehicles-management", icon: <AiOutlineCar />, isLogout: false },
        { name: "Cerrar Sesión", href: "/login", icon: <LuLogOut />, isLogout: true }
    ]

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.titleContainer}>
            <FaCarBurst className={styles.isotype} />
                <h1 className={styles.mainTitle}>Transport Solutions</h1>
            </div>
            <div className={styles.linksContainer}>
                {navUserLinks.map((link) => {
                    const isActive = pathname == (link.href) ? true : false;
                    const isLogout = (link.isLogout) ? handleLogout : clickedLink;

                    return (
                        <Links className={isActive ? `${styles.activeLink}` : ""} key={link.name} href={link.href} label={link.name} icon={link.icon} onClick={isLogout} />
                    )
                }
                )}
            </div>
        </div>
    );
};