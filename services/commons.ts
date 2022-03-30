import React from "react";
export interface projectsData {
  id: string;
  name: string;
  link: string | undefined;
  role: string;
  responsibility: React.ReactElement[];
  images: string[];
  technology: React.ReactElement[];
  description: React.ReactElement[]
}

export interface jobData {
  id: string;
  name: string;
  role: string;
  desc: React.ReactElement[];
  start: string;
  end: string;
}