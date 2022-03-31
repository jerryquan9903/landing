import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from '@heroicons/react/solid';
import { PortfolioColor, Project } from '../../services/types';

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
      <div className="fixed inset-0 bg-white w-screen h-screen z-10"></div>
      <div className="fixed top-8 right-8 cursor-pointer z-20" onClick={onClose}>
        <XIcon className="w-8 h-8 text-black" />
      </div>
      <div className="fixed inset-24 bg-white flex flex-row justify-center items-center z-20">
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

const ProjectDetails = ({ projectData, color }: { projectData: Project, color: PortfolioColor }) => {
  const [showImage, setShowImage] = useState<{ show: boolean, index: number }>({
    show: false, index: 0
  });

  const DescLine = ({ title, lineText }: { title: string, lineText: React.ReactElement[] | string }) => {
    return (
      <div className="flex flex-col w-full" key={`${projectData.id} ${title}`}>
        <div className="font-black text-md pt-2">{title.toUpperCase()}</div>
        <ul className="border-gray-300 px-4 py-2">
          {typeof lineText === "object" && lineText.map((line, index) => (
            <li key={`${projectData.id} ${title} ${index}`} className="font-regular">
              {line}
            </li>
          ))}
          {typeof lineText === "string" && <div className="">{lineText}</div>}
        </ul>
      </div>
    )
  }

  return (
    <div className="w-full ver-scroll grid grid-rows-12 mb-4 lg:mb-8">
      <div
        className={`flex flex-col ${color.bgMain} flex justify-between rounded-t-md items-start w-full border-2
         ${color.border} px-4 py-2 text-black`}
      >
        <div className="font-bold text-2xl">{projectData.name}</div>
        <a
          href={projectData.link}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer underline italic text-lg"
        >
          {projectData.link?.replace("http://", "").replace("https://", "")}
        </a>
      </div>
      <div className={`flex-1 row-span-11 flex flex-col w-full rounded-b-2xl border-b-2 border-l-2 border-r-2 ${color.border} p-4`}>
        <div className="flex justify-start h-[25vh] -mx-2 pb-4 pt-2 overflow-x-scroll hor-scroll">
          {projectData.images[0] && projectData.images.map((url, index) => (
            <img
              className="object-contain rounded-lg mx-2 image-shadow cursor-pointer"
              src={'http://localhost:3000' + url}
              key={url}
              onClick={() => setShowImage({ show: true, index: index })}
            />
          ))}
        </div>
        <div className="flex flex-col row-span-7 w-full h-[45vh] lg:h-[30vh] mt-4 ver-scroll overflow-y-scroll">
          <DescLine title="Description" lineText={projectData.description} />
          <DescLine title="Role" lineText={projectData.role} />
          <DescLine title="Responsibility" lineText={projectData.responsibility} />
          <DescLine title="Technologies" lineText={projectData.technology} />
        </div>
      </div>
      {showImage.show &&
        <ImageViewer
          feed={projectData.images}
          index={showImage.index}
          onClose={() => setShowImage({ ...showImage, show: false })}
          onChange={(idx) => setShowImage({ ...showImage, index: idx })}
        />
      }
    </div>
  )
}

export default ProjectDetails;