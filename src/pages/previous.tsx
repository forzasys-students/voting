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
  const filteredPolls = polls.filter(pollEnded);

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
          Tidligere avstemninger
        </h1>

        {filteredPolls.length === 0 && (
          <p className="text-2xl">Ingen avstemninger funnet</p>
        )}

        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
          {filteredPolls.map((poll) => {
            return <PollItem key={poll.id} poll={poll} />;
          })}
        </div>
      </main>
    </>
  );
}
