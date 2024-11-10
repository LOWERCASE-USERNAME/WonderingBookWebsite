import { useState } from "react";
import { Sidebar } from "../../components/navigations/sidebar";
import { cn } from "../../lib/utils";
import { Outlet } from "react-router-dom";

export function AdminPage() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={
        cn(
          "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-x-hidden",
          "h-screen w-screen" // Adjust to "h-screen" if needed for full height
        )
      }
    >
      <Sidebar open={open} setOpen={setOpen} animate={false} />
      <Outlet />
    </div>
  );
}
