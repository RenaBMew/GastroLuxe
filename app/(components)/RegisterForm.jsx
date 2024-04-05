"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);

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
      setAccountCreated(true);
      setTimeout(() => {
        setAccountCreated(false);
        router.refresh();
        router.push("/");
      }, 100000);
    }
  };

  return (
    <section id="Register Form" className="neutralBG">
      <div className="formCard">
        <h1 className="text-center">Create an Account</h1>
        <p className="text-center">Let's Get Cookin'!</p>
        <div className="text-center mt-10">
          {accountCreated && (
            <div className="flex justify-center">
              <div className="bg-green-200 p-4 w-1/2 mb-4">
                <p className="text-green-800">
                  Your account was created successfully!
                </p>
                <p>Please login to continue.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} method="post">
            <label>Name</label>
            <br />
            <input
              id="name"
              name="name"
              type="text"
              onChange={handleChange}
              required={true}
              value={formData.name}
              placeholder="Name"
            />
            <br />
            <label>Email</label>
            <br />
            <input
              id="email"
              name="email"
              type="text"
              onChange={handleChange}
              required={true}
              value={formData.email}
              placeholder="Email"
            />
            <br />
            <label>Password</label>
            <br />
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              required={true}
              value={formData.password}
              placeholder="Password"
            />
            <br />
            <input
              type="submit"
              value="Create Account"
              style={{ cursor: "pointer" }}
              className="submit"
            />
          </form>
          <p className="text-red-500">{errorMessage}</p>
        </div>
      </div>
    </section>
  );
}
