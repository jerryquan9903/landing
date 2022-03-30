import React, { useContext } from 'react';
import { ProjectContext } from '../../pages/portfolio';
import { PortfolioColor, Project } from '../../services/types';

const ProjectComponent = (
  { projectData, color }: { projectData: Project, color: PortfolioColor }
) => {
  const ctx: any = useContext(ProjectContext);

  const onClick = () => ctx.setDisplay({
    details: projectData,
    color: color
  })

  return (
    <div className="relative">
      <div className={`absolute h-1 top-1/2 right-full -translate-y-1/2 w-8 z-10 ${color.bgLine}`} />
      <div
        className={`flex flex-col text-black relative px-3 py-2 mt-6 z-0 rounded-md cursor-pointer border-2 
        ${ctx.display.details.id === projectData.id && "shadow-portfolio"} ${color.shadow} ${color.border} ${color.bgSub}`}
        onClick={onClick}
      >
        <div className="font-bold text-xl mb-1">{projectData.name}</div>
        <div className="font-medium italic">{projectData.short}</div>
        <div className="underline text-slate-700">
          {projectData.link?.replace("http://", "").replace("https://", "")}
        </div>
      </div>
    </div>

  );
};

export default ProjectComponent;