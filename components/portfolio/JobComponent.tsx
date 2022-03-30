import dayjs from 'dayjs';
import React, { useContext } from 'react';
import { ProjectContext } from '../../pages/portfolio';
import { Job, PortfolioColor } from '../../services/types';
import ProjectComponent from './ProjectComponent';

const JobComponent = ({ jobData, index, color }: { jobData: Job, index: number, color: PortfolioColor }) => {
  const ctx: any = useContext(ProjectContext);

  return (
    <div className="w-full relative flex mb-8">
      <div className="relative">
        <div className="absolute top-8 left-1/2 -translate-x-1/2 rounded-full bg-gray-300 w-6 h-6 border-4 border-black" />
        <div className={`w-1 bg-black h-full ${index === 0 && 'mt-8'}`} />
      </div>
      <div className="flex flex-col">
        <div className="flex relative w-full pr-4 pl-8 mb-6">
          <div className={`absolute w-2 h-3 ${color.bgLine} top-11 -translate-y-1/2 left-6 triangle-left`} />
          <div className="flex flex-col z-10">
            <div className={`${color.bgMain} ${color.border} text-black px-3 py-2 rounded-md border-2`}>
              <div className="font-medium text-lg">
                {dayjs(jobData.start).format('MM/YYYY')} - {index > 0 ? dayjs(jobData.end).format('MM/YYYY') : "Present"}
              </div>
              <div className="text-2xl font-bold">{jobData.name}</div>
              <div className="opacity-80 text-lg">{jobData.role}</div>
            </div>
          </div>
          {jobData.projects.length > 0 && <div className={`absolute h-6 w-1 top-full left-16 ${color.bgLine}`} />}
        </div>
        <div className="flex flex-col justify-start pl-24">
          {jobData.projects[0] && jobData.projects.map((project, index) => (
              <div className="relative" key={project.id}>
                <div className={`absolute h-full w-1 ${index < jobData.projects.length - 1 ? "bottom-0" : "bottom-1/2 -mb-3"} -left-8 ${color.bgLine}`}/>
                <ProjectComponent projectData={project} color={color} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default JobComponent;