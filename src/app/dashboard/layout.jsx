"use client";

import { useState } from "react";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export default function DashboardLayout({ children }) {
  // 1. Mobile-e sidebar open/close track korar jonno state declare kora holo
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <section className="flex min-h-screen bg-[#FFF9F2]">
      {/* 2. Sidebar-e 'isOpen' ebong 'setIsOpen' pass kora holo */}
      <DashboardSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Right Side */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* 3. Topbar-e mobile toggler button-er jonno 'setIsSidebarOpen' function-ti pass kora holo */}
        <DashboardTopbar setIsOpen={setIsSidebarOpen} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>

        <DashboardFooter />
      </div>
    </section>
  );
}