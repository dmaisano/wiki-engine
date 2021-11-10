export type GenericPageData<T> =
  | {
      data: {
        error: string;
      };
    }
  | {
      data: T;
    };
