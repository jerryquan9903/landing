import Head from "next/head";
import React from "react";
import Sheets from "../../components/music/Sheets";
import { query } from '.keystone/api';
import { Sheet } from "../../services/types";

const SHEETS_QUERY = `
      id
      title
      difficulty {
        name
      }
      media {
        name
        image {
          url
        }
      }
      publishDate
      artist {
        name
      }
      notes
      link {
        ref
        url
      }
`


const Music = ({ sheets }: { sheets: Sheet[] }) => {

  return (
    <div className="w-11/12 xl:w-2/3">
      <Head>
        <title>Manh Quan Hoang | Music</title>
        <meta name="description" content="Manh Quan Hoang | Music" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>

      <main className="flex flex-col items-center">
        <Sheets sheetsRaw={sheets} />
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  const sheetsRes = await query.Sheet.findMany({
    query: SHEETS_QUERY
  }) as Sheet[];

  const sheets = sheetsRes;

  return {
    props: {
      sheets
    }
  }
}

export default Music;
