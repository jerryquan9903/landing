import Link from "next/link";
import React, { useEffect, useState } from "react";

const AlbumCarousel = () => {
  const [topIndex, setTopIndex] = useState<number>(0);
  const [imgClasses, setImgClasses] = useState<string[]>([]);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  const images: string[] = [
    "/pictures/carousel-test/bloodmoon.jpg",
    "/pictures/carousel-test/magdalena.jpg",
    "/pictures/carousel-test/bgf.jpg",
    "/pictures/carousel-test/mikla.jpg",
    "/pictures/carousel-test/slowdive.jpg",
    "/pictures/carousel-test/sweettrip.jpg",
    "/pictures/carousel-test/nyc.jpg",
    "/pictures/carousel-test/dreamtalk.jpg",
  ];

  useEffect(() => {
    const classes = images.map((img, index) => {
      switch (index) {
        case 0:
          return "center";
        case 1:
          return "fourth middle";
        case images.length - 1:
          return "second middle";
        case 2:
          return "fifth far";
        case images.length - 2:
          return "first far";
        default:
          return "disappear hide";
      }
    });
    setImgClasses(classes);
  }, []);

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const moveOneLeft = (classes: string[]): string[] => {
    let _classes = [...classes];
    _classes.push(_classes.shift() || "disappear");

    const result = _classes.map((item) => {
      let _item = item.replace(" move-left", "").replace(" move-right", "");
      return _item + " " + "move-left";
    });

    return result;
  };

  const moveOneRight = (classes: string[]): string[] => {
    let _classes = [...classes];
    _classes.unshift(_classes.pop() || "disappear");

    const result = _classes.map((item) => {
      let _item = item.replace(" move-left", "").replace(" move-right", "");
      return _item + " " + "move-right";
    });

    return result;
  };

  const rotateLeft = async () => {
    if (imgClasses.length === 0) return;
    setIsRotating(true);

    const classes = moveOneLeft(imgClasses);
    setTopIndex(topIndex === 0 ? imgClasses.length - 1 : topIndex - 1);
    setImgClasses(classes);

    await sleep(500);
    setIsRotating(false);
  };

  const rotateRight = async () => {
    if (imgClasses.length === 0) return;
    setIsRotating(true);

    const classes = moveOneRight(imgClasses);
    setTopIndex(topIndex === imgClasses.length - 1 ? 0 : topIndex + 1);
    setImgClasses(classes);

    await sleep(500);
    setIsRotating(false);
  };

  const handleClick = async (index: number) => {
    const diff = index - topIndex;

    if (diff === 0) {
    } else {
      let classes = [...imgClasses];
      for (let i = 0; i < Math.abs(diff); i++) {
        if (diff < 0) {
          classes = moveOneLeft(classes);
        } else {
          classes = moveOneRight(classes);
        }
      }
      setTopIndex(index);
      setImgClasses(classes);

      await sleep(500);
      setIsRotating(false);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center">
      <button
        className="flex items-center h-full mr-6 cursor-pointer select-none left-button"
        disabled={isRotating}
        onClick={rotateLeft}
      >
        <span className="material-icons">chevron_left</span>
      </button>
      <div className="w-[50vw] flex justify-center items-center">
        <div className="h-64 carousel w-96">
          {images.map((img, index) => {
            const url = img.split("/").pop()?.replace(".jpg", "");
            const isCenter = imgClasses[index] === "center";

            return (
              <div
                key={img}
                className={`${imgClasses[index]} flex justify-center items-center cursor-pointer`}
                onClick={() => {
                  if (!isCenter) handleClick(index);
                }}
              >
                {isCenter ? (
                  <Link href={`/blog/${url}`}>
                    <a key={img}>
                      <img src={img} alt="some img" className="object-cover h-64 rounded-lg w-96" />
                    </a>
                  </Link>
                ) : (
                  <img src={img} alt="some img" className="object-cover h-64 rounded-lg w-96" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="flex items-center h-full ml-6 cursor-pointer select-none right-button"
        disabled={isRotating}
        onClick={rotateRight}
      >
        <span className="material-icons">chevron_right</span>
      </button>
    </div>
  );
};

export default AlbumCarousel;
