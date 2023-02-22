import { Author } from "./author";
import { BookSeries } from "./bookseries";
import { Genre } from "./genre";
import { Publisher } from "./publisher";

export interface SingleBook {
  id: number;
  title: string;
  description: string;
  page: number;
  format: string;
  imageURL: string;
  amount: number;
  price: number;
  releaseYear: number;
  uploadDate: Date;
  bookSeries: BookSeries;
  publisher: Publisher;
  author: Author[];
  genre: Genre[];
}
