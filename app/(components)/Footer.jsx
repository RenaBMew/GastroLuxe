import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <div>
        &copy;2024 Created by Serena Brown using the{" "}
        <Link href="https://spoonacular.com/food-api" target="_new">
          Spoonacular API
        </Link>
        for educational purposes only.
      </div>
      <Image src="/favicon.png" alt="Star Icon" width={20} height={20} />
    </footer>
  );
}
