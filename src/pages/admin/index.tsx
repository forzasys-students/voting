import Head from "next/head";
import { useEffect, useState } from "react";

import type { Playlist, Response } from "@/types/matchdata";

export default function Admin() {
  const [events, setEvents] = useState<Playlist[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/matchdata")
      .then((res) => res.json())
      .then((data: Response) => {
        setEvents(data.playlists);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <h3 className="text-2xl font-bold">Hendelser</h3>
      {events.map((event) => {
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
