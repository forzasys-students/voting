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
    <header className="bg-[#10253E] lg:h-36 md:h32 sm:h28 h-22 mb-5 static">
      <div className="right-0">
        <div>
          <Link
            href={authenticated ? "/admin" : "/login"}
            className="text-right mb-2 p-2 md:text-lg sm:text-base text-sm text-white hover:bg-white hover:text-black lg:right-40 md:right-24 sm:right-10 right-10 font-medium cursor-pointer absolute"
          >
            {authenticated ? "Admin" : "Logg inn"}
          </Link>
          <Link
            href="/"
            className="text-right mb-2 p-2 md:text-lg sm:text-base text-sm text-white hover:bg-white hover:text-black lg:right-40 md:right-24 sm:right-10 right-8 sm:mr-24 mr-20 font-medium cursor-pointer absolute"
          >
            Bytt til tidligere avstemmninger
          </Link>
          <Link
            href="/poll"
            className="text-right mb-2 p-2 md:text-lg sm:text-base text-sm text-white hover:bg-white hover:text-black font-medium cursor-pointer absolute"
          >
            Poll
          </Link>
        </div>
        <Link
          href="/overview"
          className="bg-sky-400 text-white font-bold sm:py-2 py-1 sm:px-4 px-2 border-4 md:text-3xl sm:text-xl lg:right-40 md:right-24 sm:right-10 right-10 sm:top-12 top-8 cursor-pointer absolute"
        >
          ALLE AVSTEMMNINGER
        </Link>
      </div>

      <Link href="/">
        <Image
          src="/elite-logo.svg"
          className="md:w-32 md:h-32 sm:w-28 sm:h-28 w-20 h-20 lg:ml-40 md:ml-24 sm:ml-10 ml-10 sm:pt-0 pt-5"
          alt="Eliteserie Logo"
          width={32}
          height={32}
        />
      </Link>
    </header>
  );
}
