import { useSession } from "next-auth/react";
import Link from "next/link";
import { useMemo } from "react";
import Image from "next/image";

export default function Navbar() {
  const session = useSession();

  const authenticated = useMemo(
    () => session.status === "authenticated",
    [session]
  );

  return (
    <header className="bg-[#10253E] h-36 mb-5 static">
      <div className="right-0">
        <div>
          <Link
            href={authenticated ? "/admin" : "/login"}
            className="text-right mb-2 p-2 text-lg text-white hover:bg-white hover:text-black right-40 font-medium cursor-pointer absolute"
          >
            {authenticated ? "Admin" : "Logg inn"}
          </Link>
          <Link
            href="/"
            className="text-right mb-2 p-2 text-lg text-white hover:bg-white hover:text-black right-40 mr-16 font-medium cursor-pointer absolute"
          >
            Bytt til tidligere avstemmninger
          </Link>
          <Link
            href="/poll"
            className="text-right mb-2 p-2 text-lg text-white hover:bg-white hover:text-black left-96 font-medium cursor-pointer absolute"
          >
            Poll
          </Link>
        </div>
        <Link
          href="/overview"
          className="bg-sky-400 text-white font-bold py-2 px-4 border-4 text-3xl right-40 top-12 cursor-pointer absolute"
        >
          ALLE AVSTEMMNINGER
        </Link>
      </div>

      <Link href="/">
        <Image
          src="/elite-logo.svg"
          className="w-32 h-32 mr-10"
          alt="Eliteserie Logo"
          width={32}
          height={32}
        />
      </Link>
    </header>
  );
}
