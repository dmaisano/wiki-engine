import { Container, Flex, Heading } from "@chakra-ui/layout";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import React from "react";
import ReactMarkdown from "react-markdown";
import { NextChakraLink } from ".";

// TODO: need to create component to check markdown links for validity

interface WikiPageProps {
  slug: string;
  title: string;
  description?: string;
  markdown: string;
}

const WikiPage: React.FC<WikiPageProps> = ({
  slug,
  title,
  description,
  markdown,
}) => {
  return (
    <div>
      <Flex pt="8" px="16" alignItems="center" justifyContent="space-between">
        <Heading as="h2">{title}</Heading>

        <Flex fontWeight="medium">
          <NextChakraLink href={`/`} color="blue" mr="6">
            Edit Page
          </NextChakraLink>
          <NextChakraLink href={`/`} color="blue">
            View History
          </NextChakraLink>
        </Flex>
      </Flex>

      <Container id="markdown-content" maxW="container.lg" mt="16">
        <ReactMarkdown
          components={ChakraUIRenderer()}
          // eslint-disable-next-line
          children={markdown}
          skipHtml={false}
        />
      </Container>
    </div>
  );
};

export default WikiPage;
