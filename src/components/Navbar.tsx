import Link from "next/link";
export default function Navbar() {
  return (
    <header className="bg-[#10253E] h-36 mb-5">
      <div className="float-right mr-40">
        <div>
          <Link href="/poll" className="text-right mb-2 p-2 text-lg text-white hover:bg-white hover:text-black float-right font-medium cursor-pointer">Login</Link>
          <Link href="/" className="text-right mb-2 p-2 text-lg text-white hover:bg-white hover:text-black float-right font-medium cursor-pointer">Bytt til tidligere avstemmninger</Link>
          <Link href="/poll" className="text-right mb-2 p-2 text-lg text-white hover:bg-white hover:text-black float-right font-medium cursor-pointer">Poll</Link>
        </div>
        <Link href="/" className="bg-sky-400 text-white font-bold py-2 px-4 float-right border-4 text-3xl cursor-pointer">ALLE AVSTEMMNINGER</Link>
      </div>
      <h1 className="pt-12 ml-40 w-24 text-3xl text-black outline-white outline-8 font-semibold cursor-default">EliteSerien</h1>
    </header>
  );
}
