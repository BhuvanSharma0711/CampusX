import React from 'react'
import { useState } from "react";
import { SidebarDemo } from '../sidebarexports'

function DashboardLayout({children}:{children : React.ReactNode}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        <SidebarDemo open={open} setOpen={setOpen}></SidebarDemo>
        <div className={`
          overflow-y-auto overflow-x-hidden
          transition-all duration-300
          ${open ? "ml-10" : "ml-0"}
        `}>{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout