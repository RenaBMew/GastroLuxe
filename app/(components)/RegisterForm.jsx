"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <section id="Register Form" className="text-center">
      <h1>Create an Account</h1>
      <p>Use the form to create an account.</p>
      <div className="flex justify-center text-center h-screen">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col items-center gap-3 w-1/2 mt-20"
        >
          <label className="font-bold">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            required={true}
            value={formData.name}
            className="w-96 p-2 border border-black rounded mb-5"
            placeholder="Name"
          />
          <label className="font-bold">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            onChange={handleChange}
            required={true}
            value={formData.email}
            className="w-96 p-2 border border-black rounded mb-5"
            placeholder="Email"
          />
          <label className="font-bold">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            required={true}
            value={formData.password}
            className="w-96 p-2 border border-black rounded mb-5"
            placeholder="Password"
          />
          <input
            type="submit"
            value="Create Account"
            className="mt-2 px-4 py-2 bg-zinc text-white rounded hover:bg-zinc-700"
          />
        </form>
        <p className="text-red-500">{errorMessage}</p>
      </div>
    </section>
  );
}
