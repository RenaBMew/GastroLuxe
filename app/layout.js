// import AuthProvider from "./(components)/AuthProvider";
import Footer from "./(components)/Footer";
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
        <Footer />
      </body>
      {/*</AuthProvider> needed for client side rendering, if used*/}
    </html>
  );
}
