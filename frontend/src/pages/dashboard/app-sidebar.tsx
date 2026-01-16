"use client"

import * as React from "react"
import {
  AudioWaveform,

  Command,
  Dock,
  
  GalleryVerticalEnd,
  Landmark,
  Map,
  PieChart,
  Tag,
  Users,

} from "lucide-react"

import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    firstName: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
    lastName: "ui",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],

  projects: [
    {
      name: "Products",
      url: "/dashboard/products",
      icon: Tag,
    },
    {
      name: "Orders",
      url: "/dashboard/orders",
      icon: Dock,
    },
    
    {
      name: "Deliveries",
      url: "/dashboard/deliveries",
      icon: Map,
    },
    {
      name: "Payments",
      url: "/dashboard/payments",
      icon: Landmark,
    },
        {
      name: "Users",
      url: "/dashboard/users",
      icon: Users,
    },
        {
      name: "Reports",
      url: "/dashboard/reports",
      icon: PieChart,
    }
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader >
     
                <img
                src="https://i0.wp.com/www.biocel.ie/wp-content/uploads/2021/11/Logo-Full-Colour-SigTag.png?fit=600%2C193&ssl=1"
          alt="Biocel Logo"
          className=" block my-4 ml-8 max-w-[150px]"
        />
  
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
