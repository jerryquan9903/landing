import dayjs from "dayjs";
import React from "react";
import { jobData } from "../../services/commons";

const Popup = ({ data, index }: { data: jobData, index: number }) => {
  if (!data) return <></>;

  return (
    <div className="flex items-center pr-4 pl-8">
      <div className="absolute w-2 h-3 bg-emerald-700 top-8 -translate-y-1/2 left-6 triangle-left" />
      <div className="flex flex-col justify-center z-10">
        <div className="bg-emerald-700 px-2 py-1 rounded-t-md border-2 border-emerald-700">
          <div className="text-white font-medium text-lg">
            {dayjs(data.start).format('MM/YYYY')} - {index > 0 ? dayjs(data.end).format('MM/YYYY') : "Present"}
          </div>
          <div className="text-xl text-white font-bold">{data.name}</div>
          <div className="text-white opacity-80">{data.role}</div>
        </div>
        <div className="px-2 py-1 rounded-b-md bg-emerald-100 border-2 border-emerald-700">
          {data.desc.map((line, index) => {
            return (
              <div key={`${index} ${data.id}`} className="leading-7 text-gray-700 font-medium">
                {line}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Popup;
