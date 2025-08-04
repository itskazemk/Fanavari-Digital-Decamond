"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (!userData) {
      router.push("/auth");
    }
  }, []);

  return <div>Welcome to the Dashboard</div>;
}
