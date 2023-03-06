import Head from "next/head";

import type { Response } from "@/types/matchdata";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Poll } from "@prisma/client";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = async () => {
  const polls = await prisma.poll.findMany();

  // Error when parsing date, temp fix
  const test = JSON.parse(JSON.stringify(polls)) as Poll[];

  return { props: { polls: test } };
};

export default function Admin({
  polls,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const session = useSession();

  if (session.status !== "authenticated") {
    return <h1>Logg inn</h1>;
  }

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>

      <div className="flex flex-row flex-wrap gap-1 mb-2">
        <button
          className="bg-gray-200 hover:bg-gray-300 p-3"
          onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}
        >
          Logg ut
        </button>

        <Link href="/admin/avstemning">
          <button className="bg-gray-200 hover:bg-gray-300 p-3">
            Lag ny avstemning
          </button>
        </Link>
      </div>

      <h3 className="text-2xl font-bold">Avstemninger</h3>
      {polls &&
        polls.map((poll) => {
          return (
            <div key={poll.id} className="py-2">
              <h4 className="text-1xl">{poll.title}</h4>
              <p className="text-gray-400">
                {poll.description} | {new Date(poll.created).toLocaleString()}
              </p>
            </div>
          );
        })}
    </>
  );
}
