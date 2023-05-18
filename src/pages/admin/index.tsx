import Head from 'next/head';
import prisma from '../../lib/prisma';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Poll } from '@prisma/client';
import { InferGetServerSidePropsType } from 'next';
import { useState } from 'react';
import PollItemCard from '@/components/Admin/PollItemCard';
import { PollData } from '@/types/poll';

export const getServerSideProps = async () => {
  const polls = await prisma.poll.findMany({ orderBy: { id: 'desc' } });

  // Error when parsing date, temp fix
  const test = JSON.parse(JSON.stringify(polls)) as Poll[];

  return { props: { polls: test } };
};

export default function Admin({
  polls,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const session = useSession();

  const [search, setSearch] = useState('');

  if (session.status !== 'authenticated') {
    return (
      <p>
        Du er ikke logget inn. <Link href="/login">Gå til login side</Link>
      </p>
    );
  }

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>

      <div className="flex flex-row flex-wrap gap-1 mb-2">
        <button
          className="bg-gray-100 hover:bg-gray-200 p-3"
          onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
        >
          Logg ut
        </button>

        <Link href="/admin/create">
          <button className="bg-gray-100 hover:bg-gray-200 p-3">
            Lag ny avstemning
          </button>
        </Link>
      </div>

      <h3 className="text-2xl font-bold">Avstemninger</h3>
      {polls.length === 0 && <p className="text-md">Ingen avstemninger</p>}

      {polls && (
        <div>
          <div className="mb-3">
            <label htmlFor="password">Søk</label>
            <input
              id="search"
              type="text"
              className="w-full p-2 text-primary border outline-none text-sm transition "
              placeholder="Tittel eller beskrivelse"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="grid">
            {polls
              .filter((p) => {
                if (!search) return true;

                const value = search.trim().toLowerCase();

                return (
                  p.title.toLowerCase().includes(value) ||
                  p.description.toLowerCase().includes(value)
                );
              })
              .sort((a, b) => {
                if (!a.endDate) return -1;
                if (!b.endDate) return 1;

                if (a.endDate && b.endDate) {
                  return (
                    new Date(b.endDate).getTime() -
                    new Date(a.endDate).getTime()
                  );
                }

                return 0;
              })
              .map((poll) => {
                return (
                  <Link key={poll.id} href={`/poll/${poll.id}`}>
                    <PollItemCard poll={poll as PollData} />
                  </Link>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}
