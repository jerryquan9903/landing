import dayjs from "dayjs";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import Dropdown from "../Dropdown";
import { Sheet } from "../../services/types";

const STARS = new Array(10).fill("").map((_, index) => {
  return `star${index}`;
});

const STAR_COLORS = {
  veryEasy: "#0E7490",
  easy: "#15803d",
  medium: "#CA8A04",
  hard: "#C2410C",
  veryHard: "#b91c1c"
}

interface SheetProps {
  title: string,
  artists: string,
  media: string,
  image?: string,
  difficulty: number,
  link: string,
  date: string,
  notes?: string,
}

const SORT_OPTIONS = ["Date: Newest first", "Date: Oldest first", "Difficulty: High to Low", "Difficulty: Low to High"]

const Sheets = ({ sheetsRaw }: { sheetsRaw: Sheet[] }) => {
  const hardVideo: string = "https://www.youtube.com/watch?v=Kt_JePg86b8";
  const [sheets, setSheets] = useState<SheetProps[]>([]);
  const [sortedSheets, setSortedSheets] = useState<SheetProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sort, setSort] = useState<string>(SORT_OPTIONS[0])

  useEffect(() => {
    const _sheets = [];

    for (const sheet of sheetsRaw) {
      const artists = sheet.artist.map((ar: any) => ar.name);
      const fullSheet: SheetProps = {
        title: sheet.title,
        artists: artists.reduce((a: any, b: any) => {
          return `${a}, ${b}`
        }),
        media: sheet.media.name,
        image: sheet.media.image?.url || "",
        difficulty: sheet.difficulty.name,
        link: 'http://localhost:3000' + sheet.link.url,
        date: sheet.publishDate,
        notes: sheet.notes && sheet.notes
      }
      _sheets.push(fullSheet)
    }

    _sheets.sort((a, b) => dayjs(b.date).diff(dayjs(a.date), "months"))

    setSheets(_sheets)
    setSortedSheets(_sheets)
  }, []);

  const filterSearch = ({ title, artists, media }: { title: string, artists: string, media: string }) => {
    const fullString = title + " " + artists + " " + media;
    return fullString.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
  };

  const sortSheets = (val: string, index: number) => {
    if (val === sort) return;

    const _sheets = [...sheets];

    switch (index) {
      case 0:
        _sheets.sort((a, b) => dayjs(b.date).diff(dayjs(a.date), "months"))
        break;
      case 1:
        _sheets.sort((a, b) => dayjs(a.date).diff(dayjs(b.date), "months"));
        break;
      case 2:
        _sheets.sort((a, b) => b.difficulty - a.difficulty)
        break;
      case 3:
        _sheets.sort((a, b) => a.difficulty - b.difficulty)
        break;
    }

    setSortedSheets(_sheets);
    setSort(SORT_OPTIONS[index])
  }

  return (
    <>
      <Head>
        <title>Manh Quan Hoang | Music</title>
        <meta name="description" content="Manh Quan Hoang | Music" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <h3 className="mt-8 text-xl font-bold text-black">Arrangements</h3>
        <div className="w-full lg:w-4/5 text-black">
          <div className="mt-2 font-medium">
            I play piano (and a few other music instruments) for fun. Sometimes I arrange songs for piano, mostly game
            soundtracks (especially JRPGs). These arrangements can range from easy stuff to songs as hard as
            <a href={hardVideo} className="text-sky-600" target="_blank" rel="noreferrer noopener">
              {" "}
              this one
            </a>.
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-start md:items-center p-4 bg-neutral-100 rounded-md ">
            <div className="border border-neutral-300 bg-white rounded-md w-full md:w-1/2 h-10 flex justify-between items-center px-3 mb-2 lg:mb-0">
              <input
                className="flex-1 h-full outline-none font-medium pr-3"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="#737373">
                <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" />
              </svg>
            </div>
            <Dropdown
              className="flex justify-between items-center w-full lg:w-56 font-semibold text-neutral-600 text-sm border border-neutral-300 bg-white rounded-md h-10 px-3"
              text={sort}
              values={SORT_OPTIONS}
              onChange={(val, index) => sortSheets(val, index)}
            />
          </div>
          <div className="bg-neutral-100 mt-4 rounded-md">
            <div className="hidden md:grid grid-cols-12 gap-2 p-4 mt-2">
              <div className="col-span-2"></div>
              <div className="col-span-4 lg:col-span-5 font-bold">Info</div>
              <div className="col-span-4 font-bold">Difficulty</div>
              <div className="col-span-2 lg:col-span-1 font-bold">Date</div>
            </div>
            <div className="flex flex-col flex-1 overflow-y-scroll hide-scroll">
              {sortedSheets[0] && sortedSheets.filter(filterSearch).map((sheet: SheetProps, index: number) => (
                <div
                  key={`${sheet.title} ${sheet.artists} ${sheet.media}`}
                  className={`flex flex-col items-start md:grid md:grid-cols-12 md:items-center gap-2 py-4 mx-4 border-neutral-300 
                  ${index === 0 ? "md:border-t" : "border-t"} 
                  `}
                >
                  <div className="hidden md:flex col-span-2 justify-center items-center">
                    {sheet.image &&
                      <img
                        src={`http://localhost:3000${sheet.image}`}
                        alt={sheet.media}
                        className="h-16 w-16 object-cover rounded-full"
                      />
                    }
                  </div>
                  <div className="col-span-4 lg:col-span-5 flex flex-col justify-center text-gray-900">
                    <div className="text-xl font-bold flex items-center">
                      <a
                        href={sheet.link}
                        download={sheet.artists + " - " + sheet.title + ".pdf"}
                        className="flex justify-center items-center cursor-pointer text-sky-700"
                      >
                        {sheet.title}
                      </a>
                      {sheet.notes && (
                        <div className="hidden lg:block relative">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-1.5 sheet-note" viewBox="0 0 24 24" fill="#737373">
                            <path d="M12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm1-6h-2v-8h2v8zm-1-12.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25z" />
                          </svg>
                          <div className="note-popup p-2 bg-white border rounded-md shadow-md hidden z-50 text-sm font-medium w-72">
                            {sheet.notes}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-base font-bold">
                      {sheet.artists}
                    </div>
                    <div className="italic font-medium text-neutral-500">{sheet.media}</div>
                  </div>
                  <div className="col-span-4 flex flex-row items-center -mx-0.5">
                    {STARS.map((star, index) => {
                      let color: string;

                      if (sheet.difficulty < 3) color = STAR_COLORS.veryEasy;
                      else if (sheet.difficulty < 5) color = STAR_COLORS.easy;
                      else if (sheet.difficulty < 7) color = STAR_COLORS.medium;
                      else if (sheet.difficulty < 9) color = STAR_COLORS.hard;
                      else color = STAR_COLORS.veryHard;

                      if (index < sheet.difficulty)
                        return (
                          <svg key={star} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-0.5" viewBox="0 0 24 24" fill={color}>
                            <path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z" />
                          </svg>
                        )
                    })}
                  </div>
                  <div className="col-span-2 lg:col-span-1 flex w-full items-center font-medium">
                    {dayjs(sheet.date).format('YYYY/MM')}
                  </div>
                  {/* <a
                    href={sheet.link}
                    download={sheet.artists + " - " + sheet.title + ".pdf"}
                    className="hidden col-span-1 lg:flex justify-center items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-0.5" viewBox="0 0 24 24" fill="#0369a1">
                      <path d="M15.003 3h2.997v5h-2.997v-5zm8.997 1v20h-24v-24h20l4 4zm-19 5h14v-7h-14v7zm16 4h-18v9h18v-9z" />
                    </svg>
                  </a> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Sheets;
