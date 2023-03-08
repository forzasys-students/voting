import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import PollItem from "@/components/PollItem";
import { PollData } from "@/types/poll";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3000/api/poll");
  const data = (await response.json()) as PollData[];

  return { props: { polls: data } };
};

export default function Home({
  polls,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Eliteserien Voting</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-5xl text-black font-semibold">Aktive polls</h1>
        <br></br>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {polls &&
            polls.map((poll) => {
              return <PollItem key={poll.id} poll={poll} />;
            })}
        </div>
      </main>
    </>
  );
}
