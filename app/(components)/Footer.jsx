import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full">
      <div className="bg-zinc text-oatmeal flex items-center justify-center w-full px-5 py-2 gap-1">
        &copy;2024 Created by Serena Brown using the
        <Link href="https://spoonacular.com/food-api" target="_new">
          Spoonacular API
        </Link>
        for educational purposes only.
      </div>
    </footer>
  );
}
