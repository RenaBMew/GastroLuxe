import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import React from "react";
import { redirect } from "next/navigation";

const LuxeBook = async () => {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member"); //When logging back in will be directed to member page.
  }
  return (
    <div>
      <h1>Member Server Session</h1>
      <p>{session?.user.email}</p>
      <p>{session?.user.role}</p>
    </div>
  );
};

export default LuxeBook;
