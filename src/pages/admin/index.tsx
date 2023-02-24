import Head from "next/head";

import type { Response } from "@/types/matchdata";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const getMatchData = async () => {
  const response = await fetch("/api/matchdata");
  const data = await response.json();

  return data;
};

export default function Admin() {
  const session = useSession();

  const matchData = useQuery<Response>({
    queryKey: ["matchData"],
    queryFn: getMatchData,
    initialData: { playlists: [], total: 0 },
    enabled: session.status === "authenticated",
  });

  if (session.status !== "authenticated") {
    return <h1>Logg inn</h1>;
  }

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <h3 className="text-2xl font-bold">Hendelser</h3>
      {matchData.data.playlists.map((event) => {
        return (
          <div key={event.id} className="py-2">
            <h4 className="text-1xl">{event.description}</h4>
            <p className="text-gray-400">
              {new Date(event.date).toLocaleString()}
            </p>
          </div>
        );
      })}
    </>
  );
}
