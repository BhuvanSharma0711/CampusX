import React from 'react'
import { SidebarDemo } from '../sidebarexports'

function DashboardLayout({children}:{children : React.ReactNode}) {
  return (
    <div>
      <div className="flex overflow-x-hidden">
        <SidebarDemo></SidebarDemo>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout