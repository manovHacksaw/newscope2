"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation"; // Use `next/navigation` for client-side navigation

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to log out.");
      }

      // Redirect to login page after successful logout
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handleLogout}
     
    >
      Logout
    </button>
  );
}
