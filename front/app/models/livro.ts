export interface Livro {
  cover_i: number;
  title: string;
  author_name: string[];
  key: string;
  author_key: string[];
  editions?: {numFound: number, docs: {key: string, title: string, cover_i: number}[]}
}