import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <header className="bg-gray-600 text-gray-100">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div>My Site</div>
        <div className="flex gap-10">
          <Link href="/">Home</Link>
          <Link href="/Discover">Discover</Link>
          <Link href="/LuxeBook">LuxeBook</Link>
          {/*<Link href="/ClientMember">Client</Link>*/}
          {session ? (
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
          ) : (
            <>
              <Link href="/api/auth/signin">Login</Link>
              <Link href="/Register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
