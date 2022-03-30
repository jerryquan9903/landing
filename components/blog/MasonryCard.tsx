import Link from "next/link";
import React from "react";

interface articleShort {
  title: string;
  url: string;
  date: string;
  image: string;
  author: string;
  desc: string;
}

const MasonryCard = ({
  data,
  hasDesc = false,
  isOnSideBar = false,
  slideUp = false,
}: {
  data: articleShort;
  hasDesc?: boolean;
  isOnSideBar?: boolean;
  slideUp?: boolean;
}) => {
  if (!data) return <></>;

  return (
    <div className={`box-border mb-6 cursor-pointer`}>
      <Link href="/blog/lorem-ipsum-article">
        <a>
          <img src={data.image} className={`rounded-t-xl w-full object-cover ${isOnSideBar && 'max-h-[12rem]'}`} />
          <div className="flex flex-col p-4 border-b rounded-t-none border-x border-neutral-300 rounded-b-xl">
            <div className="text-xl font-black text-neutral-800">{data.title}</div>
            {hasDesc && <div className="mt-4 font-medium line-clamp-3 text-neutral-500">{data.desc}</div>}
            <div className="mt-2 font-bold text-neutral-600 italic">
              by {data.author} – {data.date}
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default MasonryCard;