"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result.error) {
      setErrorMessage("Invalid email or password. Please try again.");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <section id="Register Form" className="neutralBG">
      <div className="formCard">
        <h1 className="text-center">Login</h1>
        <p className="text-center">Please login to begin exploring!</p>
        {errorMessage && (
          <p className="error-message text-center mt-10">{errorMessage}</p>
        )}
        <div className="text-center mt-10">
          <form onSubmit={handleSubmit}>
            <div>
              <br />
              <label>Email:</label>
              <br />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <br />
              <label>Password:</label>
              <br />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="button">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
