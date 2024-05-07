"use client";

import { Compass, Layout } from "lucide-react";
import { SidebarItem } from "./sidebar-tem";


const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href:'/'
        
    },
    {
        icon: Compass,
        label: "Dashboard",
        href:'/search'
        
    },
    
]
export const SidebarRoutes = () => {
    const routes = guestRoutes;

    return (
        <div>
            {
                routes.map((route) => (
                    <SidebarItem
                        key={route.href}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                ))
            }
        </div>
    )
}