import dayjs from "dayjs";
import React, { useState } from "react";
import Projects from "../../components/portfolio/Projects";
import Timeline from "../../components/portfolio/Timeline";
import api from "../../services/api";
import { jobData, projectsData } from "../../services/commons";
import { buildKeystoneDoc } from "../../services/tools/buildKeystoneDoc";
import { processKeystoneGallery } from "../../services/tools/processKeystoneGallery";
import { query } from '.keystone/api';

const TIMELINE_QUERY = `
  id
  name
  role
  startDate,
  endDate,
  desc {
    document
  }
`

const PROJECTS_QUERY = `
  id
  name
  link
  role
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
`

const Portfolio = ({ jobs, projects }: { jobs: any, projects: any }) => {
  const [tab, setTab] = useState<number>(0);
  const [timelineData] = useState<jobData[]>(() => {
    const processedData: jobData[] = [];
    for (const work of jobs) {
      let desc = buildKeystoneDoc(work.desc.document, work.id);
      processedData.push({
        id: work.id,
        name: work.name,
        role: work.role,
        desc: desc,
        start: work.startDate,
        end: work.endDate,
      })
    }

    processedData.sort((a, b) => dayjs(b.end).diff(dayjs(a.end)));
    return processedData;
  });

  const [projectsData] = useState<projectsData[]>(() => {
    const projectsProcessed: projectsData[] = [];

    for (const project of projects) {
      projectsProcessed.push({
        id: project.id,
        name: project.name,
        link: project.link,
        role: project.role,
        images: processKeystoneGallery(project.images.document[1]),
        responsibility: buildKeystoneDoc(project.responsibility.document, project.id + " res"),
        technology: buildKeystoneDoc(project.technology.document, project.id + " tech"),
        description: buildKeystoneDoc(project.description.document, project.id + " desc")
      })
    }

    return projectsProcessed;
  })

  return (
    <div className="flex flex-col lg:grid items-start w-11/12 xl:w-2/3 grid-cols-5 gap-4 lg:mx-16">
      <div className="grid grid-cols-2 w-full h-12 font-bold lg:hidden">
        <div
          className={`col-span-1 flex justify-center items-center border-b-2 
          ${tab === 0 ? "border-emerald-700" : "border-white"}`}
          onClick={() => setTab(0)}
        >
          Timeline
        </div>
        <div
          className={`col-span-1 flex justify-center items-center border-b-2
          ${tab === 1 ? "border-emerald-700" : "border-white"}`}
          onClick={() => setTab(1)}
        >
          Projects
        </div>
      </div>
      <div className={`lg:col-span-2 ${tab !== 0 && "hidden lg:block"}`}>
        <div className="mb-4 font-bold text-2xl hidden lg:block">TIMELINE</div>
        {timelineData && <Timeline jobs={timelineData} />}
      </div>
      <div className={`flex-1 h-full col-span-3 lg:pl-8 lg:border-l border-gray-300 mx-4 lg:mx-0 ${tab !== 1 && "hidden lg:block"}`}>
        <div className="mb-4 font-bold text-2xl hidden lg:block">PROJECTS</div>
        {projectsData && <Projects projects={projectsData} />}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const jobs = await query.Workplace.findMany({
    query: TIMELINE_QUERY
  });

  const projects = await query.Project.findMany({
    query: PROJECTS_QUERY
  })

  return {
    props: {
      jobs, projects
    }
  }
}

export default Portfolio;
