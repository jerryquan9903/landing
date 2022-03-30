import Head from "next/head";
import React, { useEffect, useState } from "react";
import MasonryCard from "../../components/blog/MasonryCard";

const loremipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

interface articleShort {
  title: string;
  url: string;
  date: string;
  image: string;
  author: string;
  desc: string;
}

const fakeArticles: articleShort[] = [
  {
    title: "New Young City: For Tracy Hyde's Magnum Opus",
    url: "test-article",
    date: "2022/02/08",
    image: "/pictures/carousel-test/nyc.jpg",
    author: "Random",
    desc: loremipsum
  },
  {
    title: "Bright Green Field and co.: Inside England's new post-punk scene",
    url: "test-article",
    date: "2022/02/04",
    image: "/pictures/carousel-test/squid.jpg",
    author: "Random",
    desc: loremipsum
  },
  {
    title: "Kælan Mikla to release new album in October",
    url: "test-article",
    date: "2021/10/28",
    image: "/pictures/carousel-test/mikla.jpg",
    author: "Random",
    desc: loremipsum
  },
  {
    title: "Slowdive's early days",
    url: "test-article",
    date: "2021/07/12",
    image: "/pictures/carousel-test/slowdive-old.png",
    author: "Random",
    desc: loremipsum
  },
  {
    title: "South Korea's often misunderstood indie scene",
    url: "test-article",
    date: "2021/05/24",
    image: "/pictures/carousel-test/dreamtalk.jpg",
    author: "Random",
    desc: loremipsum
  },
  {
    title: "Sweet Trip to release new album after twelve years",
    url: "test-article",
    date: "2021/02/19",
    image: "/pictures/carousel-test/sweettrip.jpg",
    author: "Random",
    desc: loremipsum
  },
];

const Blog = () => {
  const [articles, setArticles] = useState<articleShort[][]>([]);

  useEffect(() => {
    const articlesToSet: articleShort[][] = [[], [], [], []];

    for (let i = 0; i < fakeArticles.length; i++) {
      articlesToSet[i % 4].push(fakeArticles[i]);
    }

    setArticles(articlesToSet);
  }, []);

  const MasonryLayout = () => {
    return (
      <div className="grid w-full grid-cols-1 gap-6 overflow-hidden lg:grid-cols-4">
        {articles && articles[0] && articles.map((col, index) => {
          return (
            <div className="flex flex-col col-span-1" key={`col ${index}`}>
              {col.map((article, index) => {
                return <MasonryCard data={article} hasDesc slideUp key={`blogar ${index}`} />;
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex justify-center w-11/12 xl:w-2/3">
      <Head>
        <title>Manh Quan Hoang | Music</title>
        <meta name="description" content="Manh Quan Hoang | Music" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>

      <main className="w-full mt-4 lg:mt-0">
        <div className="flex items-center justify-center">
          {/* <AlbumCarousel /> */}
          <MasonryLayout />
        </div>
      </main>
    </div>
  );
};

export default Blog;
