import React from "react";
import Line from "./Line";
import Popup from "./Popup";
import { jobData } from "../../services/commons";

const Timeline = ({ jobs }: { jobs: jobData[] }) => {

  return (
    <div className="flex flex-col justify-start w-full relative">
      <div className="w-full pl-4 lg:pl-12 pb-8 lg:pb-24 timeline-animate h-full hide-scroll">
        {jobs && jobs[0] && jobs.map((data, index) => (
          <div
            className={`flex justify-start items-start w-fit relative mb-6 ${index === 0 && 'mt-6'}`}
            key={data.id}
          >
            <Line index={index} />
            <Popup
              index={index}
              data={data}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
