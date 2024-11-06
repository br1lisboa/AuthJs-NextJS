"use client";

import { signIn } from "next-auth/react";

export function LoginButton() {
  const handleLogin = () => {
    signIn("google", { redirectTo: "/private-pages" });
  };

  return (
    <button
      onClick={handleLogin}
      className="p-2 border border-white rounded-sm hover:bg-black transition-colors duration-300"
    >
      LOGIN
    </button>
  );
}
