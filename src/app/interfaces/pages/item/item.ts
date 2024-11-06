export interface Item {
  id: string;
  thumbnail: string;
  data: {
    [lang: string]: {
      thumbnailAlt: string;
      audioPath: string;
      images: {
        url: string;
        alt: string;
      }[];
      name: string;
      origin: string;
      description: string;
    }
  }
}