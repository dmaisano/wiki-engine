export type GenericPageData<T> =
  | {
      data: {
        error: string;
      };
    }
  | {
      data: T;
    };

export type WikiPageProps = {
  notFound?: boolean;
  isArchived?: boolean;
  slug: string;
  title: string;
  description?: string;
  content: string; // markdown
  createdAt?: string;
  updatedAt?: string;
  archiveDate?: string;
};
