import Link from "next/link";
export default function Navbar() {
  return (
    <header className="bg-[#10253E] h-36 mb-5 static">
      <div className="right-0">
        <div>
          <Link href="/login" className="text-right mb-2 p-2 text-lg text-white hover:bg-white hover:text-black right-40 font-medium cursor-pointer absolute">Login</Link>
          <Link href="/" className="text-right mb-2 p-2 text-lg text-white hover:bg-white hover:text-black right-40 mr-16 font-medium cursor-pointer absolute">Bytt til tidligere avstemmninger</Link>
          <Link href="/poll" className="text-right mb-2 p-2 text-lg text-white hover:bg-white hover:text-black left-96 font-medium cursor-pointer absolute">Poll</Link>
        </div>
        <Link href="/overview" className="bg-sky-400 text-white font-bold py-2 px-4 border-4 text-3xl right-40 top-12 cursor-pointer absolute">ALLE AVSTEMMNINGER</Link>
      </div>
      <h1 className="pt-12 w-24 text-3xl text-black outline-white outline-8 left-40 font-semibold cursor-default absolute">EliteSerien</h1>
    </header>
  );
}
