"use client"; //client side session, needs components/AuthProvider and AuthProvider Layout Wrap.
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default AuthProvider;
