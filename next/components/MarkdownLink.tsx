import axios from "axios";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { NextChakraLink } from ".";
import { API_ENDPOINTS } from "../utils";

interface MarkdownLinkProps {
  text: string;
}

const MarkdownLink: React.FC<MarkdownLinkProps> = ({ text }) => {
  const [linkExists, setLinkExists] = useState<boolean | null>(null);
  const slug = _.kebabCase(text);

  const verifyLink = async () => {
    const {
      data: { found },
    } = await axios.get(
      `${API_ENDPOINTS.BASE_URL}/${API_ENDPOINTS.GET_SLUG}/${slug}`,
    );

    setLinkExists(found);
  };

  useEffect(() => {
    if (linkExists === null) {
      verifyLink();
    }
  }, []);

  return (
    <NextChakraLink
      href={`/wiki/${slug}`}
      colorScheme={linkExists ? `blue` : `red`}
      fontSize="lg"
      fontWeight="semibold"
    >
      {text}
    </NextChakraLink>
  );
};

export default MarkdownLink;
