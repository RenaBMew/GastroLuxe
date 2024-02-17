import AuthProvider from "./(components)/AuthProvider";
import Nav from "./(components)/Nav";
import "./globals.css";

export const metadata = {
  title: "GastroLuxe",
  description: "Generated with a Meow.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*<AuthProvider> needed for client side rendering, if used*/}
      <body className="bg-gray-100">
        <Nav />
        <div className="m-2">{children}</div>
      </body>
      {/*</AuthProvider> needed for client side rendering, if used*/}
    </html>
  );
}
