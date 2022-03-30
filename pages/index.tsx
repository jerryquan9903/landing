import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center w-full">
      <Head>
        <title>Manh Quan Hoang</title>
        <meta name="description" content="Manh Quan Hoang's landing page" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>

      <main className="flex flex-col items-center w-11/12 xl:w-2/3">
        <div className="w-full mt-16 text-black">
          <div className="flex flex-row items-center">
            <Image src="/pictures/face.png" width={96} height={96} className="rounded-full" alt="face" />
            <div className="flex flex-col pl-4 text-black">
              <h1 className="text-2xl font-medium">Hi, I&apos;m Manh Quan Hoang.</h1>
              <h3 className="mt-2 text-lg">Front-end developer.</h3>
            </div>
          </div>
          <p className="mt-6">
            This site is just for random stuff that I made for fun. Maybe some of my blogs and thoughts here and there,
            some small projects, or other stuff.
          </p>
          <p className="mt-2">
            But I am also shameless, so I will plug my{" "}
            <Link href="/portfolio">
              <a className="text-sky-600">portfolio</a>
            </Link>{" "}
            and my{" "}
            <a
              href="https://github.com/jerryquan9903"
              target="_blank"
              className="text-sky-600"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{" "}
            on here too.
          </p>
          {/* <p className="mt-2">Oh, and please recommend me some new, exotic music. I LOVE discovering new music. :D</p> */}
        </div>
      </main>
    </div>
  );
}
