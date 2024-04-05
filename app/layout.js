// import AuthProvider from "./(components)/AuthProvider";
import Footer from "./(components)/Footer";
import Nav from "./(components)/Nav";
import "./globals.css";

export const metadata = {
  title: "GastroLuxe",
  description: "Meal Planning and Recipe Discovery App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*<AuthProvider> needed for client side rendering, if used*/}
      <body>
        <Nav />
        <div>{children}</div>
        <Footer />
      </body>
      {/*</AuthProvider> needed for client side rendering, if used*/}
    </html>
  );
}
