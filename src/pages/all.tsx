import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import PollItem from '@/components/PollItem';
import { PollData } from '@/types/poll';
import { InferGetServerSidePropsType } from 'next';
import { pollEnded } from '@/lib/helpers';

export const getServerSideProps = async () => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/poll`);
  const data = (await response.json()) as PollData[];

  return { props: { polls: data } };
};

export default function Home({
  polls,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const activePolls = polls.filter((poll) => !pollEnded(poll));
  const inactivePolls = polls.filter(pollEnded);

  return (
    <>
      <Head>
        <title>Eliteserien Voting</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-5xl text-black font-semibold mb-8">
          Aktive avstemninger
        </h1>

        {activePolls.length === 0 && (
          <p className="text-2xl">Ingen aktive avstemninger</p>
        )}

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {activePolls.map((poll) => {
            return <PollItem key={poll.id} poll={poll} />;
          })}
        </div>

        <h1 className="text-5xl text-black font-semibold mt-5 mb-8">
          Tidligere avstemninger
        </h1>

        {inactivePolls.length === 0 && (
          <p className="text-2xl">Ingen tidligere avstemninger</p>
        )}

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {inactivePolls.map((poll) => {
            return <PollItem key={poll.id} poll={poll} />;
          })}
        </div>
      </main>
    </>
  );
}
