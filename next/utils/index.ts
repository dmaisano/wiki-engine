import axios from "axios";
import _ from "lodash";
import { WikiPageProps } from "../types";

export const isServer = () => typeof window === "undefined";

export const API_ENDPOINTS = {
  BASE_URL: `http://localhost:3001`,
  GET_SLUG: `slug`,
  GET_PAGE: `page`,
  GET_ARCHIVE: `archive`,
  CREATE_EDIT_PAGE: `create-edit-page`,
  SEARCH_PAGE: `search`,
  UPLOAD_IMAGE: `upload`,
};

export const WIKI_HOME_URL = `/wiki/main`;

export const getPageFromSlug = async (slug: string): Promise<WikiPageProps> => {
  try {
    const res = await axios.get(
      `${API_ENDPOINTS.BASE_URL}/${API_ENDPOINTS.GET_PAGE}/${slug}`,
    );

    if (res.status !== 200) {
      throw new Error(`page not found`);
    }

    return res.data;
  } catch (error) {
    console.error({ wiki_page_error: (error as Error).message });
    return {
      notFound: true,
      slug,
      title: _.startCase(slug),
      content: "",
      description: "",
    };
  }
};
