import Navbar from './Navbar';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="w-4/5 m-auto mb-5">{children}</main>
    </>
  );
}
