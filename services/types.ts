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
  notes: string,
  link: {
    ref: string,
    url: string
  }
}