import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Image from "next/image";

const Nav = async () => {
  const session = await getServerSession(options);
  return (
    <header>
      <nav>
        <Link href="/">
          <Image
            src="/gastroluxe.icon.png"
            alt="GastroLuxe Logo"
            width={60}
            height={60}
            className="gastrologo"
          />
        </Link>
        <div>
          {session ? (
            <>
              <Link href="/Discover">Discover</Link>
              <Link href="/LuxeBook">LuxeBook</Link>
              <Link href="/MealPlan">Meal Plan</Link>
              {/*<Link href="/ClientMember">Client</Link>*/}
              <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
            </>
          ) : (
            <>
              <Link href="/Login">Login</Link> {/* "api/auth/signin" */}
              <Link href="/Register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
