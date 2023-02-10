import Navbar from "./Navbar";

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      <main className="w-4/5 m-auto">{children}</main>
    </>
  );
}
