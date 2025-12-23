'use client'

import React from 'react';
import { usePathname } from "next/navigation";
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import { useUserStore } from '@/store/userStore';

function ClientLayout({ children,}: {children: React.ReactNode;}) {
    const pathname = usePathname();
    const { user } = useUserStore();
    const Layout = pathname?.startsWith(`/${user?.id}`) ? DashboardLayout : PublicLayout;

    return <Layout>{children}</Layout>
}

export default ClientLayout;