import Head from 'next/head';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Poll } from '@prisma/client';
import { InferGetServerSidePropsType } from 'next';

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
      {polls &&
        polls.map((poll) => {
          return (
            <Link key={poll.id} href={`/poll/${poll.id}`}>
              <div className="py-2 px-3 mb-2 bg-gray-100 hover:bg-gray-200">
                <div>
                  <h4 className="text-1xl">{poll.title}</h4>
                  <p className="text-gray-400">
                    {poll.description} | {new Date(poll.date).toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
    </>
  );
}
