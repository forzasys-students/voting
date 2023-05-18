/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Z from 'zod';

import type { Response } from '@/types/matchdata';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { pollOptionSchema, pollSchema } from '../api/poll';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Poll } from '@prisma/client';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import nb from 'dayjs/locale/nb';

dayjs.extend(relativeTime);
dayjs.locale(nb);

// @ts-ignore
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import InfoText from '@/components/Info';

const getMatchData = async () => {
  const response = await fetch('/api/matchdata');
  const data = await response.json();

  return data;
};

type PollOption = Z.infer<typeof pollOptionSchema>;
type PollCreation = Z.infer<typeof pollSchema>;

export default function CreatePoll() {
  const session = useSession();
  const router = useRouter();

  const matchData = useQuery<Response>({
    queryKey: ['matchData'],
    queryFn: getMatchData,
    initialData: { playlists: [], total: 0 },
    enabled: session.status === 'authenticated',
  });

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [events, setEvents] = useState<PollOption[]>([]);

  const [endDate, setEndDate] = useState(new Date(Date.now() + 86_400_000));

  const mutation = useMutation(
    () => {
      const data: PollCreation = {
        title,
        description,
        options: events,
        endDate: endDate.toISOString(),
      };

      return fetch('/api/poll', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    {
      onSuccess: async (response) => {
        const data = (await response.json()) as Poll;

        toast.success('Avstemning opprettet');
        router.push(`/poll/${data.id}`);
      },
      onError: () => {
        toast.error('Noe gikk galt');
      },
    }
  );

  if (session.status !== 'authenticated') {
    return <h1>Logg inn</h1>;
  }

  return (
    <>
      <Head>
        <title>Admin - Lag avstemning</title>
      </Head>

      <Link href="/admin" className="underline">
        <p className="mb-3">Tilbake til admin</p>
      </Link>

      <h3 className="text-2xl font-bold ">Lag ny avstemning</h3>

      <button
        className="bg-gray-100 p-3 mt-3 enabled:hover:bg-gray-200 disabled:cursor-not-allowed"
        onClick={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
        disabled={
          mutation.isLoading || events.length === 0 || !title || !description
        }
      >
        Lag avstemning
      </button>

      <form className="mt-3">
        <div></div>
        <div>
          <label htmlFor="title">
            Tittel <InfoText text="Titlene på avstemningen" />
          </label>
          <input
            id="title"
            type="title"
            className="w-full p-2 text-primary border border-gray-400 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            placeholder="Avstemning tittel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">
            Beskrivelse <InfoText text="Beskrivelse på avstemning" />
          </label>
          <input
            id="description"
            type="description"
            className="w-full p-2 text-primary border border-gray-400 rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
            placeholder="Beskrivelse av avstemning"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block">
            Sluttdato <InfoText text="Dato for får avstemning skal lukkes" />
          </label>
          <DateTimePicker onChange={setEndDate} value={endDate} />
          <small className="block text-gray-700">
            {dayjs(endDate).fromNow()}
          </small>
        </div>

        <div>
          <label htmlFor="password">
            Hendelser ({events.length} valgt){' '}
            <InfoText text="Kamp hendelser og klipp som skal stemmes over" />
          </label>

          <div className="flex flex-row flex-wrap gap-3 mb-3 mt-1">
            {matchData.data.playlists.slice(0, 15).map((event) => {
              return (
                <div
                  key={event.id}
                  className="select-none"
                  style={{ width: '350px', height: '200px' }}
                >
                  <input
                    type="checkbox"
                    id={`poll-option-${event.id}`}
                    value=""
                    className="hidden peer"
                    onChange={(e) => {
                      const pollOption: PollOption = {
                        eventId: event.id,
                        date: event.date,
                        description: event.description,
                        videoUrl: event.video_url,
                        thumbnailUrl: event.thumbnail_url,
                        tournamentName: event.game.tournament_name,
                        round: event.game.round,
                      };

                      if (e.target.checked) {
                        setEvents([...events, pollOption]);
                      } else {
                        setEvents(
                          events.filter(
                            (pollOption) => pollOption.eventId !== event.id
                          )
                        );
                      }
                    }}
                  />
                  <label
                    htmlFor={`poll-option-${event.id}`}
                    className="flex bg-white rounded-md cursor-pointer border-4 peer-checked:border-blue-500 hover:bg-gray-100 text-gray-70"
                  >
                    <div className="block relative">
                      <img
                        src={event.thumbnail_url}
                        alt={event.description}
                        className="w-full brightness-50"
                        height="200"
                      />
                      <p className="text-lg absolute top-2 right-2 left-2 drop-shadow text-white font-bold">
                        {event.description}
                      </p>
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="bg-gray-100 p-3 mt-3 enabled:hover:bg-gray-200 disabled:cursor-not-allowed"
          onClick={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
          disabled={
            mutation.isLoading || events.length === 0 || !title || !description
          }
        >
          Lag avstemning
        </button>
      </form>
    </>
  );
}
