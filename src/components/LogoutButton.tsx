"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  const handleLogout = () => {
    signOut({ redirectTo: "/" });
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 border border-white rounded-sm hover:bg-black transition-colors duration-300"
    >
      LOGOUT
    </button>
  );
}
