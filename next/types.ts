export type GenericPageData<T> =
  | {
      data: {
        error: string;
      };
    }
  | {
      data: T;
    };

export type WikiPageArchive = {
  notFound?: boolean;
  id: number;
  title: string;
  description?: string;
  content?: string;
  archiveDate: string;
  slug: string;
  sourcePage: WikiPageProps;
};

export type WikiPageProps = {
  notFound?: boolean;
  slug: string;
  title: string;
  description?: string;
  content?: string; // markdown
  createdAt?: string;
  updatedAt?: string;
  archiveDate?: string;
  history?: WikiPageArchive[];
};
