/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Z from 'zod';

import type { Response } from '@/types/matchdata';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { pollOptionSchema, pollSchema } from '../../api/poll';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Poll } from '@prisma/client';
import { PollData } from '@/types/poll';
import { InferGetServerSidePropsType } from 'next/types';

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
import { Button } from '@/components/Button';

const getMatchData = async () => {
  const response = await fetch('/api/matchdata');
  const data = await response.json();

  return data;
};

interface Context {
  query: {
    id: string;
  };
}

export const getServerSideProps = async (context: Context) => {
  const { id } = context.query;

  const parsedId = parseInt(id, 10);

  if (!parsedId) return { props: { poll: null } };

  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/poll/${id}`);

    const data = (await response.json()) as PollData;

    return { props: { poll: data } };
  } catch (error) {
    return { props: { poll: null } };
  }
};

type PollOption = Z.infer<typeof pollOptionSchema>;
type PollCreation = Z.infer<typeof pollSchema>;

export default function EditPoll({
  poll,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const session = useSession();
  const router = useRouter();

  const matchData = useQuery<Response>({
    queryKey: ['matchData'],
    queryFn: getMatchData,
    initialData: { playlists: [], total: 0 },
    enabled: session.status === 'authenticated',
  });

  const [title, setTitle] = useState<string>(poll?.title ?? '');

  const [description, setDescription] = useState<string>(
    poll?.description ?? ''
  );

  const [events] = useState<PollOption[]>(
    poll?.options.map((option) => {
      const optionObject: PollOption = {
        eventId: option.eventId,
        date: new Date(option.date).toISOString(),
        description: option.description,
        videoUrl: option.videoUrl,
        thumbnailUrl: option.thumbnailUrl,
        tournamentName: option.tournamentName || undefined,
        round: option.round || undefined,
      };

      return optionObject;
    }) || []
  );

  const [endDate, setEndDate] = useState(
    poll?.endDate ? new Date(poll.endDate) : new Date(Date.now() + 86_400_000)
  );

  const mutation = useMutation(
    () => {
      const data: PollCreation = {
        title,
        description,
        options: events,
        endDate: endDate.toISOString(),
      };

      return fetch(`/api/poll/${poll?.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    {
      onSuccess: async (response) => {
        const data = (await response.json()) as Poll;

        toast.success('Avstemning oppdatert');
        // router.push(`/poll/${data.id}`);
      },
      onError: () => {
        toast.error('Noe gikk galt');
      },
    }
  );

  const deletePoll = useMutation(
    () => {
      return fetch(`/api/poll/${poll?.id}`, {
        method: 'DELETE',
      });
    },
    {
      onSuccess: () => {
        toast.success('Avstemning slettet');
        router.push('/admin');
      },
    }
  );

  if (!poll) return <p>No poll found</p>;

  if (session.status !== 'authenticated') {
    return <h1>Logg inn</h1>;
  }

  return (
    <>
      <Head>
        <title>Admin - Rediger avstemning</title>
      </Head>

      <Link href="/admin" className="underline">
        <p className="mb-3">Gå til admin</p>
      </Link>

      <div className="flex flex-row flex-wrap gap-3 h-full">
        <Link href={`/poll/${poll.id}`}>
          <Button>Tilbake til avstemning side</Button>
        </Link>

        <Button
          className="text-red-600 bg-red-100 hover:bg-red-200"
          disabled={deletePoll.isLoading}
          onClick={() => deletePoll.mutate()}
        >
          Slett avstemning!
        </Button>
      </div>

      <h3 className="text-2xl font-bold ">Rediger avstemning</h3>

      <form className="mt-3">
        <div>
          <label htmlFor="username">Tittel</label>
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
          <label htmlFor="password">Beskrivelse</label>
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
          <label className="block">Sluttdato</label>
          <DateTimePicker onChange={setEndDate} value={endDate} />
          <small className="block text-gray-700">
            {dayjs(endDate).fromNow()}
          </small>
        </div>

        <button
          className="flex py-2 px-3 text-sm rounded border border-gray-400 focus:outline-none enabled:hover:bg-blue-900 enabled:hover:text-white disabled:opacity-50"
          onClick={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
          disabled={mutation.isLoading || !title || !description}
        >
          Oppdater avstemning
        </button>
      </form>
    </>
  );
}
