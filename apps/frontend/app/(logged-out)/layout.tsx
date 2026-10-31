import NavbarLoggedOut from "@/components/app/NavbarLoggedOut";
import React from "react";

export default function LoggedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-first flex flex-col">
      <NavbarLoggedOut />
      <div className="flex-1">{children}</div>
    </div>
  );
}
