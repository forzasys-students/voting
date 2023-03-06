import Head from "next/head";

import type { Response } from "@/types/matchdata";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PollOption } from "@/types/poll";

const getMatchData = async () => {
  const response = await fetch("/api/matchdata");
  const data = await response.json();

  return data;
};

export default function CreatePoll() {
  const session = useSession();

  const matchData = useQuery<Response>({
    queryKey: ["matchData"],
    queryFn: getMatchData,
    initialData: { playlists: [], total: 0 },
    enabled: session.status === "authenticated",
  });

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [events, setEvents] = useState<PollOption[]>([]);

  if (session.status !== "authenticated") {
    return <h1>Logg inn</h1>;
  }

  return (
    <>
      <Head>
        <title>Admin - Lag avstemning</title>
      </Head>

      <h3 className="text-2xl font-bold ">Lag ny avstemning</h3>

      <form className="mt-3">
        <div>
          <label htmlFor="username">Tittel</label>
          <input
            id="title"
            type="title"
            className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            placeholder="Avstemning tittel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Beskrivelse</label>
          <input
            id="description"
            type="description"
            className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            placeholder="Beskrivelse av avstemning"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Hendelser</label>

          <div className="flex flex-row flex-wrap gap-2 mb-3">
            {matchData.data.playlists.map((event) => {
              return (
                <div key={event.id}>
                  <input
                    type="checkbox"
                    id={`poll-option-${event.id}`}
                    value=""
                    className="hidden peer"
                    onChange={(e) => {
                      const pollOption: PollOption = {
                        id: event.id,
                        date: event.date,
                        description: event.description,
                        video_url: event.video_url,
                        thumbnail_url: event.thumbnail_url,
                      };

                      if (e.target.checked) {
                        setEvents([...events, pollOption]);
                      } else {
                        setEvents(
                          events.filter(
                            (pollOption) => pollOption.id !== event.id
                          )
                        );
                      }
                    }}
                  />
                  <label
                    htmlFor={`poll-option-${event.id}`}
                    className="inline-flex items-center justify-between p-3 bg-white border-2 border-gray-200 rounded-lg cursor-pointer  peer-checked:bg-blue-200   hover:bg-gray-100 text-gray-70"
                  >
                    <div className="block">
                      <p className="text-sm">{event.description}</p>
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <button className="flex bg-green py-3 px-4 text-sm text-primary rounded border border-green focus:outline-none focus:border-green-dark enabled:hover:bg-blue-900 enabled:hover:text-white disabled:opacity-50">
          Lag avstemning
        </button>
      </form>

      {/* {matchData.data.playlists.map((event) => {
        return (
          <div key={event.id} className="py-2">
            <h4 className="text-1xl">{event.description}</h4>
            <p className="text-gray-400">
              {new Date(event.date).toLocaleString()}
            </p>
          </div>
        );
      })} */}
    </>
  );
}
