export type Sheet = {
  id: string,
  title: string,
  publishDate: string,
  difficulty: {
    name: number
  },
  media: {
    name: string,
    image: {
      url: string
    }
  },
  artist: {
    name: string
  }[],
  notes?: string,
  link: {
    ref: string,
    url: string
  }
}

export type Job = {
  id: string;
  name: string;
  role: string;
  desc: React.ReactElement[];
  start: string;
  end: string;
  projects: Project[];
}

export type Project = {
  id: string;
  name: string;
  link: string | undefined;
  job: string;
  short: string;
  role: string;
  responsibility: React.ReactElement[];
  images: string[];
  technology: React.ReactElement[];
  description: React.ReactElement[];
}

export type PortfolioColor = {
  bgMain: string,
  bgSub: string,
  bgLine: string,
  border: string,
  shadow: string,
}