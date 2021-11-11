import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Container, Flex, Heading } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Layout } from "../../components";
import { WikiPageProps } from "../../types";

type PageProps = WikiPageProps & { pageTitle: string };

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params || typeof context.params[`page-title`] !== "string") {
    return {
      notFound: true,
    };
  }

  const pageTitle = context.params["page-title"];

  let data: PageProps = { pageTitle } as any;

  return {
    props: {
      data,
    },
  };
};

const EditPage = ({ data: { pageTitle } }: { data: PageProps }) => {
  const formik = useFormik<{
    title: string;
    description?: string;
    content?: string;
  }>({
    initialValues: { title: pageTitle, content: "", description: "" },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validate: (values) => {
      const errors: any = {};

      if (!values.title || values.title.length < 1) {
        errors.title = `Title cannot be empty`;
      }

      return errors;
    },
  });

  const { title, content, description } = formik.values;

  return (
    <div>
      <Head>
        <title>Simple Wiki Engine</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Container id="page-content" maxW="container.lg" mt="16">
          <form onSubmit={formik.handleSubmit}>
            <Flex alignItems="center" justifyContent="space-between">
              <Heading as="h2">{title}</Heading>

              <Box>
                <Button disabled={!isEmpty(formik.errors)} type="submit" mr="4">
                  Save
                </Button>
                <Button variant="outline">Cancel</Button>
              </Box>
            </Flex>

            <Box mt="8">
              <FormControl id="title">
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Please enter a title..."
                  onChange={formik.handleChange}
                  value={title}
                />
                {formik.errors.title && (
                  <FormHelperText color="red">
                    {formik.errors.title}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl id="description" mt="6">
                <FormLabel>Description</FormLabel>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Please enter a description..."
                  onChange={formik.handleChange}
                  value={description}
                />
              </FormControl>
            </Box>

            <Flex
              w="full"
              border="1px"
              borderColor="gray.300"
              borderRadius="md"
              mt="8"
            >
              <Textarea
                id="content"
                name="content"
                placeholder="Please enter the markdown content..."
                onChange={formik.handleChange}
                value={content}
                height="650px"
                width="50%"
                resize="none"
                border="none"
                borderRadius="none"
                overflowY="scroll"
              />
              <Box height="650px" width="50%">
                <ReactMarkdown components={ChakraUIRenderer()}>
                  {content || ""}
                </ReactMarkdown>
              </Box>
            </Flex>
          </form>
        </Container>
      </Layout>
    </div>
  );
};

export default EditPage;