import React from "react";
import MasonryCard from "../../../components/blog/MasonryCard";

interface articleFull {
  title: string;
  date: string;
  image: string;
  author: string;
  desc: string[];
}

interface articleShort {
  title: string;
  url: string;
  date: string;
  image: string;
  author: string;
  desc: string;
}

const loremipsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const fakeArticles: articleShort[] = [
  {
    title: "New Young City: For Tracy Hyde's Magnum Opus",
    url: "test-article",
    date: "2022/02/08",
    image: "/pictures/carousel-test/nyc.jpg",
    author: "Random",
    desc: loremipsum,
  },
  {
    title: "Bright Green Field and co.: Inside England's new post-punk scene",
    url: "test-article",
    date: "2022/02/04",
    image: "/pictures/carousel-test/squid.jpg",
    author: "Random",
    desc: loremipsum,
  },
  {
    title: "Kælan Mikla to release new album in October",
    url: "test-article",
    date: "2021/10/28",
    image: "/pictures/carousel-test/mikla.jpg",
    author: "Random",
    desc: loremipsum,
  },
  {
    title: "Slowdive's early days",
    url: "test-article",
    date: "2021/07/12",
    image: "/pictures/carousel-test/slowdive-old.png",
    author: "Random",
    desc: loremipsum,
  },
  {
    title: "South Korea's often misunderstood indie scene",
    url: "test-article",
    date: "2021/05/24",
    image: "/pictures/carousel-test/dreamtalk.jpg",
    author: "Random",
    desc: loremipsum,
  },
  {
    title: "Sweet Trip to release new album after twelve years",
    url: "test-article",
    date: "2021/02/19",
    image: "/pictures/carousel-test/sweettrip.jpg",
    author: "Random",
    desc: loremipsum,
  },
];

const fakeData: articleFull = {
  title: "LOREM IPSUM CHOO CHOO",
  date: "2022/02/11",
  image: "/pictures/carousel-test/magdalena.jpg",
  author: "Tao",
  desc: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit condimentum justo quis molestie. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec commodo aliquam risus, eget luctus dui lacinia sed. Cras nec tincidunt dolor. Sed varius, dolor eget tristique sagittis, neque nulla sodales ex, nec egestas mauris mauris a nunc. Donec vitae varius risus. Nullam gravida posuere lorem, eget ultricies neque tincidunt a. Nulla ut ipsum malesuada, maximus ipsum sit amet, congue libero. ",
    "Nam luctus risus massa, sit amet consectetur nunc sollicitudin ut. Aenean ullamcorper non lectus non tristique. Aenean a dictum justo. In eu facilisis urna. Sed feugiat vestibulum dapibus. Sed finibus nisl vel nibh tempus efficitur. Vivamus at augue in erat tempus feugiat. Phasellus eget bibendum velit. Proin augue nibh, rutrum et hendrerit eget, vulputate interdum dolor. Nulla eu efficitur tortor. ",
    "Vestibulum et purus eleifend massa varius porta. Suspendisse auctor erat ipsum, et commodo ligula consequat sed. Aliquam volutpat nibh sit amet tincidunt dictum. Nullam sed odio sed risus cursus luctus. Curabitur ultricies nisl vitae nulla faucibus, non vestibulum nunc varius. Vivamus porta tortor id porttitor faucibus. Fusce condimentum in libero lobortis volutpat. Curabitur neque risus, vulputate nec porta quis, fringilla commodo nunc. Etiam eros neque, aliquet a ultricies nec, finibus sodales quam. ",
    "Pellentesque nec tellus sit amet elit pharetra interdum ut ac lacus. Etiam faucibus gravida varius. Suspendisse mollis enim vel diam lacinia gravida. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque tempor posuere elementum. Nunc faucibus justo feugiat, suscipit felis a, ullamcorper nulla. Nam orci felis, venenatis in viverra quis, elementum vulputate dui. Ut vestibulum scelerisque hendrerit. Aenean commodo feugiat posuere. Donec porta consectetur rhoncus. Proin non tellus ac lacus dignissim eleifend eu in lacus. Etiam gravida felis sit amet metus sodales elementum. Pellentesque elementum tempor ex eget venenatis. Fusce vulputate eleifend nulla, in mattis urna lobortis eget. Sed dignissim venenatis risus vel faucibus. ",
    "Praesent sit amet purus quis nunc condimentum malesuada. Morbi pretium pharetra dui. Suspendisse nec porttitor arcu, vitae iaculis neque. Nunc commodo sit amet metus vitae posuere. Nam elementum accumsan nunc suscipit scelerisque. Sed consequat finibus risus, pulvinar bibendum mauris porttitor nec. Etiam sit amet blandit ipsum. Sed condimentum sodales ligula, non pretium erat volutpat non. Mauris facilisis, est eu vehicula lacinia, nisi lacus pellentesque libero, non luctus nunc sem vitae magna. Suspendisse pharetra, sapien in ultricies lobortis, justo felis placerat purus, sit amet cursus tortor magna ut lacus. Vivamus blandit, neque non posuere condimentum, neque magna semper leo, ac imperdiet dui turpis eu tellus. Praesent consectetur neque non justo porttitor laoreet. In tincidunt placerat semper. Phasellus volutpat blandit purus, hendrerit mollis nibh condimentum ac. Sed risus ante, porttitor at consectetur a, sagittis vitae eros. Aliquam a elit ligula. ",
  ],
};

const Article = () => {
  return (
    <div className="flex flex-col lg:grid w-11/12 xl:w-2/3 mt-4 lg:mt-0 grid-cols-4 gap-8">
      <div className="col-span-3 text-left">
        <h1 className="text-4xl font-black leading-[3rem] mb-4">{fakeData.title}</h1>
        <img src={fakeData.image} alt="article image" className="w-full object-cover rounded-xl max-h-[40vh]" />
        <h3 className="text-xl font-medium text-neutral-500 leading-[2rem] mt-4 mb-2">
          by {fakeData.author} – {fakeData.date}
        </h3>
        <div className="text-xl font-medium leading-9 text-justify">
          {fakeData.desc.map((paragraph, index) => (
            <p className="mb-4" key={`paragraph ${index}`}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="col-span-1">
        <h2 className="text-2xl text-center font-bold leading-[3rem] mb-4">OTHER POSTS</h2>
        {fakeArticles && fakeArticles.slice(0, 5).map((article, index) => (
          <MasonryCard data={article} isOnSideBar key={`article ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default Article;
