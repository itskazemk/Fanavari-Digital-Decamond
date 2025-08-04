"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission
    if (!/^\d+$/.test(phoneNumber)) {
      setError("Please enter a valid phone number (digits only).");
      return;
    }
    setError("");

    try {
      const response = await fetch(
        "https://randomuser.me/api/?results=1&nat=us"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const json = await response.json();

      const randomUser = json?.results?.at(0);

      console.log("API response:", randomUser);
      localStorage.setItem("userData", JSON.stringify(randomUser));
      // redirect("/dashboard");
      router.push("/dashboard");
      // Add logic to handle the API response (e.g., redirect or display success)
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      console.error("Fetch error:", err);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Sign In</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="phone" className={styles.label}>
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
