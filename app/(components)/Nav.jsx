import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { RiVipCrown2Fill } from "react-icons/ri";

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <header className="bg-zinc text-white">
      <nav className="flex justify-between items-center w-full px-10 py-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <RiVipCrown2Fill
              className="text-white hover:text-white"
              size={30}
            />
          </Link>
          <Link href="/">GastroLuxe</Link>
        </div>
        <div className="flex gap-10">
          <Link href="/Discover">Discover</Link>
          <Link href="/LuxeBook">LuxeBook</Link>
          <Link href="/MealPlan">Meal Plan</Link>
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
