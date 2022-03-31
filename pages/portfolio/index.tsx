import React, { useState } from "react";
import { buildKeystoneDoc } from "../../services/tools/buildKeystoneDoc";
import { processKeystoneGallery } from "../../services/tools/processKeystoneGallery";
import { query } from '.keystone/api';
import { Job, PortfolioColor, Project } from "../../services/types";
import JobComponent from "../../components/portfolio/JobComponent";
import ProjectDetails from "../../components/portfolio/ProjectDetails";
import { XIcon } from "@heroicons/react/solid";

const TIMELINE_QUERY = `
  id
  name
  role
  startDate
  endDate
  desc {
    document
  }
  projects {
    id
    name
    link
    job {
      id
    }
    role
    short
    images {
      document
    }
    responsibility {
      document
    }
    technology {
      document
    }
    description {
      document
    }
  }
`

const colors: PortfolioColor[] = [
  {
    bgMain: "bg-rose-200",
    bgSub: "bg-rose-100",
    bgLine: "bg-rose-600",
    border: "border-rose-600",
    shadow: "shadow-rose-400"
  },
  {
    bgMain: "bg-orange-200",
    bgSub: "bg-orange-100",
    bgLine: "bg-orange-600",
    border: "border-orange-600",
    shadow: "shadow-orange-400"
  },
  {
    bgMain: "bg-green-300",
    bgSub: "bg-green-200",
    bgLine: "bg-green-700",
    border: "border-green-700",
    shadow: "shadow-green-500"
  },
]

export const ProjectContext = React.createContext({});

const Portfolio = ({ jobs }: { jobs: any }) => {
  const [portfolioData] = useState<Job[]>(() => {
    const processedJobs: Job[] = [];

    for (const job of jobs) {
      let desc = buildKeystoneDoc(job.desc.document, job.id);
      const processedProjects: Project[] = [];

      if (job.projects.length > 0) {
        for (const project of job.projects) {
          processedProjects.push({
            id: project.id,
            name: project.name,
            link: project.link,
            job: project.job.id,
            short: project.short,
            role: project.role,
            images: processKeystoneGallery(project.images.document[1]),
            responsibility: buildKeystoneDoc(project.responsibility.document, project.id + " res"),
            technology: buildKeystoneDoc(project.technology.document, project.id + " tech"),
            description: buildKeystoneDoc(project.description.document, project.id + " desc")
          })
        }
      }

      processedJobs.push({
        id: job.id,
        name: job.name,
        role: job.role,
        desc: desc,
        start: job.startDate,
        end: job.endDate,
        projects: processedProjects
      })
    }

    return processedJobs;
  })

  const [display, setDisplay] = useState<{ details: Project, color: PortfolioColor }>({
    details: portfolioData[0].projects[0],
    color: colors[0]
  })

  const [showOnMobile, setShowOnMobile] = useState<boolean>(false);

  if (!portfolioData) return <></>;

  return (
    <ProjectContext.Provider value={{
      display: display,
      setDisplay: setDisplay,
      setShowOnMobile: setShowOnMobile,
      selectColor: "bg-black"
    }}>
      <div className="flex flex-col lg:grid items-start w-11/12 grid-cols-2 gap-20 lg:mx-16 relative mt-8">
        <div className={`px-4 col-span-1 lg:max-h-[75vh] lg:overflow-y-scroll ver-scroll`}>
          {portfolioData[0] && portfolioData.map((job, index) => (
            <JobComponent key={job.id} jobData={job} index={index} color={colors[index % colors.length]} />
          ))}
        </div>
        <div className="hidden lg:block col-span-1">
          <ProjectDetails projectData={display.details} color={display.color} />
        </div>
      </div>
      {showOnMobile && (
        <div className="lg:hidden fixed inset-0 z-[10000] bg-white p-4 flex flex-col items-end">
          <div className="mb-4 cursor-pointer z-20" onClick={() => setShowOnMobile(false)}>
            <XIcon className="w-8 h-8 text-black" />
          </div>
          <ProjectDetails projectData={display.details} color={display.color} />
        </div>
      )}
    </ProjectContext.Provider>
  );
};

export const getStaticProps = async () => {
  const jobs = await query.Workplace.findMany({
    query: TIMELINE_QUERY
  });

  return {
    props: {
      jobs
    }
  }
}

export default Portfolio;
