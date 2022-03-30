import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from '@heroicons/react/solid';
import { projectsData } from '../../services/commons';

const ImageViewer = (
  { feed, index, onClose, onChange }:
    { feed: string[], index: number, onClose: () => void, onChange: (idx: number) => void }
) => {
  const next = () => {
    if (index < feed.length - 1) onChange(index + 1)
  }

  const prev = () => {
    if (index > 0) onChange(index - 1)
  }

  return (
    <>
      <div className="fixed inset-0 bg-white w-screen h-screen z-0"></div>
      <div className="fixed top-8 right-8 cursor-pointer z-10" onClick={onClose}>
        <XIcon className="w-8 h-8 text-black" />
      </div>
      <div className="fixed inset-24 bg-white flex flex-row justify-center items-center">
        <div className="cursor-pointer" onClick={prev}>
          <ChevronLeftIcon className={`"w-12 h-12 ${index <= 0 ? 'text-gray-300' : 'text-black'}`} />
        </div>
        <div className="w-full h-full object-contain flex justify-center">
          <img className="h-full image-shadow rounded-xl" src={`http://localhost:3000${feed[index]}`} />
        </div>
        <div className="cursor-pointer" onClick={next}>
          <ChevronRightIcon className={`w-12 h-12 ${index >= feed.length ? 'text-gray-300' : 'text-black'}`} />
        </div>
      </div>
    </>
  )
}

const Project = ({ data }: { data: projectsData }) => {
  const [showImage, setShowImage] = useState<{ show: boolean, index: number }>({
    show: false, index: 0
  });

  const DescLine = ({ title, lineText }: { title: string, lineText: React.ReactElement[] | string }) => {
    return (
      <div className="flex flex-col w-full" key={`${data.id} ${title}`}>
        <div className="font-bold text-lg pt-3">{title}</div>
        <ul className="border-gray-300 px-4 py-3">
          {typeof lineText === "object" && lineText.map((line, index) => (
            <li key={`${data.id} ${title} ${index}`} className="leading-7 font-medium">
              {line}
            </li>
          ))}
          {typeof lineText === "string" && <div className="leading-7 font-medium">{lineText}</div>}
        </ul>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col mb-4 lg:mb-8 overflow-hidden bg-white">
      <div
        className={`bg-emerald-700 flex justify-between rounded-t-2xl items-center w-full border-2
         border-emerald-700 px-4 py-2 text-white`}
      >
        <div className="flex flex-col">
          <div className="font-bold text-2xl">{data.name}</div>
          <a
            href={data.link}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer underline italic text-lg"
          >
            {data.link?.replace("http://", "").replace("https://", "")}
          </a>
        </div>
      </div>
      <div className={`flex-1 flex flex-col w-full rounded-b-2xl border-b-2 border-l-2 border-r-2 border-emerald-700 p-4`}>
        <div className="h-[25vh] flex justify-start -mx-2 pb-4 pt-2 overflow-x-scroll hor-scroll">
          {data.images[0] && data.images.map((url, index) => (
            <img
              className="h-full object-contain rounded-lg mx-2 image-shadow cursor-pointer"
              src={'http://localhost:3000' + url}
              key={url}
              onClick={() => setShowImage({ show: true, index: index })}
            />
          ))}
        </div>
        <div className="flex flex-col w-full mt-4 ver-scroll">
          <DescLine title="Description" lineText={data.description} />
          <DescLine title="Role" lineText={data.role} />
          <DescLine title="Responsibility" lineText={data.responsibility} />
          <DescLine title="Technologies" lineText={data.technology} />
        </div>
      </div>
      {showImage.show &&
        <ImageViewer
          feed={data.images}
          index={showImage.index}
          onClose={() => setShowImage({ ...showImage, show: false })}
          onChange={(idx) => setShowImage({ ...showImage, index: idx })}
        />
      }
    </div>
  )
}

const Projects = ({ projects }: { projects: projectsData[] }) => {
  return (
    <div className="flex flex-col justify-start w-full items-center">
      {projects && projects[0] && projects.map((project) => (
        <Project data={project} key={project.id} />
      ))}
    </div>
  );
};

export default Projects;