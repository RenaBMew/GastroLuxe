import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div>
        Created by{" "}
        <Link href="https://github.com/RenaBMew" target="_new">
          RenaBMew
        </Link>
        with the{" "}
        <Link href="https://spoonacular.com/food-api" target="_new">
          Spoonacular API.
        </Link>
      </div>
      <Image src="/favicon.png" alt="Star Icon" width={20} height={20} />
    </footer>
  );
}
